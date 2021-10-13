import axios from 'axios';
import store from '../Redux/Store';

const jwtAxios = axios.create();

// Request interceptor - מה אנו רוצים לבצע בכל שליחת בקשה לשרת
jwtAxios.interceptors.request.use(request => {
    // console.log(store.getState().AuthState.user?.token)
    request.headers = {
        "token": store.getState().AuthState.user?.token
    };

    return request;
});

export default jwtAxios;