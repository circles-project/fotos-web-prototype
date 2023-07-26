import Client from "./BSSpekeWrapper.ts";
import { fromByteArray } from "base64-js";
import { LOGIN_URL } from "../../../services/HttpConstants.ts";
import { hex_to_bytes } from "asmcrypto.js";
import { NavigateFunction } from "react-router-dom";
import { AuthStages } from "../../../state-management/auth/store.ts";

interface oprfProps {
    client?: Client;
    stages?: AuthStages;
    setError: React.Dispatch<React.SetStateAction<string>>;
    navigate: NavigateFunction;
    setEnteredPassword: (enteredPassword: boolean) => void;
    setServerResponse: (serverResponse: {}) => void;
    setIsLoading: (isLoading: boolean) => void;
    setIsLoggingIn: (isLoggingIn: boolean) => void;
}

// Executes m.login.bsspeke-ecc.oprf request
export function oprfRequest({ client, stages, setError, navigate, setEnteredPassword, setServerResponse, setIsLoading, setIsLoggingIn }: oprfProps) {

    setIsLoading(true);

    const blind = client?.generateBlind();
    const blindBase64 = fromByteArray(blind!);

    // // btoa is a base64 encoding function that creates a Base64-encoded ASCII string from a binary string
    console.log("Blind (base 64): ", blindBase64);
    let authBody = {
        "auth": {
            "session": stages?.userResponse.session,
            "type": "m.login.bsspeke-ecc.oprf",
            "curve": stages?.userResponse.params["m.login.bsspeke-ecc.oprf"].curve,
            "blind": blindBase64,
        },
        "identifier": {
            "type": "m.id.user",
            "user": stages?.userID
        },
    }

    fetch(LOGIN_URL, {
        method: "POST",
        body: JSON.stringify(authBody),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then((response) => response.json())
        .then(json => {

            if (json.error) {
                console.log("Error: " + json.error);
                setError("Error: " + json.error);
            } else {
                console.log(json);

                // Getting proper variables ready for Bsspeke .verify request
                const phfParams = json.params["m.login.bsspeke-ecc.oprf"].phf_params;
                const verifyParams = json.params["m.login.bsspeke-ecc.verify"];
                const blindSaltStrB64 = verifyParams.blind_salt;
                const BStr = verifyParams.B;
                const blindSaltStr = atob(blindSaltStrB64);
                const blindSaltHex = stringToHex(blindSaltStr);
                const blindSaltBytes = hex_to_bytes(blindSaltHex);

                const B = atob(BStr);
                const BHex = stringToHex(B);
                console.log("BHex: ", BHex);
                const BBytes = hex_to_bytes(BHex);

                const ABytes = client?.generateA(blindSaltBytes, phfParams);
                client?.deriveSharedKey(BBytes);
                const verifierBytes = client?.generateVerifier();

                // takes in a Uint8Array and returns a base64 encoded string
                const A = fromByteArray(ABytes!);
                const verifier = fromByteArray(verifierBytes!);

                // Bsspeke .verify request
                let authBody2 = {
                    "identifier": {
                        "type": "m.id.user",
                        "user": stages?.userID
                    },
                    "auth": {
                        "type": "m.login.bsspeke-ecc.verify",
                        "session": json.session,
                        "A": A,
                        "verifier": verifier,
                    }
                }
                verifyRequest(authBody2, { client, stages, setError, navigate, setEnteredPassword, setServerResponse, setIsLoading, setIsLoggingIn });
            }
        })
        .catch((error) => {
            console.log(error);
            setError("Error: " + error);
            setIsLoading(false);
        })
        .finally(() => {
            setIsLoading(false);
        });
}

// Executes m.enroll.bsspeke-ecc.verify request
function verifyRequest(authBody2: any, { setError, navigate, setEnteredPassword, setServerResponse, setIsLoading, setIsLoggingIn }: oprfProps) {
    fetch(LOGIN_URL, {
        method: "POST",
        body: JSON.stringify(authBody2),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then((response) => response.json())
        .then(json => {

            if (json.error) {
                console.log("Error: " + json.error);
                setError("Error: " + json.error);
            } else {
                setEnteredPassword(true);
                setIsLoading(false);
                setServerResponse(json);
                setIsLoggingIn(false);
                navigate("/photos",);
            }
        })
        .catch((error) => {
            console.log("Error: ", error);
            setError("Error: " + error);
            setIsLoading(false);
        });
}


// Executes m.login.password request
export function mLoginAuth({ stages, setError, navigate, setEnteredPassword, setServerResponse, setIsLoading, setIsLoggingIn }: oprfProps, password: string) {

    fetch(LOGIN_URL, {
        method: "POST",
        body: JSON.stringify({
            "auth": {
                "session": stages?.userResponse.session,
                "type": "m.login.password",
                "identifier": {
                    "type": "m.id.user",
                    "user": stages?.userID
                },
                "password": password
            }
        }),
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        }
    })
        .then(response => response.json())
        .then(json => {
            setEnteredPassword(true);
            setServerResponse(json);
            console.log("Json after setServerResponse ", json);
            setIsLoggingIn(false);
            navigate("/photos")
        })
        .catch(error => {
            console.log("Error: " + error);
            setError(error);
        })
        .finally(() => {
            setIsLoading(false);
        });
}

// Helper function to convert a string to hex representation
function stringToHex(byteString: string) {
    let hexString = "";
    for (let i = 0; i < byteString.length; i++) {
        const byte = byteString.charCodeAt(i).toString(16);
        hexString += byte.length === 1 ? "0" + byte : byte;
    }
    return hexString;
}