import styles from "./VideoContainer.module.css";
import { useNavigate } from "react-router-dom";
import { FileInfoType } from "../../state-management/fileStore/store";

interface Props {
  file: FileInfoType;
}

// Container for the videos in the display grid
const VideoContainer = ({ file }: Props) => {

  const navigate = useNavigate(); // Get the navigate function from the hook
  const slug = file.fileURL.split("/").pop(); // Get the slug from the fileURL

  // Function to handle navigation to PhotoFullScreen
  console.log("File: ", file);
  const handleNavigate = () => {
    navigate(`/photos/${slug}`, { state: { file } });
  };

  return (
    <video src={file.fileURL} className={styles.video} onClick={handleNavigate}/>
  );
};

export default VideoContainer;
