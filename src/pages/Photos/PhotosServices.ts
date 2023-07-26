import { FileInfoType } from "../../state-management/fileStore/store";
// Note: MatrixClient coming from typings file of matrix js sdk which only contains some of the functions (using matrix js browser version which has no typings, weird workaround for some functions)
// import * as sdk from "matrix-js-sdk";
import { RoomStore } from "../../state-management/roomStore/store";

// Uploads the photos to the Photo Room
export async function uploadFile(client: any, file: File, photoRoom: any): Promise<string> {
  return new Promise((resolve, reject) => {
      client.uploadContent(file).then((res: any) => {
        let fileType = "";
        if (file.type.includes("image")) {
          fileType = "m.image";
        } else if (file.type.includes("video")) {
          fileType = "m.video";
        } else {
          throw new Error("Invalid file type");
        }
        client.sendMessage(photoRoom.roomId, {
          msgtype: fileType,
          body: file.name,

          // TODO: Add encrypted files/messages for encrypted rooms, adjust width and height?
          url: res.content_uri,
          info: {
            mimetype: file.type,
            size: file.size,
            thumbnail_info: {
              mimetype: file.type,
              size: file.size,
              w: 100,
              h: 100,
            },
            h: 200,
            w: 200,
          }
          }).then((res: any) => {
          resolve(res.event_id);
        }).catch((err: any) => {
          console.log("Error: ", err);
          reject(err);
        });
      });
    });
}


// TODO: Replace this function for usePhotos hook w/ react query?
// Gets the existing photos (need to support vidoes?) from the Photo Room and updates the FileURLS state
export const fetchExistingFiles = (client: any, photoRoom: any, setFileList: (fileList: FileInfoType[]) => void) => {

  if (client) {
    
    // How many messages to grab, needs to be adjusted?
    const BATCH_SIZE = 1000;

    // Initial Sync to get the existing messages
    client.roomInitialSync(photoRoom.roomId, BATCH_SIZE).then((res: any) => {
      console.log("Initial Sync: ", res);

      // Filtering out the events that are not messages and not empty
      const eventType = "m.room.message";
      const filteredEvents = res.messages.chunk.filter(
        (event: any) => event.type === eventType && event.content.url !== undefined
      );

      // Generating list of file URLs from the filtered events
      const updatedFileInfo: FileInfoType[] = filteredEvents.map((event: any) => {
        let httpUrl = client.mxcUrlToHttp(event.content.url);
        return { fileURL: httpUrl, type: event.content.msgtype, roomId: event.room_id, eventId: event.event_id };
      });

      // Once synced, sets the file list state in Zustand store
      setFileList(updatedFileInfo);
      console.log("Current Files: ", updatedFileInfo);
    });

  }
};

// Fetches the rooms and adds them to the room list state Zustand Store
export async function roomSetup (client: any, addRoom: (room: RoomStore) => void): Promise<void> {
  const rooms = client.getRooms()
  const findPhotoGallery = rooms.find((room: any) => room.name === "My Photo Galleries");
  console.log("Photo Gallery: ", findPhotoGallery);
  addRoom({ name: findPhotoGallery?.name, roomId: findPhotoGallery?.roomId, room: findPhotoGallery });

  const galleryChildrenRoomIds = findPhotoGallery?.getLiveTimeline().getState("f" as any)?.events.get("m.space.child")?.keys();
  let curChildRoom = client.getRoom(galleryChildrenRoomIds?.next().value);
  while (curChildRoom) {
    // Change as any?
    addRoom({ name: curChildRoom?.name, roomId: curChildRoom?.roomId, room: curChildRoom as any });
    curChildRoom = client.getRoom(galleryChildrenRoomIds?.next().value);
  }
}


