const express = require('express')
const Random = require('mockjs').Random;

const app = express()
const port = 3000

const token = Random.string('upper', 32, 32);

function resultSuccess(result, { message = 'ok' } = {}) {
  return {
    code: 200,
    result,
    message,
    type: 'success',
  };
}

function doCustomTimes(times, callback) {
  let i = -1;
  while (++i < times) {
    callback(i);
  }
}

const adminInfo = {
  userId: '1',
  username: 'admin',
  realName: 'Admin',
  avatar: Random.image(),
  desc: 'manager',
  password: Random.string('upper', 4, 16),
  token,
  permissions: [
    {
      label: '主控台',
      value: 'dashboard_console',
    },
    {
      label: '监控页',
      value: 'dashboard_monitor',
    },
    {
      label: '工作台',
      value: 'dashboard_workplace',
    },
    {
      label: '基础列表',
      value: 'basic_list',
    },
    {
      label: '基础列表删除',
      value: 'basic_list_delete',
    },
  ],
};

const tableList = (pageSize) => {
  const result = [];
  doCustomTimes(pageSize, () => {
    result.push({
      id: '@integer(10,999999)',
      beginTime: '@datetime',
      endTime: '@datetime',
      address: '@city()',
      name: '@cname()',
      avatar: Random.image('400x400', Random.color(), Random.color(), Random.first()),
      date: `@date('yyyy-MM-dd')`,
      time: `@time('HH:mm')`,
      'no|100000-10000000': 100000,
      'status|1': [true, false],
    });
  });
  return result;
};

app.post('/login', (req, res) => {
  res.json(resultSuccess({ token }))
})

app.get('/admin_info', (req, res) => {
  res.json(resultSuccess(adminInfo))
})

app.get('/table/list', (req, res) => {
  const { page = 1, pageSize = 10, name } = req.query;
  const list = tableList(Number(pageSize));
  //并非真实，只是为了模拟搜索结果
  const count = name ? 30 : 60;
  res.json(resultSuccess({
    page: Number(page),
    pageSize: Number(pageSize),
    pageCount: count,
    itemCount: count * Number(pageSize),
    list,
  }))
})

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`)
})