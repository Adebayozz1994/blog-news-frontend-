import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import RegisterPage from "../components/RegisterPage.vue"
import RegisterPageUser from "../components/RegisterPageUser.vue"
import AdminDashboard from "@/components/AdminDashboard.vue";
import UserDashboard from "@/components/UserDashboad.vue"

const routes = [
    {path: "/", component: HelloWorld},
    {path: "/admin/register", component: RegisterPage},
    {path: "/admin/login", component: RegisterPage},
    {path: "/admin/dashboard", component: AdminDashboard},

    {path: "/register", component: RegisterPageUser},
    {path: "/login", component: RegisterPageUser},
    {path: "/dashboard", component: UserDashboard},



]



const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router; 