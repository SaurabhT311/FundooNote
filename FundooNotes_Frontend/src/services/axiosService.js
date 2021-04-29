import axios from 'axios'

export default class AxiosService{

    postMethod=(url,data,isHeader=false)=>{
        return axios.post(url,data,isHeader);
    }

    getMethod=(url,isHeader=false)=>{
        return axios.get(url,isHeader);
    }

    updateMethod=(url,data,isHeader=false)=>{
        return axios.put(url,data,isHeader);
    }

    deleteMethod=(url,isHeader=false)=>{
        return axios.delete(url,isHeader)
    }
}
