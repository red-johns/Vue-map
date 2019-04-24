<template>
    <el-container style="height:100%;">
        <el-aside width="180px" >
             <el-col>
                <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#409EFF"
                text-color="#fff"
                active-text-color="#ffd04b">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">
                            <router-link to="/">首页</router-link>
                        </span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-setting"></i>
                        <span slot="title">
                            <router-link to="/slt">SLT组件</router-link>
                        </span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-date"></i>
                        <span slot="title">
                            <router-link to="/selector">EltSelectorBar组件</router-link>
                        </span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-location-outline"></i>
                        <span slot="title">
                            <router-link to="/eltesri">EsriMapDraw组件</router-link>
                        </span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <i class="el-icon-edit-outline"></i>
                        <span slot="title">
                            <router-link to="/customesri">自定义EsriMap图层</router-link>
                        </span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
    </el-container>
</template>
<script>
export default {
     methods: {
      handleOpen(key, keyPath) {
        
      },
      handleClose(key, keyPath) {
        
      }
    }
}
</script>
<style>
    .el-header{
        padding:0px !important;
    }
    .el-main{
        padding:0px !important;
    }
    a{
        text-decoration: none !important;
    }
</style>

