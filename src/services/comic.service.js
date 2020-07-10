import axios from "axios";
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class ComicDataService {
    getAll() {
      return axios.get(API_URL + 'comic/search');
    }
  
    get(id) {
      return axios.get(API_URL + `comic/admin/${id}`, { headers: authHeader() });
    }

    findByTitle(searchableTitle) {
        return axios.get(API_URL + `comic/search?searchableTitle=${searchableTitle}`);
      }
  
    create(data) {
      return axios.post(API_URL + 'comic/admin', data, { headers: authHeader() });
    }
  
    update(id, data) {
      return axios.put(API_URL + `comic/admin/${id}`, data, { headers: authHeader() });
    }
  
    delete(id) {
      return axios.delete(API_URL + `comic/admin/${id}`, { headers: authHeader() });
    }

    getCollected(id) {
      return axios.get(API_URL + `comic/collected/${id}`);
    }
 }
  export default new ComicDataService();