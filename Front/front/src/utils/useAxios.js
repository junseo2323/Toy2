import axios from "axios"
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../App";

const baseURL = "http://127.0.0.1:8000/api";

const useAxios = () => {
    const {authToken, setUser, setAuthTokens} = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL,
        headers: {Authorization: `Bearer ${authToken?.access}`}
    });

    axiosInstance.interceptors.request.use(async req => {
        const user = jwt_decode(authToken.access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1; //토큰만료 상태 체크
        
        if(!isExpired) return req; // 만료되지 않으면 access토큰 사용

        const response = await axios.post(`${baseURL}/token/refresh/`, {
            refresh: setAuthTokens.refresh
        });

        localStorage.setItem("authTokens", JSON.stringify(response.data));

        setAuthTokens(response.data);
        setUser(jwt_decode(response.data.access));

        req.headers.Authorization = `bearer ${response.data.access}`;
        return req;
    });

    return axiosInstance;
};

export default useAxios;