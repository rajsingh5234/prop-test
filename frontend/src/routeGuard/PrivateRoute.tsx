import { Navigate, Outlet } from "react-router-dom";
import { getLocalStorageItem, ACCESS_TOKEN } from "../utils/localStorageManager";


const PrivateRoute = () => {
    const token = getLocalStorageItem(ACCESS_TOKEN);

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
