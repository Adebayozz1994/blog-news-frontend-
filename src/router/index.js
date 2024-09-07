import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import RegisterPage from "../components/RegisterPage.vue"

const routes = [
    {path: "/", component: HelloWorld},
    {path: "/admin/register", component: RegisterPage},
    {path: "/admin/login", component: RegisterPage},


]



const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router; 