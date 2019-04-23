export default [
  {
    code:"sksw",
    title: '水库水位',
    datepicker: '2019-03-22 00:00:00',
    parentTitle:"水库水位父级标题",
    childTitle: "水库水位子级标题",
    enableTable: false,
    buttons: [
      {
        label: '上一页',
        name: 'per'
      },
      {
        label: '下一页',
        name: 'next'
      },
      {
        label: '数据列表',
        name: 'dataTable'
      }
    ],
    selects: [
      {
        name: 'test',
        checked: 0,
        options: [
          {
            label: '1小时',
            value: '1h',
            dateType: 'datetime',
            dateFormat: 'yyyy-MM-dd HH:00:00'
          },
          {
            label: '3小时',
            value: '3h',
            dateType: 'datetime',
            dateFormat: 'yyyy-MM-dd HH:00:00'
          },
          {
            label: '6小时',
            value: '6h',
            dateType: 'datetime',
            dateFormat: 'yyyy-MM-dd HH:00:00'
          },
          {
            label: '日雨量',
            value: '1day',
            dateType: 'date',
            dateFormat: 'yyyy-MM-dd'
          },
          {
            label: '月雨量',
            value: '1month',
            dateType: 'month',
            dateFormat: 'yyyy-MM'
          },
          {
            label: '年雨量',
            value: '1year',
            dateType: 'year',
            dateFormat: 'yyyy'
          },
          {
            label: '自定义',
            value: 'defined',
            dateType: 'daterange',
            dateFormat: 'yyyy-MM-dd'
          }
        ]
      }
    ],
    tableField:[
        {
            prop:"name",
            label:"姓名",
            width:"173",
            headalign:"center",
            align:"center"
        },{
            prop:"age",
            label:"年龄",
            width:"75",
            headalign:"center",
            align:"center"
        },{
            prop:"sex",
            label:"性别",
            width:"75",
            headalign:"center",
            align:"center"
        },{
            prop:"native",
            label:"籍贯",
            width:"177",
            headalign:"center",
            align:"center"
        }
    ],
    tableData:[],
    tablePageSize:10
  },
  {
    code:"skll",
    title: '水库流量',
    datepicker: '2019-03-22',
    parentTitle:"水库流量父级标题",
    childTitle: "水库流量子级标题",
    enableTable: false,
    buttons: [
      {
        label: '查询',
        name: 'search'
      }
    ],
    selects: [
      {
        name: 'test2',
        checked: 0,
        options: [
          {
            label: '日雨量',
            value: '1day',
            dateType: 'date',
            dateFormat: 'yyyy-MM-dd'
          },
          {
            label: '月雨量',
            value: '1month',
            dateType: 'month',
            dateFormat: 'yyyy-MM'
          },
          {
            label: '年雨量',
            value: '1year',
            dateType: 'year',
            dateFormat: 'yyyy'
          },
          {
            label: '自定义',
            value: 'defined',
            startTime: '2019-3-25',
            endTime: '2019-3-27',
            dateType: 'daterange',
            dateFormat: 'yyyy-MM-dd'
          }
        ]
      },
      {
        name: 'prov',
        checked: 0,
        options: [
          {
            label: '省',
            value: 'province'
          },
          {
            label: '市',
            value: 'city'
          },
          {
            label: '区',
            value: 'area'
          }
        ]
      }
    ],
    tableField:[
        {
            prop:"id",
            label:"编号",
            width:"98",
            headalign:"center",
            align:"center"
        },
        {
            prop:"context",
            label:"内容",
            width:"304",
            headalign:"center",
            align:"center"
        },
        {
            prop:"date",
            label:"日期",
            width:"98",
            headalign:"center",
            align:"center"
        }
    ],
    tableData:[],
    tablePageSize:10
  },
  {
    code:"skcc",
    title: '水库测试',
    parentTitle:"水库测试父级标题",
    childTitle: "水库测试子级标题",
    enableTable: false,
    datepicker: {
      value: '2019-03-22 00:00:00',
      type: 'date',
      fmt: 'yyyy-MM-dd HH:mm:ss'
    },
    buttons: [
      {
        label: '测试按钮',
        name: 'btnTest'
      }
    ],
    tableField:[
        {
            prop:"id",
            label:"编号",
            width:"120",
            headalign:"center",
            align:"center"
        },
        {
            prop:"watername",
            label:"水库名称",
            width:"380",
            headalign:"center",
            align:"center"
        }
    ],
    tableData:[],
    tablePageSize:10
  }
]
