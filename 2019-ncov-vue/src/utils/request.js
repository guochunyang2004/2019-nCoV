import axios from 'axios';
//import { notification } from 'ant-design-vue'
function request(options) {
    return axios(options).then(res =>{
        return res;
    }).catch(error => {
        const { response: { status, statusText }} = error;
        // notification.error({
        //     //禁止eslint提醒标记
        //     // eslint-disable-next-line no-unused-vars
        //     // message: h => {
        //     //     <div>
        //     //         请求错误<span style="color:red">{status}</span> : {options.url}
        //     //     </div>
        //     // },
        //     message:"请求错误"+status+"："+ options.url+"",
        //     description:statusText
        // });
        console.log(status, statusText)
        return Promise.reject(error);
    })
}
export default request;