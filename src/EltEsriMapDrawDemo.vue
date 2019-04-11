<template>
  <div class="demo">
    <elt-esri-map :mapConfig="mapConfig" @loaded="loadedHandler">
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
    <div style="position: absolute;top: 70px;left: 220px;width:auto;height:auto;">
      <button v-on:click="showLegendListFun">打开图例列表</button>
      <button v-on:click="hideLegendListFun">关闭图例列表</button>
      <br>
      <button v-on:click="addPointFun">添加点图层</button>
      <button v-on:click="pointShowFun">显示点图层</button>
      <button v-on:click="pointNotShowFun">隐藏点图层和图例</button>
      <button v-on:click="selectPointLegend">打开点图层图例</button>
      <button v-on:click="cleanPoint">清除点图层和图例</button>
      <br>
      <br>
      <button v-on:click="addMianFun">添加面图层</button>
      <button v-on:click="mianShowFun">显示面图层</button>
      <button v-on:click="mianNotShowFun">隐藏面图层和图例</button>
      <button v-on:click="selectMianLegend">打开面图层图例</button>
      <button v-on:click="cleanMian">清除面图层和图例</button>
      <br>
      <br>
      <button v-on:click="addXianFun">添加线图层</button>
      <button v-on:click="xianShowFun">显示线图层</button>
      <button v-on:click="xianNotShowFun">隐藏线图层和图例</button>
      <button v-on:click="selectXianLegend">打开线图层图例</button>
      <button v-on:click="cleanXian">清除线图层和图例</button>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
import data from "./test.json";
// 导入地图配置
import mapConfig from "./mapConfig.js";
// import cntyFeatures from "../../static/js/cntyFeatures.js";
// export default {
//   data() {
//     return {
//       mapPoint: null,
//       custom: true,
//       //点图层数据
//       pointList: [
//         {
//           data: "130302",
//           coors: [119.501206, 39.953295]
//         },
//         {
//           data: "130303",
//           coors: [119.681566, 39.985128]
//         },
//         {
//           data: "130304",
//           coors: [119.350929, 39.821207]
//         },
//         {
//           data: "130306",
//           coors: [119.171329, 39.882144]
//         },
//         {
//           data: "130322",
//           coors: [119.008863, 39.617279]
//         }
//       ],
//       //点图标样式
//       poinLayerStyle: {
//         title: "123",//图例的等级信息，没有就不会显示图例
//         groupByName: "行政区划",//用于图例的分组，没有就不会显示图例
//         //图片打点
//         imageUrl:
//           "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552639720374&di=b48a1f1666bf95cc69dd10fbc5e8d5bb&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F02%2F04%2F64%2F045762e39b4cdfc.jpg", //选择图片打点imageUrl不能为空，反之image不需要定义
//         width: 8, //图片宽度
//         height: 11, //图片高度
//         xoffset: 0, //图片x轴偏移
//         yoffset: 0 //图片y轴偏移
//         //普通打点
//         // symbolStyle: "circle",
//         // width: 12,
//         // symbolLineStyle: "",
//         // symbolLineColor: "black",
//         // symbolLineWidth: 4,
//         // color: "black"
//       },
//       //点名称样式
//       poinNameLayerStyle: {
//         type: "text", // autocasts as new TextSymbol()
//         color: "blue",
//         haloColor: "black",
//         haloSize: "1px",
//         xoffset: 20,
//         yoffset: 2,
//         font: {
//           // autocast as new Font()
//           size: 10,
//           family: "sans-serif",
//           weight: "normal"
//         }
//       },
//       //点描述样式
//       poinDescribeLayerStyle: {
//         type: "text", // autocasts as new TextSymbol()
//         color: "#000000",
//         haloColor: "blue",
//         haloSize: "1px",
//         xoffset: 24,
//         yoffset: -8,
//         font: {
//           // autocast as new Font()
//           size: 10,
//           family: "sans-serif",
//           weight: "normal"
//         }
//       },
//       //线图标样式
//       polylineLayerStyle: {
//         title: "369",
//         groupByName: "流域河流",
//         levelNotShow: "-999", //等级为-999是不绘制线
//         polylineStyle: {
//           type: "polyline",
//           rings: [],
//           spatialReference: 4326
//         },
//         color: "#000000",
//         width: 2
//       },
//       //线描述样式
//       polylineLevelLayerStyle: {
//         type: "text", // autocasts as new TextSymbol()
//         levelNotShow: "-999", //等级为-999是不绘制面
//         color: "#000000",
//         font: {
//           size: 10,
//           family: "微软雅黑",
//           weight: "normal"
//         },
//         polylineStyle: {
//           type: "polyline",
//           rings: [],
//           spatialReference: 4326
//         }
//       },
//       //面图标样式
//       polygonLayerStyle: {
//         groupByName: "水利工程",
//         //颜色等级
//         level: [
//           {
//             levelName: "10",
//             title: "10-25",
//             levelColor: "#000FF0"
//           },
//           {
//             levelName: "25",
//             title: "25-50",
//             levelColor: "#000000"
//           },
//           {
//             levelName: "50",
//             title: "50-100",
//             levelColor:"#FF0000"
//           },
//           {
//             levelName: "100",
//             title: "100-250",
//             levelColor: "#0000FF"
//           },
//           {
//             levelName: "250",
//             title: "大于250",
//             levelColor: "#00FF00"
//           }
//         ],
//         levelNotShow: "-999", //等级为-999是不绘制面
//         levelDefultColor:"#0FFF00", //默认显示的颜色
//         polygonStyle: {
//           type: "polygon",
//           rings: [],
//           spatialReference: 4326
//         },
//         fillSymbol: {
//           type: "simple-fill",
//           outline: {
//             width: "1",
//             opacity: 0.75
//           }
//         }
//       },
//       polylineList: data.PathList, //线图层数据
//       polygonList: data.PathList, //面图层数据
//       mapConfig: mapConfig
//     };
//   },
//   methods: {
//     loadedHandler(elitelMap) {
//       this.elitelMap = elitelMap;
//       this.elitelMap.map;
//       let _this = this;
//       debugger;
//       this.elitelMap.view.on("click", function(event) {
//         // _this.mapPoint = event.mapPoint;
//         // hitTest为arcgis的api可检测鼠标点击位置下的“元素数组responses”
//         _this.elitelMap.view
//           .hitTest(event.screenPoint)
//           .then(function(responses) {
//             //点 定位
//             // let center = _this.view.center.clone();
//             // center.longitude = event.mapPoint.longitude;
//             // center.latitude = event.mapPoint.latitude + 0.2;
//             // _this.view.goTo(center);

//             // 只需给mapPoint赋值即可使其可见,使用了watch
//             //根据测站类型显示/隐藏pop，弹出对应的pop
//             if (
//               responses.results.length > 0 &&
//               responses.results[0].graphic.attributes.data !== null &&
//               responses.results[0].graphic.attributes.data !== undefined
//             ) {
//               _this.mapPoint = event.mapPoint;
//             } else {
//               _this.mapPoint = null;
//             }
//           });
//       });
//       this.init();
//     },
//     init() {
//       this.elitelMap.CreateGraphicsLayer(
//         "GraphicsLayer",
//         "PictureMarkerSymbol",
//         this.pointList,
//         this.poinLayerStyle,
//         true,
//         { id: "id_icon_river_station", title: "河道水文站" }
//       );
//       this.elitelMap.CreateGraphicsLayer(
//         "GraphicsLayer",
//         "PictureMarkerSymbol",
//         [],
//         this.poinLayerStyle,
//         true,
//         { id: "id_icon_river_station", title: "河道水文站" }
//       );
//        this.elitelMap.CreateGraphicsLayer(
//         "GraphicsLayer",
//         "PictureMarkerSymbol",
//         [],
//         {
//         title: "456", //图例的等级信息，没有就不会显示图例
//         groupByName: "行政区划", //用于图例的分组，没有就不会显示图例
//         //图片打点
//         // imageUrl:
//         //   "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552639720374&di=b48a1f1666bf95cc69dd10fbc5e8d5bb&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F02%2F04%2F64%2F045762e39b4cdfc.jpg", //选择图片打点imageUrl不能为空，反之image不需要定义
//         // width: 8, //图片宽度
//         // height: 11, //图片高度
//         // xoffset: 0, //图片x轴偏移
//         // yoffset: 0 //图片y轴偏移
//         //普通打点
//         symbolStyle: "circle",
//         width: 12,
//         symbolLineStyle: "",
//         symbolLineColor: "black",
//         symbolLineWidth: 4,
//         color: "black"
//       },
//         true,
//         { id: "id_icon_river_station", title: "河道水文站" }
//       );

//       this.elitelMap.CreateGraphicsLayer(
//         "GraphicsLayer",
//         "TextSymbol",
//         this.pointList,
//         this.poinNameLayerStyle,
//         true,
//         { id: "id_name_river_station", title: "河道水文站" }
//       );

//       this.elitelMap.CreateGraphicsLayer(
//         "GraphicsLayer",
//         "TextSymbol",
//         this.pointList,
//         this.poinDescribeLayerStyle,
//         true,
//         { id: "id_desc_river_station", title: "河道水文站" }
//       );
//       let data = new Array();
//       for (let t = 0; t < this.polylineList.length; t++) {
//         let coors = this.polylineList[t].Path.split("|");
//         let coorsArray = new Array();

//         for (let i = 0, length = coors.length; i < length; i++) {
//           let tempCoors = new Array();
//           let xys = coors[i].split(" ");
//           for (let j = 0, lengthxys = xys.length; j < lengthxys; j++) {
//             var point = xys[j].split(",");
//             tempCoors[j] = new Array();
//             tempCoors[j][0] = point[0];
//             tempCoors[j][1] = point[1];
//           }
//           coorsArray.push(tempCoors);
//         }
//         data.push({
//           level: this.polylineList[t].level,
//           coors: coorsArray
//         });
//       }

//       this.elitelMap.CreateGraphicsLayer(
//         "GraphicsLayer",
//         "Polygon",
//         data,
//         this.polygonLayerStyle,
//         true,
//         { id: "id_icon_one_river", title: "一级河流" }
//       );
//       this.elitelMap.CreateGraphicsLayer(
//         "GraphicsLayer",
//         "Polyline",
//         data,
//         this.polylineLayerStyle,
//         true,
//         { id: "id_icon_dyke_water", title: "堤防" }
//       );
//       this.elitelMap.CreateGraphicsLayer(
//         "GraphicsLayer",
//         "polylineDescribe",
//         data,
//         this.polylineLevelLayerStyle,
//         true,
//         { id: "id_desc_dyke_water", title: "堤防" }
//       );

//       //输入图层id,选择需要显示的图例
//       // this.elitelMap.selectLegend("id_icon_one_river");
//       // //输入图层id,隐藏图层会将当前图层的图例隐藏
//       // this.elitelMap.setLayerVisibleFun("id_icon_river_station");
//       // //输入图层id,清除图层图例也会清空
//       // this.elitelMap.CleanLayer("id_点图标");
//     },
//     hidePopup() {
//       this.mapPoint = null;
//     }
//   },
//   mounted() {}
// };
export default {
  data() {
    return {
      mapPoint: null,
      custom: true,
      //点图层数据
      pointList: [
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
      ],
      //点图标样式
      poinLayerStyle: {
        title: "123", //图例的等级信息，没有就不会显示图例
        groupByName: "行政区划", //用于图例的分组，没有就不会显示图例
        //图片打点
        imageUrl:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552639720374&di=b48a1f1666bf95cc69dd10fbc5e8d5bb&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F02%2F04%2F64%2F045762e39b4cdfc.jpg", //选择图片打点imageUrl不能为空，反之image不需要定义
        width: 8, //图片宽度
        height: 11, //图片高度
        xoffset: 0, //图片x轴偏移
        yoffset: 0 //图片y轴偏移
        //普通打点
        // symbolStyle: "circle",
        // width: 12,
        // symbolLineStyle: "",
        // symbolLineColor: "black",
        // symbolLineWidth: 4,
        // color: "black"
      },
      //点名称样式
      poinNameLayerStyle: {
        type: "text", // autocasts as new TextSymbol()
        color: "blue",
        haloColor: "black",
        haloSize: "1px",
        xoffset: 20,
        yoffset: 2,
        font: {
          // autocast as new Font()
          size: 10,
          family: "sans-serif",
          weight: "normal"
        }
      },
      //点描述样式
      poinDescribeLayerStyle: {
        type: "text", // autocasts as new TextSymbol()
        color: "#000000",
        haloColor: "blue",
        haloSize: "1px",
        xoffset: 24,
        yoffset: -8,
        font: {
          // autocast as new Font()
          size: 10,
          family: "sans-serif",
          weight: "normal"
        }
      },
      //线图标样式
      polylineLayerStyle: {
        title: "369",
        groupByName: "流域河流",
        levelNotShow: "-999", //等级为-999是不绘制线
        polylineStyle: {
          type: "polyline",
          rings: [],
          spatialReference: 4326
        },
        color: "#000000",
        width: 2
      },
      //线描述样式
      polylineLevelLayerStyle: {
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
      },
      //面图标样式
      polygonLayerStyle: {
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
      },
      polylineList: data.PathList, //线图层数据
      polygonList: data.PathList, //面图层数据
      mapConfig: mapConfig,
      index: 0
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
      this.init();
    },
    init() {
      //添加点图标
      this.elitelMap.CreateGraphicsLayer(
        "GraphicsLayer",
        "PictureMarkerSymbol",
        this.pointList,
        this.poinLayerStyle,
        true,
        { id: "id_icon_river_station", title: "河道水文站" }
      );

      this.elitelMap.CreateGraphicsLayer(
        "GraphicsLayer",
        "TextSymbol",
        this.pointList,
        this.poinNameLayerStyle,
        true,
        { id: "id_name_river_station", title: "河道水文站" }
      );

      this.elitelMap.CreateGraphicsLayer(
        "GraphicsLayer",
        "TextSymbol",
        this.pointList,
        this.poinDescribeLayerStyle,
        true,
        { id: "id_desc_river_station", title: "河道水文站" }
      );
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
        this.polylineLevelLayerStyle,
        true,
        { id: "id_desc_dyke_water", title: "堤防" }
      );
    },
    hidePopup() {
      this.mapPoint = null;
    },
    addPointFun() {
      this.elitelMap.CreateGraphicsLayer(
        "GraphicsLayer",
        "PictureMarkerSymbol",
        [],
        {
          title: "456", //图例的等级信息，没有就不会显示图例
          groupByName: "行政区划", //用于图例的分组，没有就不会显示图例
          //图片打点
          // imageUrl:
          //   "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552639720374&di=b48a1f1666bf95cc69dd10fbc5e8d5bb&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F02%2F04%2F64%2F045762e39b4cdfc.jpg", //选择图片打点imageUrl不能为空，反之image不需要定义
          // width: 8, //图片宽度
          // height: 11, //图片高度
          // xoffset: 0, //图片x轴偏移
          // yoffset: 0 //图片y轴偏移
          //普通打点
          symbolStyle: "circle",
          width: 12,
          symbolLineStyle: "",
          symbolLineColor: "black",
          symbolLineWidth: 4,
          color: "black"
        },
        true,
        { id: "id_icon_river_station", title: "河道水文站" }
      );
    },
    pointShowFun() {
      //输入图层id,隐藏图层会将当前图层的图例隐藏
      this.elitelMap.setLayerVisibleFun("id_icon_river_station", true);
    },
    selectPointLegend() {
      //输入图层id,选择需要显示的图例
      this.elitelMap.selectLegend("id_icon_river_station");
    },
    cleanPoint() {
      //输入图层id,清除图层图例也会清空
      this.elitelMap.CleanLayer("id_icon_river_station");
    },
    addMianFun() {
      this.elitelMap.CreateGraphicsLayer(
        "GraphicsLayer",
        "Polygon",
        this.data,
        this.polygonLayerStyle,
        true,
        { id: "id_icon_one_river", title: "一级河流" }
      );
    },
    mianShowFun() {
      //输入图层id,隐藏图层会将当前图层的图例隐藏
      this.elitelMap.setLayerVisibleFun("id_icon_one_river", true);
    },
    selectMianLegend() {
      //输入图层id,选择需要显示的图例
      this.elitelMap.selectLegend("id_icon_one_river");
    },
    cleanMian() {
      //输入图层id,清除图层图例也会清空
      this.elitelMap.CleanLayer("id_icon_one_river");
    },
    xianShowFun() {
      //输入图层id,隐藏图层会将当前图层的图例隐藏
      this.elitelMap.setLayerVisibleFun("id_icon_dyke_water", true);
    },
    selectXianLegend() {
      //输入图层id,选择需要显示的图例
      this.elitelMap.selectLegend("id_icon_dyke_water");
    },
    cleanXian() {
      //输入图层id,清除图层图例也会清空
      this.elitelMap.CleanLayer("id_icon_dyke_water");
    },
    pointNotShowFun() {
      //输入图层id,隐藏图层会将当前图层的图例隐藏
      this.elitelMap.setLayerVisibleFun("id_icon_river_station", false);
    },
    mianNotShowFun() {
      //输入图层id,隐藏图层会将当前图层的图例隐藏
      this.elitelMap.setLayerVisibleFun("id_icon_one_river", false);
    },
    xianNotShowFun() {
      //输入图层id,隐藏图层会将当前图层的图例隐藏
      this.elitelMap.setLayerVisibleFun("id_icon_dyke_water", false);
    },
    addXianFun() {
      this.elitelMap.CreateGraphicsLayer(
        "GraphicsLayer",
        "Polyline",
        this.data,
        this.polylineLayerStyle,
        true,
        { id: "id_icon_dyke_water", title: "堤防" }
      );
    },
    showLegendListFun() {
      this.elitelMap.showLegendList();
    },
    hideLegendListFun() {
      this.elitelMap.hideLegendList();
    }
  },
  mounted() {}
};
</script>

<style>
.demo {
  width: 100%;
  height: 100%;
}
</style>
