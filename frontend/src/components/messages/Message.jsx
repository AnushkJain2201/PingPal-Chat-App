import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

export const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);

    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? 'bg-blue-500' : '';
    const shakeClass = message.shouldShake ? "shake" : "";

    return (
        <div className={`flex flex-col items-${fromMe ? 'end' : 'start'}`}>
            <div className={`chat ${chatClassName} flex items-center mb-2`}>
                {!fromMe && (
                    <div className='chat-image avatar mr-2'>
                        <div className='w-10 rounded-full'>
                            <img
                                alt='Profile'
                                src={profilePic}
                            />
                        </div>
                    </div>
                )}
                <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2 px-4 py-2 rounded-lg`}>{message.message}</div>
            </div>
            <div className={`chat-footer opacity-50 text-xs text-${fromMe ? 'right' : 'left'}`}>{formattedTime}</div>
        </div>
    );
};
