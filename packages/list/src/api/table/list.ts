import { http } from 'app/utilsAxios';

//获取table
export function getTableList(params) {
  return http.request({
    url: '/table/list',
    method: 'get',
    params,
  });
}
