export default {
  pages: [
    'pages/index/index',
    'pages/my/my',
    'pages/musicPlayer/index',
    'pages/community/community'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#666',
    selectedColor: '#fdbb00',
    backgroundColor: '#fff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        pagePath: 'pages/my/my',
        text: '我的',
      },
      {
        pagePath: 'pages/community/community',
        text: '社区'
      },
    ]
  }
}
