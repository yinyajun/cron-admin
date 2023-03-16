import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
})

export function schedule() {
  return service({
    url: '/api/v1/schedule',
    method: 'get'
  })
}


export function active(job) {
  return service ({
    url: '/api/v1/active',
    method: 'get',
    params: { job }
  })
}


export function pause(job) {
  return service ({
    url: '/api/v1/pause',
    method: 'get',
    params: { job }
  })
}

export function remove(job) {
  return service({
    url: '/api/v1/remove',
    method: 'get',
    params: { job }
  })
}


export function add(spec, job) {
  return service({
    url: '/api/v1/add',
    method: 'get',
    params: { spec, job }
  })
}


export function history(job) {
  return service({
    url: '/api/v1/history',
    method: 'get',
    params: { job }
  })
}



export function jobs() {
  return service({
    url: '/api/v1/jobs',
    method: 'get'
  })
}

export function running() {
  return service({
    url: '/api/v1/running',
    method: 'get'
  })
}


export function execute(job) {
  return service({
    url: '/api/v1/execute',
    method: 'get',
    params: { job }
  })
}
