import styles from "./ImageContainer.module.css";
import { useNavigate } from "react-router-dom";
import { FileInfoType } from "../../state-management/fileStore/store";

interface Props {
  file: FileInfoType;
}

// Container for the images in the display grid
const ImageContainer = ({ file }: Props) => {
  const navigate = useNavigate(); // Get the navigate function from the hook
  const slug = file.fileURL.split("/").pop(); // Get the slug from the fileURL

  // Function to handle navigation to PhotoFullScreen
  const handleNavigate = () => {
    navigate(`/photos/${slug}`, { state: { file } });
  };

  return (
    <img src={file.fileURL} alt="Photo Gallery Photos" className={styles.image} onClick={handleNavigate}/>
  );
};

export default ImageContainer;
