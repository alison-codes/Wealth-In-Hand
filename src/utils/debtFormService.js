import tokenService from "./tokenService";

const BASE_URL = '/api/debts';

export async function getAllDebts() {
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': 'Bearer ' + tokenService.getToken()
    //     }
    // };
  return fetch(BASE_URL).then(res => res.json());
}

export function createDebt(data) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + tokenService.getToken()
    },
    body: JSON.stringify(data)
  };
  return fetch(BASE_URL, options).then(res => res.json());
}


export function updateGoogleSheet(data) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + tokenService.getToken()
    },
    body: JSON.stringify(data)
  };
  return fetch(BASE_URL, options).then(res => res.json());
}
