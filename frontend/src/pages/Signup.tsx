import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { onSignup } from "../services";

interface FormValues {
    email: string;
    username: string;
    password: string;
    confirmpassword: string;
}

const Signup = () => {
    const [formValues, setFormValues] = useState<FormValues>({
        email: "",
        username: "",
        password: "",
        confirmpassword: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const toastId = toast.loading("Loading...");
        setLoading(true);

        const body = {
            email: formValues.email,
            username: formValues.username,
            password: formValues.password,
        };

        const response = await onSignup(body);

        if (response.success) {
            navigate("/login");
        } else {
            toast.error(response.message);
        }

        setLoading(false);
        toast.dismiss(toastId);
    };

    return (
        <div className="w-screen h-screen p-4 flex justify-center items-center bg-gray-100">
            <form
                className="w-full sm:w-[500px] max-w-[500px] border border-gray-300 bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={onSubmitHandler}
            >
                <h3 className="mb-4 text-center text-xl text-gray-800 font-semibold">Sign Up</h3>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="abc@gmail.com"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={formValues.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="******"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="confirmpassword"
                    >
                        Confirm Password
                    </label>
                    <input
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirmpassword"
                        name="confirmpassword"
                        type="password"
                        placeholder="******"
                        value={formValues.confirmpassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={loading}
                    >
                        Register
                    </button>
                    <Link
                        to="/login"
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600"
                    >
                        Already registered?
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;