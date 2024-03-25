import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        const success = handleInputErrors({fullName, username, password, confirmPassword, gender});
        if (!success) return;

        setLoading(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
            });

            const datas = await res.json();
            if(datas.error) {
                throw new Error(datas.error);
            }

            // we will save it in the local storage to find if we are logged in or not
            localStorage.setItem("chat-user", JSON.stringify(datas.data.newUser));

            // context
            setAuthUser(datas.data.newUser);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup }
}

export default useSignup;

function handleInputErrors({fullName, username, password, confirmPassword, gender}) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        // eslint-disable-next-line no-undef
        toast.error("Please fill in all the fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }

    if (password.length < 6) {
        toast.error('Password must be atleast 6 characters');
        return false;
    }

    return true;


}   
