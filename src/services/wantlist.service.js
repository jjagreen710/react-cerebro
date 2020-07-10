import axios from "axios";
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class WantlistService {

getComicWantlist(username) {
    return axios.get(API_URL + `wantlist/${username}`, { headers: authHeader() })
}

getComicFromWantlist(username, id) {
    return axios.get(API_URL + `wantlist/${username}/${id}`, { headers: authHeader() })
}

addComicToWantlist(username, id) {
    return axios.put(API_URL + `wantlist/${username}/${id}`, { headers: authHeader() })
}

deleteComicFromWantlist(username, id) {
    return axios.delete(API_URL + `wantlist/${username}/${id}`, { headers: authHeader() })
}

// getCollectionWantlist(username) {
//     return axios.get(API_URL + `wantlist/${username}`, { headers: authHeader() })
// }

// getCollectionFromWantlist(username, id) {
//     return axios.get(API_URL + `wantlist/${username}/${id}`, { headers: authHeader() })
// }

// addCollectionToWantlist(username, id) {
//     return axios.get(API_URL + `wantlist/${username}/${id}`, {headers: authHeader() })
// }

// deleteCollectionFromWantlist(username, id) {
//     return axios.get(API_URL + `wantlist/${username}/${id}`, { headers: authHeader() })
// }

}
export default new WantlistService();