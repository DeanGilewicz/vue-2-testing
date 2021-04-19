<template>
  <main class="home container mx-auto px-2 md:px-4 lg:px-6">
    <section class="title">
      <h1 class="text-2xl md:text-3xl lg:text-4xl text-center text-center">{{ $getConstant('APP_PRETTY_NAME') }}</h1>
    </section>
    <section id="overview" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Overview</h2>
      <p class="mt-2">Welcome to Vue 2 JS Testing.</p>
      <p class="mt-2">This website provides information to aid in effectively writing tests for your application. Although, the specific technologies used may vary from your own testing frameworks and tools of choice, the concepts should be transferable.</p>
      <p class="mt-2">The hope is that you will gain more familiarity with testing, and the possible structure that can be used to help increase confidence in testing your application code.</p>
      <p class="mt-2">It is not expected that all test examples be implemented in your application but rather this should be used as a resource to help you determine what to test and how to go about doing so.</p>
    </section>
    <section id="how-to-use" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">How To Use</h2>
      <p class="mt-2">This website currently provides documentation concerning:</p>
      <ul class="list-disc mt-2 ml-5">
        <li>Test Set Up</li>
        <li>Test Structure</li>
        <li>Test Examples</li>
        <li>Test Resources</li>
      </ul>
      <p class="mt-2">and a Todo Application showcasing a variety of tests.</p>
    </section>
    <section id="what-now" class="mt-4 md:mt-6 lg:mt-8">
      <p>To learn more about testing, visit the <router-link to="/documentation/introduction" class="font-normal text-base">documentation</router-link>.</p>
      <p>To view and use the todo application visit the <router-link to="/demo-app" class="font-normal text-base">demo app</router-link>.</p>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Home'
};
</script>
