const BASE_URL = '/api/debts';

export default {
    index,
};

function index() {
    return fetch(BASE_URL);
    // return fetch(BASE_URL).then(res => res.json());
}