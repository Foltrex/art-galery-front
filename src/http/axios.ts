import axios from "axios";

export let axiosApi = axios.create();

if (typeof window !== 'undefined') {
    axiosApi = axios.create({baseURL: `${document.location.protocol}//${document.location.hostname}:8080/`});
}

axiosApi.interceptors.request.use(request => {
    return request;
}, (error) => {
    console.log('REQUEST ERROR: ' + error)
    return Promise.reject(error);
})

axiosApi.interceptors.response.use(response => {
        return response;
    },
    (error) => {
        console.log('RESPONSE ERROR: ' + error)
        return Promise.reject(error);
    }
)
