// Vue
import { createApp } from 'vue'
import App from './App.vue'

// Vue Router
import { router } from './router'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// Generics Components
import AppLoader from '@/components/AppLoader.vue';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// FontAwesome Components
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'


// Including fontawesome icon
library.add(faXmark, faHouse, faUser);

// App
const app = createApp(App);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('AppLoader', AppLoader);
app.mount('#app');
