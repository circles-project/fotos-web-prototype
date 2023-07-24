import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import { FileInfoType } from '../state-management/fileStore/store';
import useRoomStore from '../state-management/roomStore/store';
import useSdkClientStore from '../state-management/sdkClient/store';

interface Props {
    roomId: string | undefined;
}

// TODO: Need to fix querying and fix routes, implementation in progress
// Queries all the photos from a given room
const usePhotos = (): UseInfiniteQueryResult<FileInfoType[], Error> => {
    const { roomList } = useRoomStore();
    const { data, isLoading, error } = useInfiniteQuery<FileInfoType[], Error>(
        ['photos'],
        async () => {
            console.log("Entered");
            const { client } = useSdkClientStore();
            const batchSize = 100; // Fetch 100 messages per batch, adjust this as per your requirements
            console.log("Client: ", client);    
            // TODO: Remove, testing with main photo room
            const room = roomList.get('Photos');
            if (!room) {
                throw new Error("Photos room not found");
            }
            const res = await client.roomInitialSync(room.roomId, batchSize);

            const eventType = "m.room.message";
            const filteredEvents = res.chunk.filter(
                (event: any) => event.type === eventType && event.content.url !== undefined
            );
            const updatedFileInfo: FileInfoType[] = filteredEvents.map((event: any) => {
                let httpUrl = client.mxcUrlToHttp(event.content.url);
                return { fileURL: httpUrl, type: event.content.msgtype };
            });
            return updatedFileInfo;
        }
    );

    return { data, isLoading, error };
};

export default usePhotos;
