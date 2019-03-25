# 0.3.30


> elitel components with vue

## Build Setup

```bash
npm set registry http://192.168.0.139:4873
```

```bash
# Demo源码地址
git clone https://github.com/red-johns/Vue-map
```

``` bash
# install dependencies
npm install

# 预览组件示例
npm run dev

# 打包组件库
npm run build
```


#### 安装
npm install @elitel/elt-esri-map --save

#### 全局导入

```
import Vue from 'vue'
import EltUI from '@elitel/elt-esri-map'
import '@elitel/elt-esri-map/dist/main.css';
Vue.use(EltUI)
```

#### 按需加载

借助插件 babel-plugin-import可以实现按需加载组件，减少文件体积。首先安装，并在文件 .babelrc 中配置：

```
npm install babel-plugin-import --save-dev

// .babelrc
{
  "plugins": [["import", {
    "libraryName": "elt-esri-map",
    "libraryDirectory": "src/libs"
  }]]
}
```
然后这样按需引入组件，就可以减小体积了
```
import { EltEsriMap, EltEsriMapPopup } from '@elitel/elt-esri-map';
```
* 注意：这两种方式是冲突的，不可同时使用。


## EltEsriMap

需在html中引入所用版本arcgis`"https://js.arcgis.com/4.6/"`
需在html中引入所用版本arcgis的css文件`"https://js.arcgis.com/4.6/esri/css/main.css"`
需要先引入element-ui

组件内使用：
import { EltEsriMap } from 'elt-esri-map'

```
<elt-esri-map
  :mapConfig="mapConfig"
  @loaded="loadedHandler"  />
```

组件接收1个参数
1. mapConfig: 初始化配置
2. ~~on-loaded：初始化完成的回调~~  此api已废弃

组件对外暴露两个值
1. elitelMap: {map, view}
2. hasLoaded：加载完成的标志属性，加载完成时为true

组件对外暴露一个事件
1. @loaded=handler 默认参数为elitelMap，原有on-loaded可在此完成,
通过elitelMap可以通过elitelMap.map、elitelMap.view的方式拿到基础的map和view，可以通过elitelMap调用CreateGraphicsLayer()和CleanLayer()方法

地图初始化图层配置:

```js
/**
 * 图层配置说明：（图层中的相同名字配置项具有相同含义）
 * BaseMapLayers 用于配置基础底图，用户在使用时，仅需个性化修改在地图加载时是否显示、透明度及可视比例尺，
 * 全部可配置项有：id、title、layerType、initVisible、opacity、minScale、maxScale、restUR，其中
 * id、title、layerType、initVisible、restURL为必须配置项，且id、title、layerType和restURL不修改，
 * opacity为非必须项, opacity取值范围0-1，默认为1，
 * minScale、maxScale 指图层最小和最大可见比例尺，也是非必须项，不设置时值为0，不限制可视比例；
 *
 * CustomerLayers 用于配置用户发布的图层，相同配置项与BaseMapLayers代表含义相同，
 * 全部可配置项有：id、title、layerType、initVisible、opacity、minScale、maxScale、restURL，
 * 其中id、title、layerType、initVisible、restURL是必须配置项，restURL是图层服务地址，由用户根据发布的服务地址配置，
 * layerType 取值为[GraphicsLayer、FeatureLayer、MapImageLayer、SceneLayer、TileLayer、WMSLayer、WMTSLayer、WebTileLayer、GoogleMapTileLayer、TiandituWMTSLayer]
 * 中一种，由用户根据发布的服务类型选择,其他可配置项根据layerType取值配置；
 *
 * ElevationLayers 仅在三维视图下需要配置，用于显示地地球上的高程，
 * 全部可配置项有：id、title、layerType、initVisible、restURL，相同配置项与BaseMapLayers含义相同，所有项都要配置
 * 其中layerType不能更改，必须为ElevationLayer，基本可配置项根据需要设置
 *
 * BusinessLayers 为用户业务图层，由用户根据实际业务需求，在地图初始化时，由用户配置需要加载到地图上的图层，
 * 全部可配置项有：id、title、layerType、initVisible、opacity、minScale: 30000000, maxScale: 1000，
 * layerType 可取值与CustomerLayers相同，由用户根据图层类型，配置相关项
 */
export default {
    ViewType : "2d",//视图类型，取值 2d|3d
    InitialExtent: { xmin: 25, ymin: 0, xmax: 150, ymax: 60, wkid: 4326 },
    Constraints: { minZoom: 3, maxZoom: 17, rotationEnabled: true },
    BaseMapLayers: [
        //  { id: "GoogleMapLayer_JT", title: "google交通图", layerType: "GoogleMapTileLayer", initVisible: true, opacity: 1, restURL: "http://www.google.cn/maps/vt/lyrs=t@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil" },
        //  { id: "GoogleMapLayer_YX_NOLABEL", title: "google影像图", layerType: "GoogleMapTileLayer", initVisible: true, opacity: 1, restURL: "http://www.google.cn/maps/vt/lyrs=s@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil" },
        //  { id: "GoogleMapLayer_YX", title: "google影像图", layerType: "GoogleMapTileLayer", initVisible: true, opacity: 1, restURL: "http://www.google.cn/maps/vt/lyrs=y@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil" },
        //  { id: "GoogleMapLayer_JD_P", title: "google街道p", layerType: "GoogleMapTileLayer", initVisible: true, opacity: 1, restURL: "http://www.google.cn/maps/vt/lyrs=p@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil" },
        //  { id: "GoogleMapLayer_JD_R", title: "google街道r", layerType: "GoogleMapTileLayer", initVisible: true, opacity: 1, restURL: "http://www.google.cn/maps/vt/lyrs=r@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil" },
        //  { id: "GoogleMapLayer_JD_M", title: "google街道m", layerType: "GoogleMapTileLayer", initVisible: true, opacity: 1, restURL: "http://www.google.cn/maps/vt/lyrs=m@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil" },
          { id: "TiandituLayer_ID", title: "天地图", layerType: "TiandituWMTSLayer", initVisible: true, opacity: 1, restURL: "" }
    ],
    CustomerLayers: [
         // { id: "MapGJ", title: "界区域", layerType: "TileLayer", initVisible: true, opacity: 1, restURL: "http://121.199.44.101:6081/arcgis/rest/services/CCBJMap/MapServer" }
    ],
    ElevationLayers: [
         //{ id: "layerMapgc", title: "高程图", layerType: "ElevationLayer", initVisible: true, opacity: 1, minScale: 30000000, maxScale: 1000, restURL: "http://192.168.0.189:6080/arcgis/rest/services/ChinaElevation/ImageServer" }
    ],
    BusinessLayers: [

    ],
// 界面组件配置：

/**
 * 界面微件配置项都不能为空，各项含义说明：
 * 当前界面可加载微件以component属性标记，
 * component可取值有：[Compass, Home, LayerList, Legend, ScaleBar, Search, Zoom]
 * position可取值有: [top-left, top-right, bottom-left, bottom-right]
 * index 取值为大于等0的正整数，数字越小，在指定区域越靠上, 如果取值相等，后面的微件位置占据上一个微件位置，上一个微件下移
 * initVisible 指初始化时是否可见
 *
 */
    MapWidgets: [
      { component: 'ZoomIn', initVisible: true },//放大
      { component: 'ZoomOut', initVisible: true },//缩小
      { component: 'Drag', initVisible: true },//可以拖动地图
      { component: 'PointPopup', initVisible: true },//点击任意点显示经纬度
      { component: 'Home', initVisible: true },//显示全图
      { component: 'ClearLabel', initVisible: true },//清除标注
      { component: 'Measure', initVisible: true },//测距测面
      { component: 'Position', initVisible: true },//输入经纬度定位
      { component: 'LayerSelect', initVisible: true },//图层选择
      { component: 'BaseLayerList', initVisible: true },//地图列表
    ]

}


```
组件对外暴露的方法
```js
      /**
       * 创建图层，并在图层上绘制点、线、面
       * @param layerType 需要创建的图层类型，与arcgis的图层类型相同
       * 支持'ElevationLayer'、'FeatureLayer'、'GraphicsLayer'、'MapImageLayer'、'GroupLayer'、'SceneLayer'、'TileLayer'、'WMSLayer'、'WMTSLayer'、'WebTileLayer'、'GoogleMapTileLayer'、'TiandituWMTSLayer'
       * @param layerUse 图层的使用方式打点、打线、打文字
       * 支持'TextSymbol'、'PictureMarkerSymbol'、'Polyline'、'polylineDescribe'、'Polygon'

       * @param param 当layerUse值为'TextSymbol'、'PictureMarkerSymbol'时：
       * 打点、打文字的数据：data:[{data:"显示的文字"，coors:[?]["经度"，* 纬度”],可自定义添加属性}]，
       * 当layerUse值为'Polyline'、'polylineDescribe'、'Polygon'时，
       * 线、线描述和面等级：data:[{level:"等级"，coors:[?]["经度"，“纬度”]}]
       * @param layerStyle 图层的样式
       * @param isvisible 图层是否显示
       * @param layerParam 图层的属性，{id:"图层id",title:"图层名称"}
       */
      elitelMap.CreateGraphicsLayer(layerType,symbolType,data,layerStyle,isvisible,layerParam);

      /**
       * 清空图层和当前图层的图例
       * @param layerID 传入图层的id
       */
      elitelMap.CleanLayer(layerID);

      /**
       * 选择需要显示的图例
       * @param layerID 传入图层的id
       */
      this.elitelMap.selectLegend(layerID);

      /**
       * 隐藏图层会将当前图层的图例隐藏
       * @param layerID 传入图层的id
       */
      this.elitelMap.setLayerVisibleFun(layerID);
```
## EsriMapPopup
EsriMap组件内popup弹窗

```
<elt-esri-map>
  <elt-esri-map-popup slot="popup" :mapPoint="mapPoint">
    <!-- 内部内容自定义 -->
    <!-- 最外层只能有一个dom -->
    <div class="demo">
      // xxxx
    </div>
  </elt-esri-map-popup>
</elt-esri-map>
```

放在EsriMap组件内，添加slot="popup"属性

1. 接收一个参数mapPoint
传入arcgis的地图point，则组件显示
传入null，则组件隐藏

2. 内部内容
自定义，最外层只能有一个dom

3. 为地图添加点击事件
```js
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
```

## EltSelectorBar

EsriMap组件内 Selector Bar

```
<elt-esri-map>
  <elt-selector-bar slot="selector">
  </elt-selector-bar>
</elt-esri-map>
```

放在EsriMap组件内，添加slot="selector"属性， **样式依赖 element-ui，需要先安装 element-ui**。

### 参数配置

- tabs 参数，用于配置 Selector Bar 显示内容

```json
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
  }
}
```

- activeName

默认 `tab`  选项，要与 `tabs` 配置中的 `title` 配置相同


### 回调事件

- @tab-change

当 `tab` 选项更改后触发，返回当前激活的 `tabName`，与 `tabs` 配置中的 `title` 配置相同。

- @buttons-click

按钮点击事件，返回点击按钮的 `name` ，与 `tabs` 配置中的 `buttons name` 配置相同。

组件支持 `v-model` 获取 `Selector Bar` 中的结果值。
