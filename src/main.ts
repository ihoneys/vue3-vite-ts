import { createApp } from 'vue'
const app = createApp(App)
// TypeScript error? Run VSCode command
// TypeScript: Select TypeScript version - > Use Workspace Version
import App from './App.vue'
// import store from './store'
import router from './router'
import { LocalStorage, SessionStorage } from 'storage-manager-js'
import { encrypt, sm4Decrypt } from './common/function'
import { LOCALSTORAGE_SYMBOL, SESSIONSTORAGE_SYMBOL } from './symbol/index'
import {
  Tabbar,
  TabbarItem,
  Image as VanImage,
  Lazyload,
  Button,
  Field,
  CellGroup,
  Toast,
  Form,
  TreeSelect,
  NavBar,
  Tab,
  Tabs,
  Popup,
  RadioGroup,
  Radio,
  ActionSheet,
  Icon,
  Cell,
  List,
  CountDown,
  DatetimePicker,
  Picker,
  Search,
  DropdownMenu,
  DropdownItem,
  Swipe,
  SwipeItem,
  Rate,
  Checkbox,
  Dialog,
  NoticeBar,
  Overlay 
} from 'vant'
import VanNavBar from '@/components/NavBar/Index.vue'
import 'vant/lib/index.css'
import 'amfe-flexible/index.js'
import 'babel-polyfill'
import './common/public.css'

// import VConsole from 'vconsole'
// let vconsole = new VConsole()
// export default vconsole

console.log(import.meta.env.MODE, '环境变量')

app.component('CustomVanNavBar', VanNavBar)
app
  // .use(store)
  .use(router)
  .use(Tabbar)
  .use(TabbarItem)
  .use(VanImage)
  .use(Lazyload)
  .use(Button)
  .use(Field)
  .use(CellGroup)
  .use(Toast)
  .use(Dialog)
  .use(Form)
  .use(TreeSelect)
  .use(NavBar)
  .use(Tab)
  .use(Tabs)
  .use(Popup)
  .use(Radio)
  .use(RadioGroup)
  .use(ActionSheet)
  .use(Icon)
  .use(Cell)
  .use(List)
  .use(CountDown)
  .use(DatetimePicker)
  .use(Picker)
  .use(Search)
  .use(DropdownItem)
  .use(DropdownMenu)
  .use(Swipe)
  .use(SwipeItem)
  .use(Rate)
  .use(Checkbox)
  .use(NoticeBar)
  .use(Overlay)
  .mount('#app')

// app.provide('LOCALSTORAGE_SYMBOL', LocalStorage)
// app.provide('SESSIONSTORAGE_SYMBOL', SessionStorage)

app.config.globalProperties.$LocalStorage = LocalStorage
app.config.globalProperties.$SessionStorage = SessionStorage

app.config.globalProperties.$filters = {
  decrypt(value) {
    return sm4Decrypt(value)
  },
  encrypt(value) {
    return encrypt(value)
  },
  transformPayStatus(status) {
    const payStatus = {
      1: '未支付',
      2: '已付款',
      3: '待退款',
      4: '已退款',
      5: '已支付确费中',
      6: '已支付确费失败',
    }
    return payStatus[status]
  },
  transformOrderStatus(status) {
    const statusObj = {
      1: '已取消',
      2: '已停诊',
      3: '预约成功',
      4: '已爽约',
      5: '已取号',
      6: '已就诊',
      7: '出号中',
      8: '出号失败',
    }
    return statusObj[status]
  },
  isCanelReserve(status) {
    return status != 1 && status != 4 && status != 5 && status != 6
  },
}
// import FastClick from 'fastclick'
// FastClick.attach(document.body)
