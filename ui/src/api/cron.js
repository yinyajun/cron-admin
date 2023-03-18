import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'

const service = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 3000
})

export function schedule() {
  return service({
    url: '/v1/schedule',
    method: 'get'
  })
}


export function active(job) {
  return service({
    url: '/v1/active',
    method: 'get',
    params: {
      job
    }
  })
}


export function pause(job) {
  return service({
    url: '/v1/pause',
    method: 'get',
    params: {
      job
    }
  })
}

export function remove(job) {
  return service({
    url: '/v1/remove',
    method: 'get',
    params: {
      job
    }
  })
}


export function add(spec, job) {
  return service({
    url: '/v1/add',
    method: 'get',
    params: {
      spec,
      job
    }
  })
}


export function history(job) {
  const offset = 0
  const size =100
  return service({
    url: '/v1/history',
    method: 'get',
    params: {
      job,
      offset,
      size
    }
  })
}


export function jobs() {
  return service({
    url: '/v1/jobs',
    method: 'get'
  })
}

export function members() {
  return service({
    url: '/v1/members',
    method: 'get'
  })
}

export function running() {
  return service({
    url: '/v1/running',
    method: 'get'
  })
}


export function execute(job) {
  return service({
    url: '/v1/execute',
    method: 'get',
    params: {
      job
    }
  })
}

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      const errMsg = 'Internal Error: ' + res.code
      console.error(res.code, res.msg)
      return Promise.reject(errMsg)
    } else {
      return res
    }
  },
  error => {
    console.error(error.message)
    return Promise.reject(error)
  }
)
