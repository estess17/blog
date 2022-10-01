export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('access_token') as string);

    if (token) {
        return {Authorization: 'Bearer ' + token};
    } else {
        return {};
    }
}