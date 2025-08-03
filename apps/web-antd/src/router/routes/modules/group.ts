import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    name: 'groupGroupManagement',
    path: '/group',
    component: () => import('#/views/group/group.vue'),
    meta: {
      icon: 'lucide:user',
      title: $t('page.group.groupmanagement'),
      order: 11,
    },
  },
];

export default routes;
