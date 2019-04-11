/**
 * 配置参数说明
 * title表示右侧的tabs选项卡中显示的文本
 * name表示右侧tabs选项卡的name标识
 * context表示右侧按钮图片和表格字段的配置信息数组
 * imgsrc右侧图片src路径
 * imgname右侧图片显示名称
 * imgcode右侧图片code编码
 * isCheck是否选择checkbox(true或false)
 * enableCheckBox 是否启用checkbox功能
 * selectedImg选中图片和鼠标滑过的背景图片地址
 * tableField是表格配置信息
 * prop字段code
 * label字段显示名称
 * width单元格的宽度(px)
 * headalign表头显示的位置(left,center,right)
 * align内容显示的位置(left,center,right)
 * 
 * 
 */
export default [
    
    {
      title:"用户管理",
      code:"first",
      context:[
           {
              imgsrc:require('./assets/sltimg/xhry.png'),
              imgname:"巡河人员",
              imgcode:"xhry",
              isCheck:false,
              enableCheckBox:false,
              selectedImg:require('./assets/sltimg/ComBg02.png'),
              tableField:[
                  {
                      prop:"name",
                      label:"姓名",
                      width:"98",
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
                      width:"77",
                      headalign:"center",
                      align:"center"
                  }
              ]
          },{
              imgsrc:require('./assets/sltimg/xhsj.png'),
              imgname:"巡河事件",
              imgcode:"xhsj",
              isCheck:false,
              enableCheckBox:true,
              selectedImg:require('./assets/sltimg/ComBg02.png'),
              tableField:[
                    {
                        prop:"name",
                        label:"姓名",
                        width:"75",
                        headalign:"center",
                        align:"center"
                    }
                ]
          },{
              imgsrc:require('./assets/sltimg/gzjb.png'),
              imgname:"公众举报",
              imgcode:"gzjb",
              isCheck:false,
              enableCheckBox:true,
              selectedImg:require('./assets/sltimg/ComBg02.png'),
              tableField:[]
          }
      ]
  },{
      title:"配置管理",
      code:"second",
      context:[
        {
            imgsrc:require('./assets/sltimg/xhry.png'),
            imgname:"巡河信息",
            imgcode:"xhxx",
            isCheck:false,
            enableCheckBox:true,
            selectedImg:require('./assets/sltimg/ComBg02.png'),
            tableField:[
                {
                    prop:"name",
                    label:"姓名",
                    width:"65",
                    align:"center"
                },{
                    prop:"age",
                    label:"年龄",
                    width:"65",
                    align:"center"
                }
            ]
        }
      ]
  },{
      title:"角色管理",
      code:"third",
      context:[
        {
            imgsrc:require('./assets/sltimg/xhsj.png'),
            imgname:"角色管理",
            imgcode:"xhxx",
            isCheck:false,
            enableCheckBox:true,
            selectedImg:require('./assets/sltimg/ComBg02.png'),
            tableField:[
                {
                    prop:"name",
                    label:"姓名",
                    width:"65",
                    align:"center"
                },{
                    prop:"age",
                    label:"年龄",
                    width:"65",
                    align:"center"
                }
            ]
        }
      ]
  },{
      title:"信息管理",
      code:"four",
      context:[
        {
            imgsrc:require('./assets/sltimg/gzjb.png'),
            imgname:"信息管理",
            imgcode:"xhxx",
            isCheck:false,
            enableCheckBox:true,
            selectedImg:require('./assets/sltimg/ComBg02.png'),
            tableField:[
                {
                    prop:"name",
                    label:"姓名",
                    width:"65",
                    align:"center"
                },{
                    prop:"age",
                    label:"年龄",
                    width:"65",
                    align:"center"
                }
            ]
        }
      ]
  }

]