import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);

    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);

            try {

                const res = await fetch(`/api/messages/${selectedConversation._id}`);
                const result = await res.json();

                if(result.error) {
                    throw new Error(result.error);
                }

                
                setMessages(result);

                
                
            } catch (error) {
                console.log(error)
                toast.error(error.messages);
            } finally {
                setLoading(false);
            }
        }

        if(selectedConversation?._id) getMessages();

    }, [selectedConversation?._id, setMessages]);

    return {messages, loading}
}

export default useGetMessages