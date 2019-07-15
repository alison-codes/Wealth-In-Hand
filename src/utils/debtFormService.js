import tokenService from "./tokenService";

const BASE_URL = '/api/debts/';



export async function getAllDebts() {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  };
  return fetch(BASE_URL, options).then(res => res.json());
}
// export async function getAllDebts() {
//   return fetch(BASE_URL).then(res => {
//     if (res.ok) return res.json();
//   })
// }


export function createDebt(data) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + tokenService.getToken()
    },
    body: JSON.stringify(data)
  };
  return fetch(BASE_URL, options).then(res => res.json()).then(getAllDebts());
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


export async function deleteDebt(debtID) {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    },
    body: JSON.stringify({ id: debtID })
  };
  return await fetch(BASE_URL, options)
    .then(res => res.json())
    .then(json => {
      if (json.deleted === true) {
        return true;
      }
      return false;
    });
}