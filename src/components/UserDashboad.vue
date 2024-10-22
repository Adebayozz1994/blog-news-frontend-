<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
        <!-- User Info -->
        <div v-if="user">
          <h1 class="text-2xl font-bold mb-4">Welcome, {{ user.name }}</h1>
          <p class="text-gray-600 mb-6">Email: {{ user.email }}</p>
  
          <button @click="logout" class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300">
            Logout
          </button>
        </div>
  
        <!-- Error Message -->
        <div v-else>
          <p class="text-red-500">{{ error }}</p>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { url } from '@/data';
  import { useRouter } from 'vue-router';
  
  const user = ref(null);
  const error = ref('');
  const router = useRouter();  
  
  axios.defaults.withCredentials = true;
  
 
  const getCsrfToken = async () => {
    await axios.get(`${url}sanctum/csrf-cookie`);
  };
  
  
  const getUser = async () => {
    await getCsrfToken();
    try {
      const res = await axios.get(`${url}user`);
      if (res.data.status) {
        user.value = res.data.user;
        console.log('Current User:', user.value);
      } else {
        error.value = 'Failed to fetch user';
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'An error occurred';
      console.error('Error fetching user:', err.response || err.message);
    }
  };
  
  
  const logout = async () => {
    await getCsrfToken();
    try {
      await axios.post(`${url}logout`);  
      user.value = null;  
      router.push('/login');  
    } catch (err) {
      console.error('Logout error:', err.response || err.message);
    }
  };
  
  
  onMounted(() => {
    getUser();
  });
  </script>
  
  <style scoped>
  button {
    padding: 8px 16px;
    background-color: #f56565;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #e53e3e;
  }
  </style>
  