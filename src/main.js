import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/all.scss'

Vue.config.productionTip = false

import { Button } from 'vant';
import { Cell, CellGroup } from 'vant';

Vue.use(Button);

Vue.use(Cell);
Vue.use(CellGroup);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')