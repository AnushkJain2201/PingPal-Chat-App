import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import Loader from "../../components/general/Loader";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Login <span className="text-blue-500">PingPal</span>
                </h1>

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <label className="label p-2 block">
                            <span className="text-base label-text">Username</span>
                            <input
                                type="text"
                                placeholder="Enter username"
                                className="w-full input input-bordered h-10 mt-1"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="label block">
                            <span className="text-base label-text">Password</span>
                            <input
                                type="password"
                                placeholder="Enter password"
                                className="w-full input input-bordered h-10 mt-1"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                    </div>

                    <Link
                        to="/signup"
                        className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
                    >
                        {"Don't"} have an account?
                    </Link>

                    <div className="mt-4">
                        <button className="btn btn-block btn-sm">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;