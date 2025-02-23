<script setup>
import {ref,onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
const degisken2 = ref(0)
onBeforeMount(() => {
          alert("onBeforeMount: Uygulama DOM'a bağlanmadan önce.");
        });

        // Uygulama DOM'a eklendikten sonra çalışır.
        onMounted(() => {
          alert("onMounted: Uygulama DOM'a başarıyla bağlandı.");
        });

        // Veri değişikliği tespit edilip, DOM güncellenmeden önce çalışır.
        onBeforeUpdate(() => {
          alert("onBeforeUpdate: Veri değişti, DOM güncellenmeden önce.");
        });

        // Veri güncellendikten ve DOM yeniden render edildikten sonra çalışır.
        onUpdated(() => {
          alert("onUpdated: DOM güncellendi.");
        });

        // Uygulama (instance) kapatılmadan hemen önce çalışır.
        onBeforeUnmount(() => {
          alert("onBeforeUnmount: Uygulama kapatılmadan önce.");
        });

        // Uygulama kapatıldıktan sonra çalışır.
        onUnmounted(() => {
          alert("onUnmounted: Uygulama kapatıldı.");
        });

        // Mesajı güncelleyen metod
        const updateMessage = () => {
          message.value = "Mesaj güncellendi!";
        };

        // Uygulamayı kapatan metod
        // Dikkat: app nesnesini dışarıdan erişilebilir kılmak için global değişken olarak tanımladık.
        const destroyApp = () => {
          app.unmount();
        };

</script>

<template>
<button @click="degisken2+=1">tıkla</button>
<p>{{ degisken2 }}</p>
</template>