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

let joblogs = [
  {
    "id": 1,
    "user": {
      "id": 1,
      "organ": {
        "id": 1,
        "name": "研发部",
        "desc": "负责研发工作"
      },
      "name": "admin",
      "password": "c4ca4238a0b923820dcc509a6f75849b",
      "displayName": "Alex",
      "enabled": false,
      "isAdmin": true,
      "createAt": "2018-09-25 09:40:13",
      "updateAt": "2018-09-25 09:40:13"
    },
    "project": {
      "id": 1,
      "name": "学校管理系统",
      "status": 2,
      "desc": "正在进行中 第一个版本已发布",
      "createAt": "2018-09-19 17:59:50",
      "updateAt": "2018-09-19 18:00:45"
    },
    "type": {
      "id": 4,
      "name": "code",
      "alias": "编码",
      "desc": "写代码",
      "createAt": "2018-09-19 17:55:50",
      "updateAt": "2018-09-19 17:55:50"
    },
    "title": "写代码",
    "content": "详细地写代码",
    "progress": 0.3,
    "startTime": "2018-09-19T13:56:50+08:00",
    "endTime": "2018-09-19T17:56:50+08:00",
    "createAt": "2018-09-26 09:58:51",
    "updateAt": "2018-09-26 09:58:51"
  },
  {
    "id": 3,
    "user": {
      "id": 1,
      "organ": {
        "id": 1,
        "name": "研发部",
        "desc": "负责研发工作"
      },
      "name": "admin",
      "password": "c4ca4238a0b923820dcc509a6f75849b",
      "displayName": "Alex",
      "enabled": false,
      "isAdmin": true,
      "createAt": "2018-09-25 09:40:13",
      "updateAt": "2018-09-25 09:40:13"
    },
    "project": {
      "id": 4,
      "name": "救援应急云平台",
      "status": 0,
      "desc": "正在进行中 第一个版本已发布",
      "createAt": "2018-09-19 18:01:18",
      "updateAt": "2018-09-19 18:01:18"
    },
    "type": {
      "id": 5,
      "name": "design",
      "alias": "设计",
      "desc": "UI设计等",
      "createAt": "2018-09-19 17:56:17",
      "updateAt": "2018-09-19 17:56:17"
    },
    "title": "页面设计",
    "content": "详细地设计页面",
    "progress": 0.8,
    "startTime": "2018-09-26T09:00:00+08:00",
    "endTime": "2018-09-26T11:20:00+08:00",
    "createAt": "2018-09-26 10:50:35",
    "updateAt": "2018-09-26 10:50:35"
  }

]

const organs = [
  {
    "desc": "",
    "head": "Alex",
    "id": 1,
    "manager": 1,
    "name": "研发部",
    "parent": {
      "id": 5,
      "name": "技术部",
      "parent": 0,
      "desc": "包含研发部、数据部",
      "manager": 0,
      "createAt": "2018-10-09 09:04:25",
      "updateAt": "2018-10-09 09:04:25"
    }
  },
  {
    "desc": "",
    "head": "邵静惠",
    "id": 4,
    "manager": 2,
    "name": "高层管理",
    "parent": {
      "id": 0,
      "name": "",
      "parent": 0,
      "manager": 0,
      "createAt": "0001-01-01 00:00:00",
      "updateAt": "0001-01-01 00:00:00"
    }
  },
  {
    "desc": "包含研发部、数据部",
    "head": "Alex",
    "id": 5,
    "manager": 1,
    "name": "技术部",
    "parent": {
      "id": 0,
      "name": "",
      "parent": 0,
      "manager": 0,
      "createAt": "0001-01-01 00:00:00",
      "updateAt": "0001-01-01 00:00:00"
    }
  }
]


const users = [
  {
    "id": 1,
    "organ": {
      "id": 1,
      "name": "研发部"
    },
    "name": "admin",
    "password": "c4ca4238a0b923820dcc509a6f75849b",
    "displayName": "应",
    "enabled": false,
    "isAdmin": true,
    "createAt": "2018-09-25 09:40:13",
    "updateAt": "2018-09-25 09:40:13"
  },
  {
    "id": 2,
    "organ": {
      "id": 3,
      "name": "数据部"
    },
    "name": "user",
    "password": "c4ca4238a0b923820dcc509a6f75849b",
    "displayName": "夏",
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
  },
  {
    "id": 6,
    "name": "meeting",
    "alias": "开会",
    "desc": "开会",
    "createAt": "2018-09-28 17:38:38",
    "updateAt": "2018-09-28 17:38:38"
  },
  {
    "id": 7,
    "name": "画图",
    "alias": "画图",
    "desc": "",
    "createAt": "2018-09-28 17:38:52",
    "updateAt": "2018-09-28 17:38:52"
  },
  {
    "id": 8,
    "name": "请假",
    "alias": "请假",
    "desc": "请假",
    "createAt": "2018-09-28 17:38:59",
    "updateAt": "2018-09-28 17:38:59"
  },
  {
    "id": 9,
    "name": "文档建设",
    "alias": "文档建设",
    "desc": "文档建设",
    "createAt": "2018-09-28 17:39:06",
    "updateAt": "2018-09-28 17:39:06"
  },
  {
    "id": 11,
    "name": "测试",
    "alias": "测试",
    "desc": "测试",
    "createAt": "2018-09-28 17:40:37",
    "updateAt": "2018-09-28 17:40:37"
  },
  {
    "id": 12,
    "name": "学习",
    "alias": "学习",
    "desc": "学习",
    "createAt": "2018-09-28 17:43:43",
    "updateAt": "2018-09-28 17:43:43"
  },
  {
    "id": 13,
    "name": "培训",
    "alias": "培训",
    "desc": "培训",
    "createAt": "2018-09-28 17:43:50",
    "updateAt": "2018-09-28 17:43:50"
  },
  {
    "id": 14,
    "name": "调研",
    "alias": "调研",
    "desc": "调研",
    "createAt": "2018-09-28 17:43:56",
    "updateAt": "2018-09-28 17:43:56"
  },
  {
    "id": 15,
    "name": "维护",
    "alias": "维护",
    "desc": "维护",
    "createAt": "2018-09-28 17:44:30",
    "updateAt": "2018-09-28 17:44:30"
  },
  {
    "id": 16,
    "name": "数据处理",
    "alias": "数据处理",
    "desc": "数据处理",
    "createAt": "2018-09-28 17:44:38",
    "updateAt": "2018-09-28 17:44:38"
  },
  {
    "id": 17,
    "name": "模型贴图",
    "alias": "模型贴图",
    "desc": "模型贴图",
    "createAt": "2018-09-28 17:44:53",
    "updateAt": "2018-09-28 17:44:53"
  },
  {
    "id": 18,
    "name": "三维建模",
    "alias": "三维建模",
    "desc": "三维建模",
    "createAt": "2018-09-28 17:45:02",
    "updateAt": "2018-09-28 17:45:02"
  },
  {
    "id": 19,
    "name": "功能配置",
    "alias": "功能配置",
    "desc": "功能配置",
    "createAt": "2018-09-28 17:45:13",
    "updateAt": "2018-09-28 17:45:13"
  },
  {
    "id": 20,
    "name": "sale",
    "alias": "售前服务/技术支持/质量管理",
    "desc": "售前服务/技术支持/质量管理",
    "createAt": "2018-09-28 17:45:26",
    "updateAt": "2018-09-28 17:45:26"
  },
  {
    "id": 21,
    "name": "other",
    "alias": "其他",
    "desc": "",
    "createAt": "2018-09-28 17:45:35",
    "updateAt": "2018-09-28 17:45:35"
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

  m.onGet('/user/alter').reply(config => {
    return new Promise((resolve, reject) => {
      if (config.params.oldPwd != users[0].id) {
        resolve([200, {success: false, msg: '密码错误'}])
      }
      setTimeout(() => {
        resolve([200,
          users[0]
        ])
      }, 3000)
    })
  })


  m.onGet('/user/me').reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200,
          users[1]
        ])
      }, 2000)
    })
  })

  m.onGet('/rest/jobs').reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200,
          joblogs
        ])
      }, 1500)
    })
  })

  m.onPost('/rest/job').reply(config => {
    let jsonStr = config.data
    let jl = JSON.parse(jsonStr)
    jl.id = Math.floor(Math.random()*1000)
    jl.type = types.find(t => t.id === jl.type.id)
    jl.project = pros.find(p => p.id === jl.project.id)
    jl.startEditNow = false
    joblogs.push(jl)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200,
          jl
        ])
      }, 2000)
    })
  })

  m.onDelete('/rest/job/1').reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200,
          "true"
        ])
      }, 1000)
    })
  })

  m.onGet('/rest/job/me').reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200,
          joblogs
        ])
      }, 1500)
    })
  })

  m.onGet('/rest/users').reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200,
          users
        ])
      }, 1000)
    })
  })

  m.onPost('/rest/settings').reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200,
          users[0]
        ])
      }, 1000)
    })
  })

  m.onDelete('rest/settings/2').reply(config => {
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
