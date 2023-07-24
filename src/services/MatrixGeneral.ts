import { MatrixClient } from "matrix-js-sdk";

declare global {
  interface Window {
    matrixcs: any;
  }
}

export async function setupClient(loginJson: any): Promise<MatrixClient> {
  console.log("Setting up client");
  const client: MatrixClient = await window.matrixcs.createClient({
    baseUrl: loginJson.well_known["m.homeserver"].base_url,
    accessToken: loginJson.access_token,
    userId: loginJson.user_id,
    timelineSupport: true,

  });

  await client.startClient().then(() => console.log("Client started: ", client)).catch((err: any) => console.log("Client start error: ", err));

  await new Promise((resolve) => {
    client.once("sync", (state: any, prevState: any, res: any) => {
      if (state === "PREPARED") {
        console.log("Client prepared and synced");
        resolve("Client Resolved"); // Resolve the promise to indicate that the sync event has been handled
      } else {
        console.log(state);
        process.exit(1);
      }
    });
  });

  return client;
}
