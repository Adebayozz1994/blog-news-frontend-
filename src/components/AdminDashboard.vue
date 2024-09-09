<template>
    <h4>dashboard</h4>
    <p>welcome, {{ adminDetails.name }}</p>


    <button class="btn btn-red-400" @click="logout">Logout</button>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import {url} from '../data.js'
import axios from 'axios'
import { useRouter } from 'vue-router';



    const router = useRouter()
    const adminDetails = ref({})

    onMounted(() => {
        if(localStorage['token']){

            const token = localStorage['token']
            console.log(token);
            
            axios.post(`${url}admin/get`, {token}).then(res => {
                console.log(res);
                
                if(res.data.status){
                    adminDetails.value = res.data.admin
                    console.log(res.data);
                    
                }else{
                    router.push('/admin/login')
                }
            })
        }else{
            router.push('/admin/login')
        }
        
        
    })

    const logout = () => {
         const token = localStorage['token'];
         axios.post(`${url}admin/logout`, {token}).then(() => {
                 localStorage.removeItem('token')
            router.push('/admin/login');
         })
    }
</script>

<style>

</style>