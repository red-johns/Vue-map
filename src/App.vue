<template>
  <el-row class="tac">
    <el-col :span="3">
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="activedName"
      >
        <el-menu-item
          v-for="(item,index) in selectorConfig"
          :key="index"
          :index="item.title"
          @click="handleMenuSelect(item,index)"
        >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.title }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="21">
      <elt-esri-map :mapConfig="mapConfig" @loaded="loadedHandler">
        <elt-selector-bar
          slot="selector"
          :tabs="tabs"
          :activeName="activedName"
          @tab-change="tabChange"
          @buttons-click="btnsClick"
          v-model="result"
        ></elt-selector-bar>
        <elt-esri-map-popup slot="popup" :mapPoint="mapPoint" :custom="custom">
          <!-- 内部内容自定义 -->
          <!-- 最外层只能有一个dom -->
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
    </el-col>
  </el-row>
</template>

<script>
import data from "./test.json";
// 导入地图配置
import mapConfig from "./mapConfig.js";
// selector 配置文件
import selectorConfig from "./selectorConfig.js";

export default {
  data() {
    return {
      mapPoint: null,
      custom: true,
      mapConfig: mapConfig,
      polylineList: data.PathList,
      datalist:[],
      index: 0,
      selectorConfig: selectorConfig,
      activedName: selectorConfig[0].title,
      tabs: [],
      result: null
    };
  },
  methods: {
    handleMenuSelect(obj, index) {
      this.activedName = obj.title;
      if (!this.tabs.includes(obj)) {
        obj.tableData = this.getData(obj.code);
        this.tabs.push(obj);
      }
      this.addLayler(obj.code);
    },
    tabChange(tabName,index) {
      this.activedName = tabName;
      if(this.tabs.length > index)
        this.addLayler(this.tabs[index].code);
    },
    btnsClick(name,index) {
      switch (name) {
        case "per":
          alert("上一页按钮");
          break;
        case "next":
          alert("下一页按钮");
          break;
        case "dataTable":
          alert("数据列表按钮");
          this.tabs[index].enableTable = true;
          break;
        case "search":
          alert("查询按钮");
          break;
        case "btnTest":
          alert("测试按钮");
          break;
      }

      // console.log(this.result);
    },
    getData(code){
        //模拟查询数据
        let tableData=[];
        switch(code){
            case "sksw": 
            tableData=[
                {"name":"张1","age":"1","sex":"男","native":"北京"},
                {"name":"张2","age":"2","sex":"女","native":"上海"},
                {"name":"张3","age":"3","sex":"女","native":"广州"},
                {"name":"张4","age":"4","sex":"男","native":"重庆"},
                {"name":"张5","age":"5","sex":"男","native":"南京"},
                {"name":"张6","age":"6","sex":"女","native":"山东"},
                {"name":"张7","age":"7","sex":"男","native":"河北"},
                {"name":"张8","age":"8","sex":"女","native":"河南"},
                {"name":"张9","age":"9","sex":"女","native":"广东"},
                {"name":"张10","age":"10","sex":"男","native":"济南"},
                {"name":"张11","age":"11","sex":"男","native":"武汉"},
                {"name":"张12","age":"12","sex":"男","native":"石家庄"},
                {"name":"张13","age":"13","sex":"女","native":"郑州"},
                {"name":"张14","age":"14","sex":"男","native":"兰州"},
                {"name":"张15","age":"15","sex":"女","native":"内蒙"}
            ];
            break;
            case "skll":
            tableData=[
                {"id":"0000000","context":"今天的天气不错","date":"2019-01-01"},
                {"id":"0000001","context":"今天的天气不错","date":"2019-01-02"},
                {"id":"0000002","context":"今天的天气不错","date":"2019-01-03"},
                {"id":"0000003","context":"今天的天气不错","date":"2019-01-04"},
                {"id":"0000004","context":"今天的天气不错","date":"2019-01-05"},
                {"id":"0000005","context":"今天的天气不错","date":"2019-01-06"},
                {"id":"0000006","context":"今天的天气不错","date":"2019-01-07"},
                {"id":"0000007","context":"今天的天气不错","date":"2019-01-08"},
                {"id":"0000008","context":"今天的天气不错","date":"2019-01-09"},
                {"id":"0000009","context":"今天的天气不错","date":"2019-01-10"},
                {"id":"0000010","context":"今天的天气不错","date":"2019-01-11"},
                {"id":"0000011","context":"今天的天气不错","date":"2019-01-12"},
                {"id":"0000012","context":"今天的天气不错","date":"2019-01-13"},
                {"id":"0000013","context":"今天的天气不错","date":"2019-01-14"}
            ];
            break;
            case "skcc":
            tableData=[
                {"id":"000001","watername":"一一水库"},
                {"id":"000002","watername":"尔尔水库"},
            ];
            break;
        }

        return tableData;
    },
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
      this.init();
    },
    hidePopup() {
      this.mapPoint = null;
    },
    addLayler(code){
      //地图上打点、画面
      switch(code){
        case "sksw":{
          let pointList=[
              {
                data: "130302",
                coors: [119.501206, 39.953295]
              },
              {
                data: "130303",
                coors: [119.681566, 39.985128]
              },
              {
                data: "130304",
                coors: [119.350929, 39.821207]
              },
              {
                data: "130306",
                coors: [119.171329, 39.882144]
              },
              {
                data: "130322",
                coors: [119.008863, 39.617279]
              }
          ];
          //点图标样式
          let poinLayerStyle = {
            title: "水库水位", //图例的等级信息，没有就不会显示图例
            groupByName: "行政区划", //用于图例的分组，没有就不会显示图例
            //图片打点
            imageUrl:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552639720374&di=b48a1f1666bf95cc69dd10fbc5e8d5bb&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F02%2F04%2F64%2F045762e39b4cdfc.jpg", //选择图片打点imageUrl不能为空，反之image不需要定义
            width: 8, //图片宽度
            height: 11, //图片高度
            xoffset: 0, //图片x轴偏移
            yoffset: 0 //图片y轴偏移
          };
          this.elitelMap.CreateGraphicsLayer(
            "GraphicsLayer",
            "PictureMarkerSymbol",
            pointList,
            poinLayerStyle,
            true,
            { id: "id_icon_river_station", title: "河道水文站" }
          );
        break;
        }
        case "skll":{
            let polygonLayerStyle = {
              groupByName: "水利工程",
              //颜色等级
              level: [
                {
                  levelName: "10",
                  title: "10-25",
                  levelColor: "#000FF0"
                },
                {
                  levelName: "25",
                  title: "25-50",
                  levelColor: "#000000"
                },
                {
                  levelName: "50",
                  title: "50-100",
                  levelColor: "#FF0000"
                },
                {
                  levelName: "100",
                  title: "100-250",
                  levelColor: "#0000FF"
                },
                {
                  levelName: "250",
                  title: "大于250",
                  levelColor: "#00FF00"
                }
              ],
              levelNotShow: "-999", //等级为-999是不绘制面
              levelDefultColor: "#0FFF00", //默认显示的颜色
              polygonStyle: {
                type: "polygon",
                rings: [],
                spatialReference: 4326
              },
              fillSymbol: {
                type: "simple-fill",
                outline: {
                  width: "1",
                  opacity: 0.75
                }
              }
            };
            
            this.elitelMap.CreateGraphicsLayer(
              "GraphicsLayer",
              "Polygon",
              this.data,
              polygonLayerStyle,
              true,
              { id: "id_icon_one_river", title: "一级河流" }
            );
            
        break;
        }
        case "skcc":{
          let polylineLayerStyle = {
            title: "水库测试",
            groupByName: "流域河流",
            levelNotShow: "-999", //等级为-999是不绘制线
            polylineStyle: {
              type: "polyline",
              rings: [],
              spatialReference: 4326
            },
            color: "#000000",
            width: 2
          };
          this.elitelMap.CreateGraphicsLayer(
            "GraphicsLayer",
            "Polyline",
            this.data,
            polylineLayerStyle,
            true,
            { id: "id_icon_dyke_water", title: "堤防" }
          );
          break;
        }

      }
    },
    init(){
        let polylineLevelLayerStyle = {
        type: "text", // autocasts as new TextSymbol()
        levelNotShow: "-999", //等级为-999是不绘制面
        color: "#000000",
        font: {
          size: 10,
          family: "微软雅黑",
          weight: "normal"
        },
        polylineStyle: {
          type: "polyline",
          rings: [],
          spatialReference: 4326
        }
      };

        let data = new Array();
          for (let t = 0; t < this.polylineList.length; t++) {
            let coors = this.polylineList[t].Path.split("|");
            let coorsArray = new Array();

            for (let i = 0, length = coors.length; i < length; i++) {
              let tempCoors = new Array();
              let xys = coors[i].split(" ");
              for (let j = 0, lengthxys = xys.length; j < lengthxys; j++) {
                var point = xys[j].split(",");
                tempCoors[j] = new Array();
                tempCoors[j][0] = point[0];
                tempCoors[j][1] = point[1];
              }
              coorsArray.push(tempCoors);
            }
            data.push({
              level: this.polylineList[t].level,
              coors: coorsArray
            });
          }
          this.data = data;
          this.elitelMap.CreateGraphicsLayer(
            "GraphicsLayer",
            "polylineDescribe",
            this.data,
            polylineLevelLayerStyle,
            true,
            { id: "id_desc_dyke_water", title: "堤防" }
          );
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

</style>
