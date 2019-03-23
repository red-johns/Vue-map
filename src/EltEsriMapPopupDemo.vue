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
  </div>
</template>


<script>
export default {
  data () {
    return {
      mapPoint: null,
      custom: true,
      mapConfig: {
        ViewType: '2d',
        InitialExtent: { xmin: 25, ymin: 0, xmax: 150, ymax: 60, wkid: 4326 },
        Constraints: { minZoom: 3, maxZoom: 17, rotationEnabled: true },
        BaseMapLayers: [
          // { id: "GoogleMapLayer_JT", title: "google交通图", layerType: "GoogleMapTileLayer", initVisible: true, opacity: 1, restURL: "http://www.google.cn/maps/vt/lyrs=t@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil" },
          { id: 'TiandituLayer_ID', title: '天地图', layerType: 'TiandituWMTSLayer', initVisible: true, opacity: 1, restURL: 'http://t0.tianditu.gov.cn/DataServer?T=vec_c&X={x}&Y={y}&L={z}&tk=9bffe327c344fdd5ccc0bf772c778359' }
        ],
        CustomerLayers: [
        ],
        ElevationLayers: [
        ],
        BusinessLayers: [
        ],
        Widgets: [
          {component: 'Compass', position: 'top-left', index: 0, initVisible: true},
          {component: 'Home', position: 'top-left', index: 1, initVisible: false},
          {component: 'LayerList', position: 'top-right', index: 2, initVisible: false},
          {component: 'Legend', position: 'top-right', index: 3, initVisible: false},
          {component: 'ScaleBar', position: 'bottom-left', index: 4, initVisible: false},
          {component: 'Search', position: 'bottom-right', index: 5, initVisible: false},
          {component: 'Zoom', position: 'top-left', index: 0, initVisible: false}
        ]
      }
    }
  },
  methods: {
    loadedHandler (map, view) {
      this.map = map
      this.view = view
      var _this = this
      this.view.on('click', function (event) {
        _this.mapPoint = event.mapPoint
      })
    },
    hidePopup () {
      this.mapPoint = null
      this.custom = !this.custom;
    }
  }
}
</script>

<style lang="less" scoped>
.demo{
  width: 100%;
  height: 100%;
}
</style>

