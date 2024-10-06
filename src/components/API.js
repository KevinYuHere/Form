//将拦截器整体导入
import request from '@/components/Interceptor.js'

// 封装所有的API接口

export function SendPatientChat(params){
    return request({
        url:'/chat/stream',
        method:'post',
        params:params,
    })
}

export function ClearPatientChat(params={}){
    return request({
        url:'/chat/clear',
        method:'post',
        params:params,
    })
}