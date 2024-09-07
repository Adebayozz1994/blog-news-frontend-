<template>
  <div class="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
    <div class="mt-5">
      <form @submit.prevent="route.path === '/admin/register' ? register() : login()" action="">
        
        <!-- Full Name (only for register) -->
        <div class="mb-4" v-if="route.path === '/admin/register'">
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

        <!-- Email Errors
        <div v-for="error in errors['email']" :key="error" class="mb-2">
          <span class="text-red-500 text-sm">{{ error }}</span>
        </div> -->

        <!-- Login Error -->
        <!-- <div class="mb-4">
          <span class="text-red-500 text-sm">{{ error }}</span>
        </div> -->

        <!-- Role (only for register) -->
        <div class="mb-4" v-if="route.path === 'admin/register'">
          <label for="role" class="block text-gray-700 font-semibold mb-2">Role</label>
          <input
            type="text"
            id="role"
            placeholder="Role"
            v-model="role"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Role Errors -->
        <!-- <div v-for="error in errors['role']" :key="error" class="mb-2">
          <span class="text-red-500 text-sm">{{ error }}</span>
        </div> -->

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

        <!-- Password Errors -->
        <!-- <div v-for="error in errors['password']" :key="error" class="mb-2">
          <span class="text-red-500 text-sm">{{ error }}</span>
        </div> -->

        <!-- Submit Button -->
        <div class="text-right mt-6">
          <button v-if="route.path === '/admin/register'" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
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
// import axios from 'axios'
// import {url} from '../data'
import { useRoute } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const role = ref('');

// const status = ref(null);
// const router = useRouter();
const route = useRoute();
// const errors = ref([]);
// const error = ref('');

// const message = ref(null);

const register = () => {
    // const adminDetails = {
    //     fullname: name.value,
    //     email: email.value, 
    //     password: password.value,
    //     role: role.value,
    // };
    // axios.post(`${url}admin/register`, adminDetails)
    //     .then(res => {
    //         if(res.data.status){
    //             router.push('/admin/login');
    //             status.value = res.data.status;
    //         } else {
    //             errors.value = res.data.errors;
    //             status.value = res.data.status;
    //             message.value = res.data.message;
    //         }
    //     })
}

const login = () => {
    // const loginDetails = {email: email.value, password: password.value}
    // axios.post(`${url}admin/login`, loginDetails).then(res => {
    //     if(res.data.status){
    //         localStorage.setItem('token', res.data.token);
    //         router.push('/admin/dashboard');
    //     } else {
    //         error.value = res.data.error;
    //     }
    // });
}
</script>

<style scoped>
/* Additional custom styles, if needed */
</style>
