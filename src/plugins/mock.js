// import something here
import MockAdapter from 'axios-mock-adapter'
import {axiosInstance} from './axios'

// leave the export, even if you don't use it
export default ({app, router, Vue}) => {
// dev 时启用 mock
  if (Object.is(process.env.NODE_ENV, 'development')) {
    setup();
  }
}

const organs = [
  {
    "id": 1,
    "name": "研发部",
    "desc": "负责研发工作"
  },
  {
    "id": 3,
    "name": "数据部",
    "desc": "负责数据生产工作"
  },
  {
    "id": 4,
    "name": "高层管理",
    "desc": "负责公司管理与决策工作"
  }
]

const users = [
  {
    "id": 1,
    "organ": {
      "id": 0,
      "name": "研发部"
    },
    "name": "admin",
    "password": "c4ca4238a0b923820dcc509a6f75849b",
    "displayName": "Alex",
    "enabled": false,
    "isAdmin": true,
    "createAt": "2018-09-25 09:40:13",
    "updateAt": "2018-09-25 09:40:13"
  },
  {
    "id": 2,
    "organ": {
      "id": 0,
      "name": "研发部"
    },
    "name": "user",
    "password": "c4ca4238a0b923820dcc509a6f75849b",
    "displayName": "User",
    "enabled": false,
    "isAdmin": false,
    "createAt": "2018-09-25 09:40:13",
    "updateAt": "2018-09-25 09:40:13"
  }
]

const types = [
  {
    "id": 4,
    "name": "code",
    "alias": "编码",
    "desc": "写代码",
    "createAt": "2018-09-19 17:55:50",
    "updateAt": "2018-09-19 17:55:50"
  },
  {
    "id": 5,
    "name": "design",
    "alias": "设计",
    "desc": "UI设计等",
    "createAt": "2018-09-19 17:56:17",
    "updateAt": "2018-09-19 17:56:17"
  }
]

const pros = [
  {
    "id": 1,
    "name": "学校管理系统",
    "status": 2,
    "desc": "正在进行中 第一个版本已发布",
    "createAt": "2018-09-19 17:59:50",
    "updateAt": "2018-09-19 18:00:45"
  },
  {
    "id": 4,
    "name": "救援应急云平台",
    "status": 0,
    "desc": "正在进行中 第一个版本已发布",
    "createAt": "2018-09-19 18:01:18",
    "updateAt": "2018-09-19 18:01:18"
  }
]

function setup() {
  let m = new MockAdapter(axiosInstance)

  m.onGet('/rest/users').reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200,
          users
        ])
      }, 1000)
    })
  })

    m.onPost('/rest/user').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200,
            users[0]
          ])
        }, 1000)
      })
    })

  m.onDelete('rest/user/2').reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200,
          users[1]
        ])
      }, 1000)
    })
  })

  m.onGet('/rest/organs').reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200,
          organs
        ])
      }, 1000)
    })
  })

  m.onGet('/rest/pros').reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200,
          pros
        ])
      }, 1000)
    })
  })

  m.onGet('/rest/types').reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200,
          types
        ])
      }, 1000)
    })
  })
}
