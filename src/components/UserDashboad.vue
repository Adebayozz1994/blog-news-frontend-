<template>
    <div v-if="user">
      <h1>Welcome, {{ user.name }}</h1>
      <p>Email: {{ user.email }}</p>
    </div>
    <div v-else>
      <p>{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { url } from '@/data'; 
  
  const user = ref(null);
  const error = ref('');
  
  axios.defaults.withCredentials = true; 
  const getCsrfToken = async () => {
  await axios.get(`${url}sanctum/csrf-cookie`)
}
  
  const getUser = async () => {
      await getCsrfToken() 
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
  
 
  onMounted(() => {
    getUser();
  });
  
  </script>
  
  <style scoped>
  </style>
  