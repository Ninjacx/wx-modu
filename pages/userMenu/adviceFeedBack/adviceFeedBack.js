Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },
  data: {
    userName: '首页',
    leftIndex: 0,
    leftTab: [{title: '摩托车'},{title: '汽车'}],
    region: ['上海市', '上海市', '浦东新区'],
  }, // 私有数据，可用于模板渲染
 
  methods: {
    // 拨打电话
    bindTextAreaBlur(){
    
    },
  }
})
