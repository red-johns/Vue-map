<template>
    <div class="demo">
        <elt-esri-map :mapConfig="mapConfig" @loaded="loadedHandler">
        </elt-esri-map>
        <div class="cus_btn">
            <el-button type="success" @click="addLayler">添加自定义图层</el-button>
            <el-button type="primary" @click="cleanLayler">清理图层和图例</el-button>
        </div>
    </div>
</template>

<script>
import mapConfig from './mapConfig.js'
import testdata from './geoJson.json'
export default {
    data(){
        return {
            mapConfig:mapConfig,
            testdata:testdata
        }
    },
    methods:{
        loadedHandler(elitelMap){
            this.elitelMap = elitelMap;
        },
        addLayler(){
            /**
             * 添加自定义面图层
             * 手动添加图层，不调用组件方法，
             * 参考arcgis for js api 文档 
             */
            let that = this;
            window.require(
                [
                    "esri/layers/GraphicsLayer",
                    "esri/Graphic",
                    "esri/geometry/Polygon"
                ],
                function(
                    GraphicsLayer,
                    Graphic,
                    Polygon
                ){
                    let layerItem = new GraphicsLayer({
                        id: "custom_layter",
                        title: "自定义图层",
                        visible: true,
                        copyright:""
                    });

                    //获取面数据
                    let paramList = new Array();
                    let levelList = new Array();
                    testdata.features.forEach(item =>{
                        item.geometry.coordinates.forEach(itemarry =>{
                            let paramt ={
                                level: item.properties.level,
                                coors: itemarry
                            };
                            paramList.push(paramt);
                        });
                        
                        let level = {
                            levelName: item.properties.level,
                            title: item.properties.from+"-"+item.properties.to,
                            levelColor: item.properties.color
                        };
                        levelList.push(level);
                    });

                    //设置图层样式
                    let layerStyle = {
                        groupByName:"图例",
                        level: levelList,
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

                    for(let i=0; i<paramList.length;i++){
                        let value = paramList[i];
                        if(value.level == layerStyle.levelNotShow) continue;
                        
                        let color = layerStyle.levelDefultColor;
                        for(let x=0;x<layerStyle.level.length;x++){
                            if(value.level == layerStyle.level[x].levelName){
                                color = layerStyle.level[x].levelColor;
                            }
                        }


                        //画面图层
                        let polygonStyle={
                            type: layerStyle.polygonStyle.type,
                            rings:[],
                            spatialReference: 4326
                        };
                        let fillSymbol = {
                            type:layerStyle.fillSymbol.type,
                            color:color,
                            outline: {
                                color:color,
                                width:"5"
                            }
                        };
                        let custom_polygon = new Polygon(polygonStyle);
                        for(let j=0; j<value.coors.length; j++){
                            custom_polygon.addRing(value.coors[j]);
                        }
                        let polygonGraphic = new Graphic({
                            geometry: custom_polygon,
                            symbol: fillSymbol,
                            attributes: []
                        });

                        layerItem.add(polygonGraphic);

                        //添加图层
                        that.elitelMap.map.add(layerItem);

                    }

                    /**
                     * 自定义添加图例
                     * elitelMap.LegendList 存放是图例信息，格式如下：
                     * legendInfo = {
                     *  layer: layer,
                     *  groupByName: style.groupByName,
                     *  data: data
                     *  };
                     * 
                     */
                     let data = new Array();
                     //去除重复数据
                    let obj = {};
                    levelList = levelList.reduce(function(item,next){
                        obj[next.title] ? '' : obj[next.title] = true && item.push(next);
                        return item;
                    },[]);

                     if(levelList.length > 0){
                         for(let y=0;y<levelList.length;y++){
                             data.push({
                                title: levelList[y].title,
                                isColor: true,
                                color: levelList[y].levelColor
                            });
                         }
                     }
                     

                     let legendInfo = {
                         layer: layerItem,
                         groupByName: layerStyle.groupByName,
                         data: data
                     };
                     that.elitelMap.LegendList.push(legendInfo);

                }


            );
            
            
        },
        cleanLayler(){
            this.elitelMap.CleanLayer("custom_layter");
        }
    }
}
</script>
<style>
.demo{
    width:100%;
    height: 100%;
}
.cus_btn{
    position: absolute;
    top:0px;
}
</style>


