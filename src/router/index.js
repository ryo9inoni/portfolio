import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: home
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('../views/about.vue')
	},
	{
		path: '/works',
		name: 'Works',
		component: () => import('../views/works.vue')
	},
	{
		path: '/contact',
		name: 'Contact',
		component: () => import('../views/contact.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router