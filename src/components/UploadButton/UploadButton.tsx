import { uploadFile } from "../../pages/Photos/PhotosServices";
import useFileStore, { FileInfoType } from "../../state-management/fileStore/store";
import useSdkClientStore from "../../state-management/sdkClient/store";
import useRoomStore from "../../state-management/roomStore/store";

// Upload button for the photos page
const UploadButton = () => {
  const { client } = useSdkClientStore();
  const { roomList } = useRoomStore();
  const { addFile } = useFileStore();
  const photoUploader = (event: any) => {
    
    const files: FileList = event.target.files;
    const photoRoom = roomList.get("Photos");

    // Upload each file and add it to the file list
    for (let i = 0; i < files.length; i++) {
      uploadFile(client, files[i], photoRoom).then((eventId: string) => {
        let newFile: FileInfoType = {
          fileURL: URL.createObjectURL(files[i]),
          type: files[i].type,
          roomId: photoRoom?.roomId!,
          eventId: eventId,
        };

        // Adds the file to the file list
        addFile(newFile);
      });        
    };
  };

  return (
    <div className="upload-btn-wrapper">
      <input
        style={{ position: "absolute", visibility: "hidden" }}
        type="file"
        className="custom-file-input"
        id="customFile"
        onChange={photoUploader}
        multiple
      />
      <label className="custom-file-label" htmlFor="customFile">
        Upload Files
      </label>
    </div>
  );
}

export default UploadButton;