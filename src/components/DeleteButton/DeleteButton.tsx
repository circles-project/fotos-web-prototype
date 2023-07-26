import useSdkClientStore from "../../state-management/sdkClient/store";
import { BsTrash3 } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

const DeleteButton = () => {
    const { client } = useSdkClientStore();
    const file = useLocation().state.file;
    const navigate = useNavigate();

    // Function that handles the logic of deleting a file from the room
    const photoDeleter = () => {
        console.log("File: ", file);
        console.log("Event ID: ", file.eventId);
        console.log("Room ID: ", file.roomId);

        // Sends the m.room.redaction event to the room
        client.redactEvent(file.roomId, file.eventId).then((value: any) => {
            console.log("Redaction Event ID: ", value);
            navigate("/photos");
        });
    };

    return (
        <div className="delete-btn-wrapper" onClick={photoDeleter} >
            <BsTrash3 className="delete-btn-icon" />
        </div>
    );
}

export default DeleteButton;
