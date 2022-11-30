import axios from "axios"

export default {

    ApiInstance() {
        return axios.create({
            baseURL: "http://localhost:8080/",
            withCredentials: true
        })
    }
    
}