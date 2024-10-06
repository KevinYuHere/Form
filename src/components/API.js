//将拦截器整体导入
import request from '@/components/Interceptor.js'

// 封装所有的API接口


export function ClearPatientChat(params={}){
    return request({
        url:'/chat/clear',
        method:'post',
        params:params,
    })
}