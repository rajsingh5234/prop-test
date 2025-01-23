import { Navigate, Outlet } from "react-router-dom";
import { getLocalStorageItem, ACCESS_TOKEN } from "../utils/localStorageManager";


const PublicRoute = () => {
    const token = getLocalStorageItem(ACCESS_TOKEN);

    return !token ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
