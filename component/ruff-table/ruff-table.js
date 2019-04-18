Component({
    properties: {
        header: { // 表头
            type: Array,
            value: []
        },
        list: { // 数据列表
            type: Array,
            value: []
        },
        total: { // 总数据条数
            type: Number,
            value: 0
        },
        count: {
            type: Number, // 每一页多少条数据
            value: 0
        },
        pagination: { // 是否开启分页
            type: Boolean,
            value: true
        }
    },
    observers: {
        'header': function(newData, oldData) {
            let arr = newData.map(item => {
                return item.width;
            });
            this.setData({
                cellWidthList: arr
            });
        },
        'list': function(newData, oldData) {},
        'total': function(newData, oldData) {
            console.log(newData);
        },
        'count': function(newData, oldData) {
            console.log(newData);
        },
        'pagination': function(newData, oldData) {}
    },
    data: {
        flag: false,
        current: 1,
        cellWidthList: []
    },
    methods: {
        clickHere(e) {
            this.triggerEvent('click', { index: e.currentTarget.dataset.no }, { bubbles: true });
        },
        previous() {
            if (this.data.current - 1 > 0) {
                this.setData({
                    flag: false,
                    current: this.data.current - 1
                });
                this.triggerEvent('change', { current: this.data.current, total: this.data.total }, { bubbles: true });
            } else {
                this.triggerEvent('change', { code: 0, msg: '跳转页数不能小于0' }, { bubbles: true });
            }
        },
        next() {
            if (this.data.current + 1 <= this.data.total) {
                this.setData({
                    flag: false,
                    current: this.data.current + 1
                });
                this.triggerEvent('change', { current: this.data.current, total: this.data.total }, { bubbles: true });
            } else {
                this.triggerEvent('change', { code: 0, msg: '跳转页数不能大于总页数' }, { bubbles: true });
            }
        },
        jump() {
            if (this.data.flag) {
                this.triggerEvent('change', { code: 0, msg: '跳转页数不能小于0或者大于总页数' }, { bubbles: true });
            } else {
                this.triggerEvent('change', { current: this.data.current, total: this.data.total }, { bubbles: true });
            }
        },
        pageBlur(e) {
            if (Number(e.detail.value) > 0 && Number(e.detail.value) <= this.data.total) {
                this.setData({
                    current: Number(e.detail.value)
                });
            } else {
                this.setData({
                    flag: true
                });
            }
        }
    },
    created() {}, // 组件在内存中创建完毕执行 created 组件实例化，但节点树还未导入，因此这时不能用setData
    attached() {}, // 组件挂载之前执行 节点树完成，可以用setData渲染节点，但无法操作节点
    ready() {}, // 组件挂载后执行 组件布局完成，这时可以获取节点信息，也可以操作节点
    detached() {}, // 组件移除执行 组件实例从节点树中移除
    moved() {}, // 组件移动的时候执行 组件实例被移动到树的另一个位置
});