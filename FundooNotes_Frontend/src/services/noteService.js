import AxiosService from './axiosService';
const axios = new AxiosService();

const baseurl = "http://localhost:4000";

const token=localStorage.getItem("token");

export default class noteService {

     createNote=(data,token)=>{
          return axios.postMethod(`${baseurl}/note`,data,
          {
              headers:{
                  token:token
              }
          });
     }

     getNote=()=>{
         console.log(token);
         return axios.getMethod(`${baseurl}/note/get`,{
             headers:{
                 token:token
             }
         })
     }

     updateNote=(data,id)=>{
         console.log("id is:",id);
        return axios.updateMethod(`${baseurl}/note/${id}`,data,{
            headers:{
                token:token
            }
        })
     }

     archiveNote=(id,data)=>{
         return axios.updateMethod(`${baseurl}/note/archive/${id}`,data,{
             headers:{
                 token:token
             }
         })
     }

     trashNote=(id,data)=>{
         return axios.updateMethod(`${baseurl}/trash/${id}`,data,{
             headers:{
                 token:token
             }
         })
     }

     deleteNote=(id)=>{
         console.log("id is:",id);
         return axios.deleteMethod(`${baseurl}/note/${id}`,{
             headers:{
                 token:token
             }
         })
     }

}