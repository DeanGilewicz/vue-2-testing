<template>
  <div class="container mx-auto">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/atoms/Footer';
import Header from '@/components/atoms/Header';

export default {
  name: 'App',
  components: {
    Footer,
    Header
  }
};
</script>

<style>
  code {
    white-space: pre-wrap;
    word-break: break-word;
  }
</style>
