export default [
  {
    title: '水库水位',
    datepicker: '2019-03-21 8:00:00',
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
    ]
  },
  {
    title: '水库流量',
    datepicker: '2019-03-22',
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
    ]
  },
  {
    title: '水库测试',
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
    ]
  }
]
