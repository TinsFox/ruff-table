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
        pages: { // 总数据条数
            type: Number,
            value: 0
        },
        size: {
            type: Number, // 每一页多少条数据
            value: 0
        }
    },
    observers: {
        'header': function(newData, oldData) {
            if (newData && newData.length) {
                let fixedList = [], fixedWidth = 0
                let arr = newData.filter(item => {
                    if (item.fixed) {
                        fixedWidth += item.width
                        fixedList.push(item)
                    } else {
                        return item
                    }
                })
                this.setData({
                    normalHeader: arr,
                    fixedWidth: fixedWidth,
                    fixedHeader: fixedList
                });
            }
        },
        'list': function(newData, oldData) {
            if (newData && newData.length) {
                let temp = null, t = []
                t = newData.map(item => {
                    temp = null
                    
                    Object.keys(item).forEach(key => {
                        for(let i = 0; i < this.data.fixedHeader.length; i++) {
                            if (key == this.data.fixedHeader[i].prop) {
                                temp = key
                                break
                            }
                        }
                    })
                    if (temp) return item
                })
                this.setData({
                    fixedColumns: t
                })
            }
        },
        'pages': function(newData, oldData) {},
        'size': function(newData, oldData) {}
    },
    externalClasses: ['ruff-td-class'],
    data: {
        current: 1,
        fixedWidth: 0,
        fixedHeader: [],
        fixedColumns: [],
        normalHeader: [],
        showShadow: false
    },
    methods: {
        onClick(e) {
            const index = e.currentTarget.dataset.index;
            this.triggerEvent('click', { index: index, row: this.data.list[index] }, { bubbles: true });
        },
        onScroll(e) {
            if (e.detail.scrollLeft > 40) {
                this.setData({
                    showShadow: true
                })
            } else {
                this.setData({
                    showShadow: false
                })
            }
        },
        onPrevious() {
            if (this.data.current - 1 > 0) {
                this.setData({
                    current: this.data.current - 1
                });
                
            }
            this.triggerEvent('current-change', { current: this.data.current, pages: this.data.pages }, { bubbles: true });
        },
        onNext() {
            if (this.data.current + 1 <= this.data.pages) {
                this.setData({
                    current: this.data.current + 1
                });
                
            }
            this.triggerEvent('current-change', { current: this.data.current, pages: this.data.pages }, { bubbles: true });
        },
        onJump() {
            this.triggerEvent('current-change', { current: this.data.current, pages: this.data.pages }, { bubbles: true });
        },
        onSizeBlur(e) {
            this.triggerEvent('size-change', { size: parseInt(e.detail.value) }, { bubbles: true });
        } ,
        onCurrentBlur(e) {
            if (Number(e.detail.value) > 0 && Number(e.detail.value) <= this.data.pages) {
                this.setData({
                    current: Number(e.detail.value)
                });
            } else {
                this.setData({
                    current: 1
                });
            }
        }
    },
    created() {},
    attached() {},
    ready() {}
});
