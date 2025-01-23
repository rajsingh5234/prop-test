import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { onLogin } from "../services";
import { ACCESS_TOKEN, setLocalStorageItem, USER_DATA } from "../utils/localStorageManager";

interface FormValues {
    email: string;
    password: string;
}

const Login = () => {
    const location = useLocation();
    const cred = location?.state;

    const [formValues, setFormValues] = useState<FormValues>({
        email: cred?.email || "",
        password: cred?.password || "",
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

        const response = await onLogin(formValues);

        if (response.success) {
            setLocalStorageItem(ACCESS_TOKEN, response.data.data.accessToken);
            setLocalStorageItem(USER_DATA, response.data.data.user);
            navigate("/");
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
                <h3 className="mb-4 text-center text-xl text-gray-800 font-semibold">Login</h3>
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
                <div className="mb-6">
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
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={loading}
                    >
                        Sign In
                    </button>
                    <div className="mt-4">
                        <Link
                            to="/signup"
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600 border-b border-blue-500 hover:border-blue-600"
                        >
                            Don't have an account?
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
