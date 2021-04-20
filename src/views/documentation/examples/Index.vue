<template>
  <main class="examples container mx-auto px-2 md:px-4 lg:px-6">
    <nav class="container mx-auto">
      <ul class="flex flex-wrap md:justify-center my-2 md:my-4 lg:my-6">
        <li><router-link to="/documentation/examples/computed" :class="{active: this.$route.name === 'examplesDefault'}" class="font-normal text-lg text-gray">Computed</router-link></li>
        <li><router-link to="/documentation/examples/data" class="font-normal text-lg text-gray">Data</router-link></li>
        <li><router-link to="/documentation/examples/end-to-end" class="font-normal text-lg text-gray">End-To-End</router-link></li>
        <li><router-link to="/documentation/examples/events" class="font-normal text-lg text-gray">Events</router-link></li>
        <li><router-link to="/documentation/examples/integration" class="font-normal text-lg text-gray">Integration</router-link></li>
        <li><router-link to="/documentation/examples/lifecycle" class="font-normal text-lg text-gray">Lifecycle</router-link></li>
        <li><router-link to="/documentation/examples/methods" class="font-normal text-lg text-gray">Methods</router-link></li>
        <li><router-link to="/documentation/examples/mounting-options" class="font-normal text-lg text-gray">Mounting Options</router-link></li>
        <li><router-link to="/documentation/examples/non-exported-fns" class="font-normal text-lg text-gray">Non-Exported Fns</router-link></li>
        <li><router-link to="/documentation/examples/plugins" class="font-normal text-lg text-gray">Plugins</router-link></li>
        <li><router-link to="/documentation/examples/props" class="font-normal text-lg text-gray">Props</router-link></li>
        <li><router-link to="/documentation/examples/router" class="font-normal text-lg text-gray">Router</router-link></li>
        <li><router-link to="/documentation/examples/spies-stubs-mocks" class="font-normal text-lg text-gray">Spies, Stubs, Mocks</router-link></li>
        <li><router-link to="/documentation/examples/template" class="font-normal text-lg text-gray">Template</router-link></li>
        <li><router-link to="/documentation/examples/vuex" class="font-normal text-lg text-gray">Vuex</router-link></li>
        <li><router-link to="/documentation/examples/watch" class="font-normal text-lg text-gray">Watch</router-link></li>
      </ul>
    </nav>
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'ExamplesIndex'
};
</script>

<style scoped>
  nav li {
    @apply mr-2;
  }
  nav li a {
    @apply inline-block w-48 mb-1 px-4 py-2 border border-solid rounded-full leading-normal tracking-wide text-center text-base text-white bg-blue-500 cursor-pointer;
  }
  nav li a.router-link-active,
  nav li a.active {
    @apply bg-transparent bg-blue-700;
  }
  nav li a:focus {
    @apply outline-none;
  }
  nav li a:hover {
    @apply bg-transparent bg-blue-700;
  }
  @media only screen and (min-width: 600px) {
    nav li {
      @apply ml-2;
    }
  }
</style>
