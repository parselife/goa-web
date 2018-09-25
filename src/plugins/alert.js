// import something here
import {Notify} from 'quasar'

const defaultConfig = {
  timeout: 2500, // 以毫秒为单位; 0意味着没有超时
  position: 'top'
}
const alert = {
  /**
   * 警告提示
   * @param msg
   * @param config
   */
  warning(msg, config) {
    let obj = {
      type: 'warning',
      message: msg,
      ...defaultConfig,
    }
    if (config !== undefined) {
      Object.assign(obj, config)
    }
    Notify.create(obj)
  },

  /**
   * 失败提示
   * @param msg
   * @param config
   */
  negative(msg, config) {
    let obj = {
      type: 'negative',
      message: msg,
      ...defaultConfig,
    }
    if (config !== undefined) {
      Object.assign(obj, config)
    }
    Notify.create(obj)
  },
  /**
   * 成功提示
   * @param msg
   * @param config
   */
  positive(msg, config) {
    let obj = {
      type: 'positive',
      message: msg,
      ...defaultConfig,
    }
    if (config !== undefined) {
      Object.assign(obj, config)
    }
    Notify.create(obj)
  },
  /**
   * 信息提示
   * @param msg
   * @param config
   */
  info(msg, config) {
    let obj = {
      type: 'info',
      message: msg,
      ...defaultConfig,
    }
    if (config !== undefined) {
      Object.assign(obj, config)
    }
    Notify.create(obj)
  }
}
export default ({app, router, Vue}) => {
  Vue.prototype.$alert = alert
}
