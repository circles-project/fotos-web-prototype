import useFileStore from "../../state-management/fileStore/store";
import ImageContainer from "../ImageContainer/ImageContainer";
import VideoContainer from "../VideoContainer/VideoContainer";
import { Container } from "react-bootstrap";
import styles from "./GridDisplay.module.css";

// Displays the files in a grid format for the home /photos route
const GridDisplay = () => {
    const { fileList } = useFileStore();
    
    return (
        <Container className={styles.grid}>
            {/* TODO: Add better keys? */}
            {fileList.map((file, index) => (
                file.type.includes("image") ? <ImageContainer file={file} key={index} /> : file.type.includes("video") ? <VideoContainer file={file} key={index} />
                    : <div>Unsupported File Type</div>
            ))}
        </Container>
    )
}

export default GridDisplay;