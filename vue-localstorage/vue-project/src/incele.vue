<script setup>
import { ref, watch } from 'vue'

const rakam = ref(0)
const count = ref(0)

watch(count,(n,o)=>{
  rakam.value= n%3                              
})
</script>

<template>
<div :class="`backGround${rakam} ortakYukseklik` ">  
  {{ count }}
  <button @click="count++">Count</button>
</div>  
</template>
<style>
  .ortakYukseklik{
    height:97vh;
  }
  
  .backGround0{
    background-color:green;
  }
  
  .backGround1{
    background-color:blue; 
  }
  
  .backGround2{
    background-color:purple;
  }
</style>