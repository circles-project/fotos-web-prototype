import Module from "./EmccBsspeke.js";

// Class to wrap the bsspeke client and interact with emscripten compiled code
class Client {
  private ctx: any;
  private useModule: any;
  private moduleInitialized: Promise<void>; // Promise to ensure that the emscripten module is initialized before we use it (added for module support)

  constructor(user_id: string, server_id: string, password: string) {
    this.moduleInitialized = new Promise((resolve) => {
      Module().then((Module) => {
        this.useModule = Module;
        console.log("useModule: ", this.useModule);
      
        const uid_utf8 = encodeUTF8(user_id);
        console.log("decoded uid_utf8: ", uid_utf8, "uid_utf8.length: ", uid_utf8.length);
        const sid_utf8 = encodeUTF8(server_id);
        console.log("sid_utf8: ", sid_utf8, "sid_utf8.length: ", sid_utf8.length);
        const pwd_utf8 = encodeUTF8(password);
        console.log("pwd_utf8: ", pwd_utf8, "pwd_utf8.length: ", pwd_utf8.length);

        // Calling emscriten compiled bsspeke code to generate client
        this.ctx = this.useModule.ccall("generate_client", "number", [], []);
        console.log("ctx: ", this.ctx);
        const success = this.useModule.ccall("bsspeke_client_init", "number", ["number", "string", "number", "string", "number", "string", "number"], [this.ctx, uid_utf8, uid_utf8.length, sid_utf8, sid_utf8.length, pwd_utf8, pwd_utf8.length]);
        console.log("Client init success: ", success);
        resolve();
      });
    });
  }
  // Generates a blind for the client 
  async generateBlind(): Promise<Uint8Array> {
    await this.moduleInitialized;

    const blindPointer = this.useModule.ccall("bsspeke_client_generate_blind", "number", ["array", "number"], [new Uint8Array(32), this.ctx]);
    const blind = new Uint8Array(this.useModule.HEAPU8.buffer, blindPointer, 32);
    return blind;

  }

  // Generates P and V hashes for the client
  generatePAndV(blind_salt: Uint8Array, blocks : number, iterations : number): { PArray: Uint8Array; VArray: Uint8Array } {
    const P = this.useModule._malloc(32);
    const V = this.useModule._malloc(32);

    this.useModule.ccall("bsspeke_client_generate_P_and_V", "number", ["number", "number", "array", "number", "number", "number"], [P, V, blind_salt, blocks, iterations, this.ctx]);

    const PArray = new Uint8Array(this.useModule.HEAPU8.buffer, P, 32);
    const VArray = new Uint8Array(this.useModule.HEAPU8.buffer, V, 32);

    return { PArray, VArray };
  }

  // Generates A for the client
  generateA(blindSalt: Uint8Array, phfParams : any) : Uint8Array {
    const blocks = phfParams.blocks;
    const iterations = phfParams.iterations;
    this.useModule.ccall("bsspeke_client_generate_A", "number", ["array", "number", "number", "number"], [blindSalt, blocks, iterations, this.ctx]);
    const A = this.useModule._malloc(32);
    this.useModule.ccall("bsspeke_client_get_A", "void", ["number", "number"], [A, this.ctx]);
    const AArray = new Uint8Array(this.useModule.HEAPU8.buffer, A, 32);
    printPoint("A", AArray);
    return AArray;
  }

  // Derives the shared key for the client
  deriveSharedKey(B: Uint8Array) {
    this.useModule.ccall("bsspeke_client_derive_shared_key", "void", ["array", "number"], [B, this.ctx]);
  }

  // Generates the verifier for the client
  generateVerifier(): Uint8Array {
    const clientVerifier = this.useModule._malloc(32);
    this.useModule.ccall("bsspeke_client_generate_verifier", "void", ["number", "number"], [clientVerifier, this.ctx]);
    const verifier = new Uint8Array(this.useModule.HEAPU8.buffer, clientVerifier, 32);
    // console.log("verifier: ", verifier);
    return verifier;
  }

  // Generates the hashed key for the client
  generateHashedKey() : Uint8Array {
    
    /* Temporary holder for function call, update parameters and return as needed -
       currently returns the hash
    */
    const hash = this.useModule._malloc(32);
    const msg = this.useModule._malloc(32);
    const msgLen = 32;
    this.useModule.ccall("bsspeke_client_generate_hashed_key", "void", ["number", "number"], [hash, msg, msgLen, this.ctx]);
    const hashArray = new Uint8Array(this.useModule.HEAPU8.buffer, hash, 32);
    return hashArray;

  }
}

function encodeUTF8(str: string): string {
  // Encode the string from UTF-16 to UTF-8
  const encoder = new TextEncoder();
  const utf8Array = encoder.encode(str);

  // Convert the UTF-8 array to a string representation
  const utf8EncodedString = String.fromCharCode(...utf8Array);
  return utf8EncodedString;

}

// Decode a UTF-8 byte array to a string
export function decodeUTF8(bytes: Uint8Array): string {
  const utf8Decoder = new TextDecoder("utf-8");
  return utf8Decoder.decode(bytes);
}

// Helper function to Print out a Uint8Array as a hex string; debugging purposes
function printPoint(label : string, point : Uint8Array) {
  let hexString = "";
  for (let i = point.length - 1; i >= 0; i--) {
    hexString += point[i].toString(16).padStart(2, "0");
  }
  console.log(`${label}:\t[${hexString}]`);
}


export default Client;
