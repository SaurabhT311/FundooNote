import AxiosService from './axiosService';
const axios = new AxiosService();

export default class userService {

     baseurl = "http://localhost:4000"

    registration = (data) => {
        return axios.postMethod(`${this.baseurl}/registration`, data)  
    }

    login=(data)=>{
        return axios.postMethod(`${this.baseurl}/login`,data);
    }

    forgotPassword=(data)=>{
        return axios.postMethod(`${this.baseurl}/forgotpassword`,data);
    }

    resetPassword=(data,token)=>{
        return axios.postMethod(`${this.baseurl}/resetpassword/:token`,data,
        {
            headers:{
                token:token
            }
        });
    }
}
