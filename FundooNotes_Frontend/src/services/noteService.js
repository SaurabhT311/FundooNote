import AxiosService from './axiosService';
const axios = new AxiosService();

const baseurl = "http://localhost:4000";

export default class noteService {

     createNote=(data,token)=>{
          return axios.postMethod(`${baseurl}/note`,data,
          {
              headers:{
                  token:token
              }
          });
     }

}