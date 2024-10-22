<template>
  <div class="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
    <div class="mt-5">
      <form @submit.prevent="route.path === '/register' ? register() : login()" action="">
        
        <!-- Full Name (only for register) -->
        <div class="mb-4" v-if="route.path === '/register'">
          <label for="fullName" class="block text-gray-700 font-semibold mb-2">Full Name</label>
          <input
            type="text"
            id="full_Name"
            placeholder="Full Name"
            v-model="name"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-semibold mb-2">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="name@example.com"
            v-model="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            v-model="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Submit Button -->
        <div class="text-right mt-6">
          <button v-if="route.path === '/register'" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
            Register
          </button>
          <button v-else class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { url } from '../data'
import { useRouter, useRoute } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const status = ref(null)
const router = useRouter()
const route = useRoute()
const errors = ref([])
const error = ref('')
const message = ref(null)


const getCsrfToken = async () => {
  await axios.get(`${url}sanctum/csrf-cookie`)
}


const register = async () => {
  await getCsrfToken() 

  const adminDetails = {
    name: name.value,
    email: email.value,
    password: password.value,
  }

  try {
    const res = await axios.post(`${url}register`, adminDetails)
    if (res.data.status) {
      router.push('/login')
      status.value = res.data.status
    } else {
      errors.value = res.data.errors
      status.value = res.data.status
      message.value = res.data.message
      console.log('Registration failed:', res.data)
    }
  } catch (err) {
    console.error('Error in registration:', err.response)
  }
}


const login = async () => {
  await getCsrfToken() 

  const loginDetails = {
    email: email.value,
    password: password.value,
  }

    try {
    const res = await axios.post(`${url}login`, loginDetails);

    if (res.data.status) {
      console.log('Login successful', res.data);
      router.push('/dashboard');
    } else {
      error.value = res.data.message || 'Login failed';
      console.error('Login error:', res.data.errors);
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'An error occurred';
    console.error('Login error:', err.response || err.message);
  }
}
</script>

<style scoped>
/* Additional custom styles, if needed */
</style>
