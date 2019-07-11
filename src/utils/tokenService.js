
function setToken(token) {
    if (token) {
        localStorage.setItem('token', token);
        console.log('token created 1')
    } else {
        localStorage.removeItem('token');
        console.log('token created 2')
    }
}

function getToken() {
    let token = localStorage.getItem('token');
    if (token) {
        // Check if expired
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp < Date.now() / 1000) {
            localStorage.removeItem('token');
            token = null;
        }
    }
    return token;
}

function getUserFromToken() {
    const token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

function removeToken() {
    localStorage.removeItem('token');
}

export default {
    setToken,
    getToken,
    removeToken,
    getUserFromToken,
};