import { setupClient } from "../../services/MatrixGeneral";
import { fetchExistingFiles, roomSetup } from "./PhotosServices";
import { useEffect } from "react";
import useAuthStore from "../../state-management/auth/store";
import NavBar from "../../components/NavBar/NavBar";
import useFileStore from "../../state-management/fileStore/store";
import useSdkClientStore from "../../state-management/sdkClient/store";
import useRoomStore from "../../state-management/roomStore/store";
import GridDisplay from "../../components/GridDisplay/GridDisplay";
import SideBar from "../../components/SideBar/SideBar";

const Photos = () => {

  const { serverResponse } = useAuthStore();
  const { setFileList } = useFileStore();
  const { setClient } = useSdkClientStore();
  const { roomList, addRoom } = useRoomStore();

  // Sets up the sdk client and fetches the rooms and files
  useEffect(() => {
    setupClient(serverResponse)
      .then((retClient) => {
        setClient(retClient);

        /*
        Grabs the rooms from the Photo Gallery m.space.child events map and stores them in roomList
        and fetches existing files in the room and stores them in fileList
        */
        roomSetup(retClient, addRoom).then(() => { 
          fetchExistingFiles(retClient, roomList.get("Photos"), setFileList)
          console.log("Photo Room: ", roomList.get("Photos"));
        });
      })
  }, []);

  return (
    <>
      <NavBar />
      <SideBar />
      <GridDisplay />
    </>
  );
};

export default Photos;
