<template>
  <header class="header md:flex md:justify-between mb-4 px-2 md:px-4 lg:px-6 border-b border-solid border-gray-350 text-lg text-gray">
    <section>
      <router-link class="text-gray-600" to="/">
        <img
          alt="Vue JS"
          class="header-logo h-6 my-4 mr-6 md:mt-6 md:mr-8 md:h-8"
          data-test="logo"
          src="@/assets/logo.png"
        />
      </router-link>
    </section>
    <section>
      <ul class="nav flex flex-col sm:flex-row mt-6">
        <li class="inline-block mr-12">
          <router-link class="font-normal text-lg leading-loose" data-test="router-link-demo" to="/demo-app" :class="[isTodoAppRoute ? 'text-dark' : 'text-gray']">Application</router-link>
        </li>
        <li class="inline-block mr-12">
          <router-link class="font-normal text-lg leading-loose" data-test="router-link-contribute" to="/contribute" :class="[isContributeRoute ? 'text-dark' : 'text-gray']">Contribute</router-link>
        </li>
        <li class="inline-block">
          <router-link class="font-normal text-lg leading-loose" data-test="router-link-documentation" to="/documentation/introduction" :class="[isDocumentationRoute ? 'text-dark' : 'text-gray']">Documentation</router-link>
        </li>
      </ul>
    </section>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    isContributeRoute() {
      const routePath = this.$route.path;
      if (routePath && routePath.includes('contribute')) {
        return true;
      }
      return false;
    },
    isDocumentationRoute() {
      const routePath = this.$route.path;
      if (routePath && routePath.includes('documentation')) {
        return true;
      }
      return false;
    },
    isTodoAppRoute() {
      const routePath = this.$route.path;
      if (routePath && routePath.includes('demo')) {
        return true;
      }
      return false;
    }
  }
};
</script>
