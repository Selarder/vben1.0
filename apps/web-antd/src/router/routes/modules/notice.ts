import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    path: '/notice',
    name: 'Notice',
    component: () => import('#/views/notice/notice.vue'),
    meta: {
      icon: 'ion:notifications-outline', // 可以使用Vben内置的图标或自定义
      title: $t('page.notice.notice'),
      order: 10, // 菜单排序
    },
    children: [
      {
        path: '/notice/list',
        name: 'NoticeList',
        component: () => import('#/views/notice/list.vue'),
        meta: {
          icon: 'ion:notifications-outline', // 可以使用Vben内置的图标或自定义
          title: $t('page.notice.noticelist'),
          hideInMenu: true,
        },
      },
      {
        path: '/notice/publish',
        name: 'NoticePublish',
        component: () => import('#/views/notice/publish.vue'),
        meta: {
          icon: 'ion:notifications-outline', // 可以使用Vben内置的图标或自定义
          title: $t('page.notice.noticepublish'),
          hideInMenu: true,
        },
      },
      {
        path: '/notice/detail',
        name: 'NoticeDetail',
        component: () => import('#/views/notice/detail.vue'),
        meta: {
          icon: 'ion:notifications-outline', // 可以使用Vben内置的图标或自定义
          title: $t('page.notice.noticedetail'),
          hideInMenu: true,
        },
      },
      {
        path: '/notice/filedetail',
        name: 'NoticeFiledetail',
        component: () => import('#/views/notice/filedetail.vue'),
        meta: {
          icon: 'ion:notifications-outline', // 可以使用Vben内置的图标或自定义
          title: $t('page.notice.filedetail'),
          hideInMenu: true,
        },
      },
      {
        path: '/notice/confirm',
        name: 'NoticeConfirm',
        component: () => import('#/views/notice/confirm.vue'),
        meta: {
          icon: 'ion:notifications-outline', // 可以使用Vben内置的图标或自定义
          title: $t('page.notice.confirm'),
          hideInMenu: true,
        },
      },
    ],
  },
];

export default routes;
