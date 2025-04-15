import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// PrimeVue CSS - Ordem correta de importação
import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/lara-light-blue/theme.css';

// PrimeVue Components
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';

const app = createApp(App);

// Register PrimeVue components globally
app.component('Avatar', Avatar);
app.component('Button', Button);
app.component('Calendar', Calendar);
app.component('Column', Column);
app.component('DataTable', DataTable);
app.component('Dropdown', Dropdown);
app.component('InputText', InputText);
app.component('Tag', Tag);
app.component('Toast', Toast);

// Register directives
app.directive('tooltip', Tooltip);

app.use(router);
app.use(PrimeVue, {
  unstyled: false,
  ripple: true
});
app.use(ToastService);
app.mount('#app');
