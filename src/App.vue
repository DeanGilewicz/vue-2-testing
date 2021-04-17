<template>
  <div class="container mx-auto">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/atoms/Header';
import Footer from '@/components/atoms/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
};
</script>

<style>
  code {
    white-space: pre-wrap;
    word-break: break-word;
  }
</style>
