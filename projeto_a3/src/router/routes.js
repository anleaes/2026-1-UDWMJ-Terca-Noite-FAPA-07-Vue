const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/MainDashboardPage.vue') }],
  },
  {
    path: '/descricoes/adicionar',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AddDescricaoPage.vue') }],
  },

  {
    path: '/jogos',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/GamesPage.vue') }],
  },
  {
    path: '/jogos/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ViewGamePage.vue') }],
  },
  {
    path: '/jogos/:id/comprar',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/BuyGamePage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
