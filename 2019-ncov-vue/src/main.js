import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Toast, Tab, Tabs, PullRefresh, List, Cell, CellGroup, 
  Tabbar, TabbarItem,
  Panel,
  Button,
  Sticky,
  ActionSheet,
  Popup,
  Calendar,
  Field,
} from 'vant';
Vue.config.productionTip = false;

Vue.use(Toast);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Panel);
Vue.use(Button).use(Sticky).use(ActionSheet).use(Popup)
.use(Calendar)
.use(Field);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
