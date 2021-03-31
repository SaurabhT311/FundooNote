import axios from 'axios'

export default class AxiosService{

    postMethod=(url,data,isHeader=false)=>{
        return axios.post(url,data,isHeader);
    }
}
