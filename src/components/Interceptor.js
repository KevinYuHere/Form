import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";

export const BaseURL = 'http://172.207.184.181:6001'

const http= axios.create({
    baseURL:BaseURL,
    timeout:5000,
})

//拦截器  -请求拦截
http.interceptors.request.use(config=>{
    //部分接口需要token
    //let token=localStorage.getItem('token');
    //if(token){
        //config.headers.token=token;
        // config.headers ={
        // 'token':token
        // }
    //}
    return config;
},err=>{
    return Promise.reject(err)
})

//拦截器  -响应拦截
http.interceptors.response.use(res=>{
    const condition = true;
    if(condition){
        return Promise.resolve(res.data)
    }else{
        return Promise.reject(res.data)
    }
},err=>{
    return Promise.reject(err)
});

//整体导出
export default http;