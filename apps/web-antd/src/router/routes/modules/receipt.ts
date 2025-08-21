import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';


const routes: RouteRecordRaw[] = [
  {
    name: 'Receipt',
    path: '/receipt',
    component:()=>import('#/views/receipt/receipt.vue'),
    meta: {
      icon: 'mdi:home',
      title: $t('page.receipt.receipt'),
      order:12
    },
  },
];

export default routes;
