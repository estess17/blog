import instance from './api-instance';
import authHeader from '../utils/auth-header';


const register = async (user: any) => {
    const res = await instance.post('auth/register', user);

    if (res.data) {
        localStorage.setItem('access_token', JSON.stringify(res.data.access_token));
    }

    return res.data;
};

const login = async (user: any) => {
    const res = await instance.post('auth/login', user);

    if (res.data) {
        localStorage.setItem('access_token', JSON.stringify(res.data.access_token));
    }
    return res.data;
};

const logout = () => {
    localStorage.removeItem('access_token');
};

const getProfile = async () => {
    return await instance.get(`auth/profile`, {headers: authHeader() as { Authorization: string | any }});
};


const authService = {
    register,
    login,
    logout,
    getProfile,
};

export default authService;