<template>
  <main class="documentation">
    <nav class="container mx-auto px-2 md:px-4 lg:px-6">
      <ul class="md:flex md:justify-between my-2 md:my-4 lg:my-6">
        <li class="mb-1 md:mb-0"><router-link to="/documentation/introduction" class="font-normal text-lg capitalize text-gray">Introduction</router-link></li>
        <li class="mb-1 md:mb-0"><router-link to="/documentation/set-up" class="font-normal text-lg capitalize text-gray">Set Up</router-link></li>
        <li class="mb-1 md:mb-0"><router-link to="/documentation/structure" class="font-normal text-lg capitalize text-gray">Structure</router-link></li>
        <li class="mb-1 md:mb-0"><router-link to="/documentation/examples" class="font-normal text-lg capitalize text-gray">Examples</router-link></li>
        <li><router-link to="/documentation/resources" class="font-normal text-lg capitalize text-gray">Resources</router-link></li>
      </ul>
    </nav>
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'DocumentationIndex'
};
</script>

<style scoped>
  .router-link-active {
    color: #2F58CA;
    text-decoration: underline;
  }
</style>
