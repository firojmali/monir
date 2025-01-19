import request from '@/utils/request'
import requestbd from '@/utils/requestbd'




export function setUpazilas(data: {}) {
  return request({
    url: '/upazilas',
    method: 'post',
    data
  })
}

export function updateUpazila(data: any) {
  return request({
    url: '/update/upazila',
    method: 'post',
    data
  })
}
export function updateUnion(data: any) {
  return request({
    url: '/update/unions',
    method: 'post',
    data
  })
}

export function updateDistrict(data: any) {
  return request({
    url: '/update/district',
    method: 'post',
    data
  })
}
export function updateDivisions(data: any) {
  return request({
    url: '/update/divisions',
    method: 'post',
    data
  })
}
export function setDivisions(data: {}) {
  return request({
    url: '/divisions',
    method: 'post',
    data
  })
}
export function setDistricts(data: {}) {
  return request({
    url: '/district',
    method: 'post',
    data
  })
}
export function getDivisions() {
  return request({
    url: '/divisions',
    method: 'get'
  })
}
export function getDistricts() {
  return request({
    url: '/districts',
    method: 'get'
  })
}
export function getUpazilas() {
  return request({
    url: '/upazilas',
    method: 'get'
  })
}
export function getUnions(upazila_code_id:number) {
  return request({
    url: '/unions?upazila_code_id='+upazila_code_id,
    method: 'get'
  })
}

export function getProducts(page: string | number) {
  return request({
    url: '/products?page=' + page,
    method: 'get'
  })
}
//getDistricts, setDivisions, setDistricts

export function getDivisionEN() {
  return requestbd({
    url: '?action=getdoptors&el=doptor&elValue=alldiv&target=first_level&layer=&lang=en&currentHostId=',
    method: 'get',
  })
}
export function getDivisionBN() {
  return requestbd({
    url: '?action=getdoptors&el=doptor&elValue=alldiv&target=first_level&layer=&lang=bn&currentHostId=',
    method: 'get',
  })
}

export function getDistrictEN(code_id:number) {
  return requestbd({
    url: '?action=getdoptors&el=first_level&elValue='+code_id+'&target=second_level&layer=alldiv&lang=en&currentHostId=52930',
    method: 'get',
  })
}


export function getDistrictBN(code_id:number) {
  return requestbd({
    url: '?action=getdoptors&el=first_level&elValue='+code_id+'&target=second_level&layer=alldiv&lang=bn&currentHostId=52930',
    method: 'get',
  })
}
export function getUpazilaEN(code_id:number) {
  return requestbd({
    url: '?action=getdoptors&el=second_level&elValue='+code_id+'&target=third_level&layer=alldiv&lang=en&currentHostId=52930',
    method: 'get',
  })
}


export function getUpazilaBN(code_id:number) {
  return requestbd({
    url: '?action=getdoptors&el=second_level&elValue='+code_id+'&target=third_level&layer=alldiv&lang=bn&currentHostId=52930',
    method: 'get',
  })
}
export function getUnionEN(code_id:number) {
  return requestbd({
    url: '?action=getdoptors&el=third_level&elValue='+code_id+'&target=third_level&layer=alldiv&lang=en&currentHostId=52930',
    method: 'get',
  })
}


export function getUnionBN(code_id:number) {
  return requestbd({
    url: '?action=getdoptors&el=third_level&elValue='+code_id+'&target=third_level&layer=alldiv&lang=bn&currentHostId=52930',
    method: 'get',
  })
}
