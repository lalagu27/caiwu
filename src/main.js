import Vue from 'vue'
import App from './App.vue'
import './assets/main.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 默认启用暗色主题
document.body.classList.add('dark-theme');

new Vue({
    render: (h) => h(App)
}).$mount('#app')
