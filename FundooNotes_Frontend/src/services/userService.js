import AxiosService from './axiosService';
const axios = new AxiosService();

export default class userService {

     baseurl = "http://localhost:4000"

    registration = (data) => {
        return axios.postMethod(`${this.baseurl}/registration`, data)
        
    }
}
