import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);

    const {setAuthUser} = useAuthContext();

    const login = async (username, password)=> {
        const success = handleInputError(username, password);
        if(!success) return;

        setLoading(true);

        try{
            const res = await fetch("/api/auth/login", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username, password})
            });

            const result = await res.json();

            if(result.error) {
                throw new Error(result.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(result.data.user));

            setAuthUser(result.data.user);


        } catch(error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {loading, login}
}

export default useLogin

const handleInputError = (username, password) => {
    if(!username || !password) {
        toast.error("Please fill in all the fields");
        return false;
    }

    if(password.length < 6) {
        toast.error("Password must be atleast 6 characters");
        return false;
    }

    return true;
}