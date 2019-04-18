### ruff-table 微信小程序表格插件

##### 为什么有写这么一个插件，其实原生HTML的表格也不是很好用，比如不支持响应式啊、鼠标点击哪一行需要很复杂的dom操作才能实现。现如今MVVM框架盛行的年代，基于MVVM框架去写这么一个表格，是一件非常简单的事情。但是在个人开发微信小程序时候，遇到很多种需要表格插件的例子，而这一次搜到很好用的插件，连一些大厂的微信第三方组件库也没去做这件事。

##### 无奈，我只好自己做了。两天时间做完的，做的很粗糙，很多样式属性不支持自定义，因为我只是给自己开发。当然，这个插件基础已经搭好了，你可以在这上面进行扩展，修改成你需要的样子

> 插件模仿Element UI的Table风格，使用时候你需要传入header和data，其中，有关表格单元格宽度属性以及和data一一对应关系，都体现在header相应属性里面

## 特性
- 支持横屏滚动
- 支持分页

## API

### 属性

- header
```
header: [{ // 把表头每个字段以及字段属性都罗列出来
    label: '故障时间', //表格头的内容
    prop: 'time', // 跟data哪个字段关联
    width: 180 // 表头宽度
}, {
    label: '设备名称',
    prop: 'equipName',
    width: 100
}, {
    label: '故障代码',
    prop: 'warnCode',
    width: 60
}, {
    label: '故障内容',
    prop: 'content',
    width: 250
}, {
    label: '解除时间',
    prop: 'releaseTime',
    width: 150
}, {
    label: '是否解除',
    prop: 'isRelease',
    width: 70
}]
```

- list
```
list: [{ // 这里面填充数据就好了
    time: '2019-01-01 00:01:01',
    equipName: '西城区52号3502',
    warnCode: 113,
    content: '电压波动幅度过大',
    releaseTime: '2019-01-01 00:07:52',
    isRelease: true
}]
```

### 事件
- bind:click 点击事件，点击那一列就会出现那一列的index索引值
返回值：event.detail中获取 { index: 2 }

- bind:change 翻页事件
返回值：event.detail中获取 { current: 1, total: 4 }

> 使用方法：把component下面整个ruff-table拷贝一下，放在你喜欢的目录下面，然后在你需要引用页面的json文件里，把useComponent对应的标签名和路径写上去就好了