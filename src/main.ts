import Vue from 'vue';
import VueTheMask from 'vue-the-mask';
import 'buefy/dist/buefy.css';
import Buefy from 'buefy';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import emitter from './emitter';
import App from './App.vue';
import router from './router';

library.add(faEye);
library.add(faEyeSlash);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(Buefy);

Vue.use(VueTheMask);

let requests = 0;

axios.interceptors.request.use((request) => {
  emitter.emit('loading', true);
  requests += 1;
  return request;
});

axios.interceptors.response.use((response) => {
  requests -= 1;
  if (!requests) {
    emitter.emit('loading', false);
  }
  return response;
}, (err) => {
  requests -= 1;
  if (!requests) {
    emitter.emit('loading', false);
  }
  return err;
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
