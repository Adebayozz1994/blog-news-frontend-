<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-blue-800 text-white p-5">
      <h2 class="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <nav>
        <ul>
          <li class="mb-4">
            <a href="#" class="block py-2 px-4 bg-blue-700 rounded-md hover:bg-blue-600">
              Dashboard Overview
            </a>
          </li>
          <li class="mb-4">
            <a href="#" class="block py-2 px-4 hover:bg-blue-600 rounded-md">
              Manage Users
            </a>
          </li>
          <li class="mb-4">
            <a href="#" class="block py-2 px-4 hover:bg-blue-600 rounded-md">
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8">
      <header class="flex justify-between items-center mb-8">
        <div>
          <h4 class="text-2xl font-bold text-gray-700">Dashboard</h4>
          <p class="text-gray-500">Welcome, {{ adminDetails.name }}</p>
        </div>
        <button class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600" @click="logout">
          Logout
        </button>
      </header>

      <!-- Dashboard Cards -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white shadow rounded-lg p-6">
          <h5 class="text-lg font-semibold mb-4">Total Users</h5>
          <p class="text-gray-500 text-xl">120</p>
        </div>
        <div class="bg-white shadow rounded-lg p-6">
          <h5 class="text-lg font-semibold mb-4">Total Sales</h5>
          <p class="text-gray-500 text-xl">$5,240</p>
        </div>
        <div class="bg-white shadow rounded-lg p-6">
          <h5 class="text-lg font-semibold mb-4">Active Sessions</h5>
          <p class="text-gray-500 text-xl">34</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { url } from '../data.js';

const router = useRouter();
const adminDetails = ref({});

onMounted(() => {
  if (localStorage['token']) {
    const token = localStorage['token'];
    
    axios.post(`${url}get`, { token }).then(res => {
      if (res.data.status) {
        adminDetails.value = res.data.user;
      } else {
        router.push('/login');
      }
    });
  } else {
    router.push('/login');
  }
});

const logout = () => {
  const token = localStorage['token'];
  axios.post(`${url}logout`, { token }).then(() => {
    localStorage.removeItem('token');
    router.push('/login');
  });
};
</script>

<style scoped>
/* Sidebar styles */
aside {
  min-height: 100vh;
}

/* Main content styles */
main {
  background-color: #f9fafb;
}
</style>
