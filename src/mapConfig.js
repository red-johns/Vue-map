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
 * layerType 取值为[GraphicsLayer、FeatureLayer、SceneLayer、TileLayer、WMSLayer、WMTSLayer、WebTileLayer、GoogleMapTileLayer、TiandituWMTSLayer]
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
  ViewType: '2d', // 视图类型，取值 2d|3d
  InitialExtent: { xmin: 118.028, ymin: 38.480, xmax: 120.368, ymax: 41.225, wkid: 4326 },
  Constraints: { minZoom: 7, maxZoom: 17, rotationEnabled: true },
  BaseMapLayers: [
    //{ id: 'GoogleMapLayer_JT', title: 'google交通图', layerType: 'GoogleMapTileLayer', initVisible: true, opacity: 1, restURL: 'http://www.google.cn/maps/vt/lyrs=t@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil' },
    // { id: "GoogleMapLayer_YX_NOLABEL", title: "google影像图", layerType: "GoogleMapTileLayer", initVisible: true, opacity: 1, restURL: "http://www.google.cn/maps/vt/lyrs=s@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil" },
    //  { id: "GoogleMapLayer_YX", title: "google影像图", layerType: "GoogleMapTileLayer", initVisible: true, opacity: 1, restURL: "http://www.google.cn/maps/vt/lyrs=y@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil" },
    //  { id: "GoogleMapLayer_JD_P", title: "google街道p", layerType: "GoogleMapTileLayer", initVisible: true, opacity: 1, restURL: "http://www.google.cn/maps/vt/lyrs=p@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil" },
    //  { id: "GoogleMapLayer_JD_R", title: "google街道r", layerType: "GoogleMapTileLayer", initVisible: true, opacity: 1, restURL: "http://www.google.cn/maps/vt/lyrs=r@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil" },
    //  { id: "GoogleMapLayer_JD_M", title: "google街道m", layerType: "GoogleMapTileLayer", initVisible: true, opacity: 1, restURL: "http://www.google.cn/maps/vt/lyrs=m@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil" },
    //{ id: "TiandituLayer_ID", title: "天地图", layerType: "TiandituWMTSLayer", initVisible: true, opacity: 1, restURL: "http://t0.tianditu.cn/DataServer?T=vec_c&X={x}&Y={y}&L={z}" }
    //  { id: "layerMapGoogleJT", title: "交通图", layerType: "WebTileLayer", initVisible: false, opacity: 1, restURL: "http://10.13.178.54/GoogleChinaMap/m@216000000/L{level}/COL{col}/{row}.png" }
    //  { id: "layerMapGoogleJT", title: "交通图", layerType: "WebTileLayer", initVisible: false, opacity: 1, restURL: "http://192.168.0.30/GoogleChinaMap/m@216000000/L{level}/COL{col}/{row}.png" }
    //  { id: 'MapGJ', title: '界区域', layerType: 'MapImageLayer', initVisible: true, opacity: 1, restURL: 'http://192.168.0.24:6080/arcgis/rest/services/ZHSL_QHDMap/qhdNewMap/MapServer' },
    //{ id: 'GoogleMapLayer_JT', title: '卫星图', layerType: 'GoogleMapTileLayer', initVisible: false, opacity: 1, restURL: 'http://www.google.cn/maps/vt/lyrs=m@186000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}' },
    //{ id: "TiandituLayer_ID", title: "天地图", layerType: "TiandituWMTSLayer", initVisible: false, opacity: 1, restURL: "http://t0.tianditu.cn/DataServer?T=vec_c&X={x}&Y={y}&L={z}" },
     { id: "TiandituLayer_ID", title: "地形图", layerType: "GoogleMapTileLayer", initVisible: false, opacity: 1, restURL: "http://www.google.cn/maps/vt/lyrs=t@129,r@186000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}" },
    // { id: "layerMapGoogleJT", title: "交通图", layerType: "WebTileLayer", initVisible: false, opacity: 1, restURL: "http://10.13.178.54/GoogleChinaMap/m@216000000/L{level}/COL{col}/{row}.png" }
     { id: "layerMapGoogleJT", title: "交通图", layerType: "WebTileLayer", initVisible: true, opacity: 1, restURL: "http://192.168.0.30/GoogleChinaMap/m@216000000/L{level}/COL{col}/{row}.png" }

  ],
  CustomerLayers: [
    // { id: 'addvcd', title: '行政区划', groupbyName: "行政区划", position: true, layerType: 'MapImageLayer', initVisible: true, opacity: 1, restURL: 'http://192.168.0.24:6080/arcgis/rest/services/ZHSL_QHDMap/qhdNewMap/MapServer' },
    // { id: 'MapGJ', title: '界区域', layerType: 'MapImageLayer', initVisible: true, opacity: 1, restURL: 'http://10.13.178.54:6080/arcgis/rest/services/QhdMap/MapServer' },
    // { id: 'river', title: '流域河流', groupbyName: "流域河流", position: false, layerType: 'MapImageLayer', initVisible: true, opacity: 1, restURL: 'http://192.168.0.24:6080/arcgis/rest/services/ZHSL_QHDMap/qhdNewMap/MapServer' },
    // //{ id: 'GoogleMapLayer_JT', title: '卫星图', layerType: 'GoogleMapTileLayer', initVisible: false, opacity: 1, restURL: 'http://www.google.cn/maps/vt/lyrs=m@186000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}' },
    // //{ id: "TiandituLayer_ID", title: "天地图", layerType: "TiandituWMTSLayer", initVisible: false, opacity: 1, restURL: "http://t0.tianditu.cn/DataServer?T=vec_c&X={x}&Y={y}&L={z}" },
    // { id: "TiandituLayer_ID", title: "地形图", layerType: "GoogleMapTileLayer", initVisible: false, opacity: 1, restURL: "http://www.google.cn/maps/vt/lyrs=t@129,r@186000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}" },
    // // { id: "layerMapGoogleJT", title: "交通图", layerType: "WebTileLayer", initVisible: false, opacity: 1, restURL: "http://10.13.178.54/GoogleChinaMap/m@216000000/L{level}/COL{col}/{row}.png" }
    // { id: "layerMapGoogleJT", title: "交通图", layerType: "WebTileLayer", initVisible: true, opacity: 1, restURL: "http://192.168.0.30/GoogleChinaMap/m@216000000/L{level}/COL{col}/{row}.png" }
    //{ id: 'water', title: '水利工程', groupbyName: "水利工程", position: false, layerType: 'MapImageLayer', initVisible: true, opacity: 1, restURL: 'http://192.168.0.24:6080/arcgis/rest/services/ZHSL_GXMap/GXSMAP_ANN/MapServer' },
    // { id: 'station', title: '测站', groupbyName: "测站", position: false, layerType: 'MapImageLayer', initVisible: true, opacity: 1, restURL: 'http://192.168.0.24:6080/arcgis/rest/services/ZHSL_GXMap/GXSMAP_ANN/MapServer' }
    // { id: 'Td', title: '测站', groupbyName: "测站", position: false, layerType: 'KMLLayer', initVisible: true, opacity: 1, restURL: 'http://116.62.239.30:8061/guanqu0319_MapToKML1.kmz' }
  ],
  ElevationLayers: [
    // { id: 'TiandituLayer_ID', title: '测站', groupbyName: "测站", position: false, layerType: 'KMLLayer', initVisible: true, opacity: 1, restURL: 'http://116.62.239.30:8061/guanqu0319_MapToKML1.kmz' }
    // { id: "layerMapgc", title: "高程图", layerType: "ElevationLayer", initVisible: true, opacity: 1, minScale: 30000000, maxScale: 1000, restURL: "http://192.168.0.189:6080/arcgis/rest/services/ChinaElevation/ImageServer" }
  ],
  BusinessLayers: [

  ],
  // Widgets1: [
  // { component: 'Compass', position: 'top-left', index: 0, initVisible: true },
  // { component: 'Home', position: 'top-left', index: 1, initVisible: true },
  // { component: 'LayerList', position: 'top-right', index: 2, initVisible: true },
  // { component: 'Legend', position: 'top-right', index: 3, initVisible: true },
  // { component: 'ScaleBar', position: 'bottom-left', index: 4, initVisible: true },
  // { component: 'Search', position: 'bottom-right', index: 5, initVisible: true },
  // { component: 'Zoom', position: 'top-left', index: 0, initVisible: true }
  // ]

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
    { component: 'LegendList', initVisible: true, singleton:true }//图例
  ]
}
