import { useLocation } from 'react-router-dom';
import styles from './PhotoFullScreen.module.css';
import ImageOptionsNavBar from '../../components/ImageOptionsNavBar/ImageOptionsNavBar';


const PhotoFullScreen = () => {
    const locationState = useLocation().state;
    console.log("File URL: ", locationState);

    // TODO: In Process of adding querying and routes (localhost:5173/Photos/slugs) Need to implement slugs
    // const { data, loading } = useQuery(GET_PHOTO, {
    //     variables: { id },
    // });
    
    // if (loading) return <LoadingScreen />;

    return (
        <div className={styles.photoFullScreenDiv}>
            <ImageOptionsNavBar />
            {locationState.file.type === "m.video" ? <video src={locationState.file.fileURL} controls className={styles.imageContainer} /> : <img src={locationState.file.fileURL} className={styles.imageContainer} alt="Full-screen Photo" />}
    
        </div>
    );
};

export default PhotoFullScreen;
