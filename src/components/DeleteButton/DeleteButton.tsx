import useSdkClientStore from "../../state-management/sdkClient/store";
import { BsTrash3 } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { ISendEventResponse } from "matrix-js-sdk";

const DeleteButton = () => {
    const { client } = useSdkClientStore();
    const file = useLocation().state.file;
    const navigate = useNavigate();

    // TODO: Redaction event not working, event being sent but not deleting image. Maybe event id not being sent right?
    // Function that handles the logic of deleting a file from the room
    const photoDeleter = () => {
        console.log("File: ", file);
        console.log("Event ID: ", file.eventId);
        console.log("Room ID: ", file.roomId);

        const redactionEvent = {
            type: "m.room.redaction",
            content: {
                reason: "Deleted",
            },
            redacts: file.eventId,
        };

        // Send the redaction event to the room
        client.sendEvent(file.roomId, "m.room.redaction", redactionEvent, "").then((value: ISendEventResponse) => {
            console.log("Redaction Event ID: ", value);
            navigate("/photos");
        }).catch((error) => {
            console.error("Error while sending redaction event:", error);
        });
    };

    return (
        <div className="delete-btn-wrapper" onClick={photoDeleter} >
            <BsTrash3 className="delete-btn-icon" />
        </div>
    );
}

export default DeleteButton;
