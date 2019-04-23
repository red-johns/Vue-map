<template>
  <el-row class="tac">
      <elt-esri-map :mapConfig="mapConfig" @loaded="loadedHandler">
        <SLT 
        slot="slt"
        :SLTData="SLTData"
        v-on:listenLeftOneChange="leftOneChange"
        v-on:listenSearchClick="searchClick"
        v-on:listenTabsClick="tabsClick"
        v-on:listenRightImgClick="rightImgClick"
        v-on:listenTableRowClick="tableRowClick"
        v-on:listenIconClick="iconClick"/>
        <elt-esri-map-popup slot="popup" :mapPoint="mapPoint" :custom="custom">
          <div>
            <button @click="custom = !custom">自定义切换</button>
            <button @click="hidePopup">
              <p>点击隐藏popup</p>
              <i>地图尺寸过小时，popup会居中显示在底部</i>
              <i>这一行为由arcgis控制</i>
            </button>
          </div>
        </elt-esri-map-popup>
      </elt-esri-map>
  </el-row>
</template>

<script>
import data from "./test.json";
// 导入地图配置
import mapConfig from "./mapConfig.js";
// selector 配置文件
import selectorConfig from "./selectorConfig.js";

import InitData from "./SLTConfig.js";
import { constants } from 'crypto';

export default {
  data() {
    return {
      mapPoint: null,
      custom: true,
      mapConfig: mapConfig,
      index: 0,
      SLTData:{
        //左侧第一个下拉列表数据
        LeftoptionsOne: [{
                value: '1',
                label: '北京'
                }, {
                value: '2',
                label: '上海'
                }, {
                value: '3',
                label: '河北'
            }],
        //右侧数据
        InitData:InitData,
        //左侧第二个下拉列表数据
        LeftoptionsTwo: [],
        //右侧表格的数据
        rightTableData:[]
      }
    };
  },
  methods: {
    loadedHandler(elitelMap) {
      this.elitelMap = elitelMap;
      this.elitelMap.map;
      let _this = this;
      this.elitelMap.view.on("click", function(event) {
        // _this.mapPoint = event.mapPoint;
        // hitTest为arcgis的api可检测鼠标点击位置下的“元素数组responses”
        _this.elitelMap.view
          .hitTest(event.screenPoint)
          .then(function(responses) {
            //点 定位
            // let center = _this.view.center.clone();
            // center.longitude = event.mapPoint.longitude;
            // center.latitude = event.mapPoint.latitude + 0.2;
            // _this.view.goTo(center);

            // 只需给mapPoint赋值即可使其可见,使用了watch
            //根据测站类型显示/隐藏pop，弹出对应的pop
            if (
              responses.results.length > 0 &&
              responses.results[0].graphic.attributes.data !== null &&
              responses.results[0].graphic.attributes.data !== undefined
            ) {
              _this.mapPoint = event.mapPoint;
            } else {
              _this.mapPoint = null;
            }
          });
      });
    },
    hidePopup() {
      this.mapPoint = null;
    },
    leftOneChange(LeftOnevalue){
      //第一个下拉列表change事件,LeftOnevalue是选中的值
      console.log("左侧第一个下拉列表监听事件");
      console.log(LeftOnevalue);

       if(LeftOnevalue === "1"){
            this.SLTData.LeftoptionsTwo=[
                {value:'1',label:'朝阳'},
                {value:'2',label:'海淀'},
                {value:'3',label:'石景山'},
                {value:'4',label:'丰台'}
            ];
        }else if(LeftOnevalue === "2"){
            this.SLTData.LeftoptionsTwo=[
                {value:'1',label:'黄埔路'},
                {value:'2',label:'长春路'},
                {value:'3',label:'天津路'}
            ];
        }else if(LeftOnevalue ==="3"){
            this.SLTData.LeftoptionsTwo=[
                {value:'1',label:'石家庄'},
                {value:'2',label:'邯郸'},
                {value:'3',label:'唐山'}
            ];
        }
      
    },
    iconClick(paramItem){
        //监听右侧图片上的Icon点击事件
        // paramItem.leftOnevalue(左侧第一个默认下拉列表的值)
        // paramItem.leftTwovalue(左侧第二个默认下拉列表的值)
        // paramItem.menu.index(右侧选中的tabs的index索引) 根据此索引可以查询信息
        // paramItem.menu.code(右侧tabs选项卡选中的名称)
        // paramItem.item.index(右侧选中的img的index索引) 根据此索引可以查询信息
        // paramItem.item.code(右侧当前选中图片的imgcode)<br />
        // paramItem.allChecked(右侧选中的checkbox的imgcode列表) 方便在地图上打点
        // paramItem.check.code(右侧点击checkbox事件返回的参数code代表imgcode)
        // paramItem.check.index(右侧点击checkbox事件返回的参数index代表索引)
        // paramItem.check.isCheck(右侧点击checkbox事件返回的参数isCheck代表是否选中)

        console.log("监听右侧图片上的Icon点击事件");
        console.log(paramItem);

    },
    searchClick(paramItem){
        //左侧点击查询按钮事件
        // paramItem.leftOnevalue(左侧第一个默认下拉列表的值)
        // paramItem.leftTwovalue(左侧第二个默认下拉列表的值)
        // paramItem.menu.index(右侧选中的tabs的index索引) 根据此索引可以查询信息
        // paramItem.menu.code(右侧tabs选项卡选中的名称)
        // paramItem.item.index(右侧选中的img的index索引) 根据此索引可以查询信息
        // paramItem.item.code(右侧当前选中图片的imgcode)<br />
        // paramItem.allChecked(右侧选中的checkbox的imgcode列表) 方便在地图上打点
        // paramItem.check.code(右侧点击checkbox事件返回的参数code代表imgcode)
        // paramItem.check.index(右侧点击checkbox事件返回的参数index代表索引)
        // paramItem.check.isCheck(右侧点击checkbox事件返回的参数isCheck代表是否选中)
        console.log("监听左侧点击查询按钮事件");
        console.log(paramItem);

        this.SLTData.rightTableData=[
            {
                name:"张三",
                age:"21",
                sex:"男",
                native:"北京"
            },{
                name:"李四",
                age:"18",
                sex:"男",
                native:"上海"
            },{
                name:"赵武",
                age:"23",
                sex:"女",
                native:"河南"
            },{
                name:"王丽",
                age:"21",
                sex:"女",
                native:"河北"
            },{
                name:"小兰",
                age:"18",
                sex:"女",
                native:"北京"
            },{
                name:"小赵",
                age:"20",
                sex:"男",
                native:"山东"
            },{
                name:"小明",
                age:"19",
                sex:"女",
                native:"广西"
            },{
                name:"王阳",
                age:"27",
                sex:"男",
                native:"武汉"
            },{
                name:"小李",
                age:"29",
                sex:"男",
                native:"北京"
            },{
                name:"小红",
                age:"23",
                sex:"女",
                native:"武汉"
            },{
                name:"小飞",
                age:"23",
                sex:"女",
                native:"南京"
            }
        ]
        
    },
    tabsClick(paramItem){
        //右侧tabs点击事件
        // paramItem.leftOnevalue(左侧第一个默认下拉列表的值)
        // paramItem.leftTwovalue(左侧第二个默认下拉列表的值)
        // paramItem.menu.index(右侧选中的tabs的index索引) 根据此索引可以查询信息
        // paramItem.menu.code(右侧tabs选项卡选中的名称)
        // paramItem.item.index(右侧选中的img的index索引) 根据此索引可以查询信息
        // paramItem.item.code(右侧当前选中图片的imgcode)<br />
        // paramItem.allChecked(右侧选中的checkbox的imgcode列表) 方便在地图上打点
        // paramItem.check.code(右侧点击checkbox事件返回的参数code代表imgcode)
        // paramItem.check.index(右侧点击checkbox事件返回的参数index代表索引)
        // paramItem.check.isCheck(右侧点击checkbox事件返回的参数isCheck代表是否选中)
        console.log("监听右侧tabs点击事件");
        console.log(paramItem);
        this.SLTData.rightTableData=[
            {
                name:"张三",
                age:"21",
                sex:"男",
                native:"北京"
            },{
                name:"李四",
                age:"18",
                sex:"男",
                native:"上海"
            },{
                name:"赵武",
                age:"23",
                sex:"女",
                native:"河南"
            },{
                name:"王丽",
                age:"21",
                sex:"女",
                native:"河北"
            },{
                name:"小兰",
                age:"18",
                sex:"女",
                native:"北京"
            },{
                name:"小赵",
                age:"20",
                sex:"男",
                native:"山东"
            },{
                name:"小明",
                age:"19",
                sex:"女",
                native:"广西"
            },{
                name:"王阳",
                age:"27",
                sex:"男",
                native:"武汉"
            },{
                name:"小李",
                age:"29",
                sex:"男",
                native:"北京"
            },{
                name:"小红",
                age:"23",
                sex:"女",
                native:"武汉"
            },{
                name:"小飞",
                age:"23",
                sex:"女",
                native:"南京"
            }
        ]

    },
    rightImgClick(paramItem){
        //右侧Img点击事件
        // paramItem.leftOnevalue(左侧第一个默认下拉列表的值)
        // paramItem.leftTwovalue(左侧第二个默认下拉列表的值)
        // paramItem.menu.index(右侧选中的tabs的index索引) 根据此索引可以查询信息
        // paramItem.menu.code(右侧tabs选项卡选中的名称)
        // paramItem.item.index(右侧选中的img的index索引) 根据此索引可以查询信息
        // paramItem.item.code(右侧当前选中图片的imgcode)<br />
        // paramItem.allChecked(右侧选中的checkbox的imgcode列表) 方便在地图上打点
        // paramItem.check.code(右侧点击checkbox事件返回的参数code代表imgcode)
        // paramItem.check.index(右侧点击checkbox事件返回的参数index代表索引)
        // paramItem.check.isCheck(右侧点击checkbox事件返回的参数isCheck代表是否选中)
        console.log("右侧Img点击事件");
        console.log(paramItem);

        this.SLTData.rightTableData=[
            {
                name:"张三",
                age:"21",
                sex:"男",
                native:"北京"
            },{
                name:"李四",
                age:"18",
                sex:"男",
                native:"上海"
            },{
                name:"赵武",
                age:"23",
                sex:"女",
                native:"河南"
            },{
                name:"王丽",
                age:"21",
                sex:"女",
                native:"河北"
            },{
                name:"小兰",
                age:"18",
                sex:"女",
                native:"北京"
            },{
                name:"小赵",
                age:"20",
                sex:"男",
                native:"山东"
            },{
                name:"小明",
                age:"19",
                sex:"女",
                native:"广西"
            },{
                name:"王阳",
                age:"27",
                sex:"男",
                native:"武汉"
            },{
                name:"小李",
                age:"29",
                sex:"男",
                native:"北京"
            },{
                name:"小红",
                age:"23",
                sex:"女",
                native:"武汉"
            },{
                name:"小飞",
                age:"23",
                sex:"女",
                native:"南京"
            }
        ]
    },
    tableRowClick(row){
        //右侧table行的点击事件
        //row是返回当前点击的行的数据
        console.log("右侧table行的点击事件");
        console.log(row);
    }
  },
  created() {
    // this.tabs.push(this.selectorConfig[0]);
  }
};
</script>


<style>
.tac {
  height: 100%;
}
.el-col,
.el-menu {
  height: 100%;
}
.esri-view .esri-view-root{
  position:initial;
}
</style>
