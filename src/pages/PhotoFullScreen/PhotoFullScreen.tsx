import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { FileInfoType } from '../../state-management/fileStore/store';
import styles from './PhotoFullScreen.module.css';
import ImageInfo from '../../components/ImageInfo/ImageInfo';
import ImageOptionsNavBar from '../../components/ImageOptionsNavBar/ImageOptionsNavBar';

interface Props {
    curFile: FileInfoType;
}

const PhotoFullScreen = () => {
    const locationState = useLocation().state;
    // Parse the query parameter 'fileURL' from the search string
    // const fileURL = new URLSearchParams(search).get('fileURL') || '';
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
