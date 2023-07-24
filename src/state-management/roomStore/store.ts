import { create } from "zustand";

export interface RoomStore {
    name: string | undefined;
    roomId: string | undefined;
    room: object | undefined;
}

interface RoomListStore {
    roomList: Map<string, RoomStore>;
    addRoom: (room: RoomStore) => void;
    setRoomList : (roomList: Map<string, RoomStore>) => void;
}

// Zustand store for rooms, need to implement react querying for rooms
const useRoomStore = create<RoomListStore>(
    (set) => ({
        roomList: new Map<string, RoomStore>(),

        // Should the map key be the room name or id?
        addRoom: (room: RoomStore) => set((state) => ({ roomList: state.roomList.set(room.name!, room) })),
        setRoomList: (roomList: Map<string, RoomStore>) =>
            set(() => ({ roomList: roomList })),

    }),
);

export default useRoomStore;
