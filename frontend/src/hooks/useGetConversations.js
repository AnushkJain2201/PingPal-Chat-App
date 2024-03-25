import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);

    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async() => {
            setLoading(true);

            try {
                const res = await fetch('/api/users');

                const result = await res.json();

                if(result.status !== 'success') {
                    throw new Error(result.error);
                }

                setConversations(result.data.users);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        getConversations();
    }, []);

    return {loading, conversations}
}

export default useGetConversations