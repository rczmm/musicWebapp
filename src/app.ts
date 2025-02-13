import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createUI } from 'taro-ui-vue3'

import './app.scss'

const App = createApp({
  onShow(options) {
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

const tuv3 = createUI()
App.use(tuv3)

App.use(createPinia())

export default App
