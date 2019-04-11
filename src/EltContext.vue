<template>
    <div style="margin-left:20px; margin-top:10px;">
        <h1>组件的描述信息</h1>
        <div class="tipinfo">
            <h3>SLT组件</h3>
            <p>
                放在EsriMap组件内，添加slot="slt"属性， 样式依赖 element-ui，需要先安装 element-ui，详情请查看SLT组件
            </p>
        </div>
        <div class="tipinfo">
            <h3>EltSelectorBar组件</h3>
            <p>
                EsriMap组件内 Selector Bar
                放在EsriMap组件内，添加slot="selector"属性， 样式依赖 element-ui，需要先安装 element-ui，详情请查看EltSelectorBar组件
            </p>
        </div>
        <div class="tipinfo">
            <h3>EsriMapDraw组件</h3>
            <p>
                EsriMapDraw组件,需在html中引入所用版本arcgis"https://js.arcgis.com/4.6/" 需在html中引入所用版本arcgis的css文件"https://js.arcgis.com/4.6/esri/css/main.css" 需要先引入element-ui
            </p>
        </div>
    </div>
</template>
<style>
.tipinfo{
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 20px 0;
}
</style>
