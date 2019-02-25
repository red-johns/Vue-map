<template>
  <div class="demo">
    <elt-esri-map :mapConfig="mapConfig" @loaded="loadedHandler">
      <elt-esri-map-popup slot="popup" :mapPoint="mapPoint">
        <!-- 内部内容自定义 -->
        <!-- 最外层只能有一个dom -->
        <div>
          <button @click="hidePopup">
            <p>点击隐藏popup</p>
            <i>地图尺寸过小时，popup会居中显示在底部</i>
            <i>这一行为由arcgis控制</i>
          </button>
        </div>
      </elt-esri-map-popup>
    </elt-esri-map>
  </div>
</template>

<script>
import data from "./test.json";
// 导入地图配置
import mapConfig from "./mapConfig.js";
export default {
  data() {
    return {
      mapPoint: null,
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
        //图片打点
        imageUrl: "http://pic27.nipic.com/20130225/4746571_081826094000_2.jpg", //选择图片打点imageUrl不能为空，反之image不需要定义
        width: 8, //图片宽度
        height: 11, //图片高度
        xoffset: 0, //图片x轴偏移
        yoffset: 0 //图片y轴偏移
        //普通打点
        // symbolStyle: "circle",
        // width: 12,
        // symbolLineStyle: "",
        // symbolLineColor: {
        //   r: 255,
        //   g: 153,
        //   b: 0
        // },
        // symbolLineWidth: 4,
        // symbolColor: {
        //   r: 255,
        //   g: 0,
        //   b: 0
        // }
      },
      //点名称样式
      poinNameLayerStyle: {
        type: "text", // autocasts as new TextSymbol()
        color: "#000000",
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
        type: "text", 
        color: "#000000",
        haloColor: "black",
        haloSize: "1px",
        xoffset: 24,
        yoffset: -8,
        font: {
          size: 10,
          family: "sans-serif",
          weight: "normal"
        }
      },
      //线图标样式
      polylineLayerStyle: {
        //颜色等级
        levelNotShow: "-999", //等级为-999是不绘制面
        polylineStyle: {
          type: "polyline",
          rings: [],
          spatialReference: 4326
        },
        lineSymbol: {
          color: [114, 0, 0, 0.75],
          width: 2
        }
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
        //颜色等级
        level: [
          {
            levelName: "10",
            levelColor: [57, 167, 6, 0.75]
          },
          {
            levelName: "25",
            levelColor: [96, 185, 254, 0.75]
          },
          {
            levelName: "50",
            levelColor: [0, 0, 255, 0.75]
          },
          {
            levelName: "100",
            levelColor: [250, 0, 250, 0.75]
          },
          {
            levelName: "250",
            levelColor: [114, 0, 0, 0.75]
          }
        ],
        levelNotShow: "-999", //等级为-999是不绘制面
        levelDefultColor: [166, 242, 142, 0.75], //默认显示的颜色
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
      mapConfig: mapConfig
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
            }
          });
      });

    
      this.init();
    },
    init() {
      //创建点图层并打点
      this.elitelMap.CreateGraphicsLayer(
        "GraphicsLayer",
        "PictureMarkerSymbol",
        this.pointList,
        this.poinLayerStyle,
        true,
        { id: "id_点图标", title: "点图标" }
      );
      //清空图层
      // this.elitelMap.CleanLayer("id_点图标");

      //创建点名称图层并显示名称
      this.elitelMap.CreateGraphicsLayer(
        "GraphicsLayer",
        "TextSymbol",
        this.pointList,
        this.poinNameLayerStyle,
        true,
        { id: "id_点名称", title: "点名称" }
      );

      //初始化线和面的数据
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

      //创建线图标图层并显示线
      this.elitelMap.CreateGraphicsLayer(
        "GraphicsLayer",
        "Polyline",
        data,
        this.polylineLayerStyle,
        true,
        { id: "id_线图标", title: "线图标" }
      );

      //创建线描述图层并显示描述
      this.elitelMap.CreateGraphicsLayer(
        "GraphicsLayer",
        "polylineDescribe",
        data,
        this.polylineLevelLayerStyle,
        true,
        { id: "id_线描述", title: "线描述" }
      );

      //创建面图标图层并显示面
      this.elitelMap.CreateGraphicsLayer(
        "GraphicsLayer",
        "Polygon",
        data,
        this.polygonLayerStyle,
        true,
        { id: "id_面图标", title: "面图标" }
      );
    },
    hidePopup() {
      this.mapPoint = null;
    }
  },
  mounted() {}
};
</script>

<style>
.demo,
.demo > div {
  width: 100%;
  height: 100%;
}
</style>
