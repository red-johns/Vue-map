import Vue from 'vue'
import Router from 'vue-router'
import EltContext from '@/EltContext'
import EltEsriMapSlt from '@/EltEsriMapSltDemo'
import EltSelector from '@/App'
import EltEsriMapDraw from '@/EltEsriMapDrawDemo'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'EltContext',
        component: EltContext
    },{
        path: '/slt',
        name: 'EltEsriMapSlt',
        component: EltEsriMapSlt
    },{
        path: '/selector',
        name: 'EltSelector',
        component: EltSelector
    },{
        path: '/eltesri',
        name: 'EltEsriMapDraw',
        component: EltEsriMapDraw
    }]
})