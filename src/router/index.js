import { createWebHistory, createRouter } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import Books from '../views/BookPage.vue';
import BookDetail from '../views/BookDetail.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Home'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/books',
    name: 'Books',
    component: Books,
  },
  {
    path: '/bookdetail',  // Menambahkan parameter dinamis untuk detail buku
    name: 'Book Detail',
    component: BookDetail,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
