import axios from 'axios'

//let base = 'http://wori.shenwang.mobi/';
//let base = '/api/';
let base = ""//(process.env.NODE_ENV === 'development' ? '/api' :'http://wori.shenwang.mobi');
axios.defaults.withCredentials=true;
axios.defaults.timeout = 120000;
// axios.interceptors.request.use((config) => {
//   return config
// }, (err) => {
//   alert('请求超时');
//   return Promise.resolve(err)
// });
//
//
// axios.interceptors.response.use((config) => {
//   // 数据统一校验处理
//   config.headers.Accept = 'application/json';
//   return config
// }, (err) => {
//   // 数据异常统一处理
//   if (err.response.status === 504 || err.response.status === 404) {
//     console.log("错误404||504");
//   } else if (err.response.status === 403) {
//     alert('权限不足,请联系管理员')
//   } else {
//     alert('未知错误')
//   }
//   return Promise.resolve(err)
// });


export function postRequest(url, params) {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//export function post(url, params) {
//  return axios({
//    method: 'post',
//    url: `${base}${url}`,
//    data: params,
//    headers: {
//      'Content-Type': 'application/json'
//    }
//  })
//}
export function post(url,params){
  return new Promise((resolve,reject) => {
    axios({
      method: 'post',
      url: `${base}${url}`,
      data: params,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if(response.data.code===0){
        resolve(response);
      }else{
        alert(`${url}接口错误，错误码：${response.data.code}`)
      }
    }).then(err => {
      reject(err)
    })
  })
}
export function put(url, params) {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function remove(url) {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  })
}

// export function get(url) {
//   return axios({
//     method: 'get',
//     url: `${base}${url}`
//   })
// }
export function get(url,params){
  return new Promise((resolve,reject) => {
    axios({
      method: 'get',
      url: `${base}${url}`,
      params: params,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if(response.data.code===0){
        resolve(response);
      }else{
        alert(`${url}接口错误，错误码：${response.data.code}`)
      }
    }).then(err => {
      reject(err)
    })
  })
}
