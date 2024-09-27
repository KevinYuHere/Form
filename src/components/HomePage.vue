<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function linkJump(url) {
  router.push({ path: '/' + url });
}
</script>
<template>
  <a-button @click="linkJump('doctor')">Doctor</a-button>
  <a-button @click="linkJump('patient')">Patient</a-button>
</template>