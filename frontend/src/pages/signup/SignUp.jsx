


import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import Loader from "../../components/general/Loader";

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    const { loading, signup } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    };

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender });
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Sign Up <span className="text-blue-500">PingPal</span>
                </h1>

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <label className="label p-2">
                            <span className="text-base label-text">Full Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter full name"
                            className="w-full input input-bordered h-10"
                            value={inputs.fullName}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    fullName: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="mb-4">
                        <label className="label p-2">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            className="w-full input input-bordered h-10"
                            value={inputs.username}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    username: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="mb-4">
                        <label className="label p-2">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full input input-bordered h-10"
                            value={inputs.password}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="mb-4">
                        <label className="label p-2">
                            <span className="text-base label-text">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="w-full input input-bordered h-10"
                            value={inputs.confirmPassword}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    confirmPassword: e.target.value,
                                })
                            }
                        />
                    </div>

                    <GenderCheckbox
                        onCheckboxChange={handleCheckboxChange}
                        selectedGender={inputs.gender}
                    />

                    <Link
                        to="/login"
                        className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
                    >
                        Already have an account?
                    </Link>

                    <div className="mt-4">
                        <button className="btn btn-block btn-sm">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;