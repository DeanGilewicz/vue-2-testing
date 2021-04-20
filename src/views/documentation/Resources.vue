<template>
  <main class="resources container mx-auto px-2 md:px-4 lg:px-6">
    <section class="title">
      <h1 class="text-2xl md:text-3xl lg:text-4xl text-center">Resources</h1>
    </section>
    <section id="resource-frameworks" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Test Frameworks</h2>
      <ul class="list-disc mt-2 ml-5">
        <li><a href="https://www.cypress.io/" target="_blank" rel="noopener noreferrer" class="font-normal text-base">Cypress</a></li>
        <li><a href="https://jestjs.io/" target="_blank" rel="noopener noreferrer" class="font-normal text-base">Jest</a></li>
        <li><a href="https://mochajs.org/" target="_blank" rel="noopener noreferrer" class="font-normal text-base">Mocha</a></li>
      </ul>
    </section>
    <section id="resource-libraries" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Test Libraries</h2>
      <ul class="list-disc mt-2 ml-5">
        <li>
          <a href="https://www.npmjs.com/package/axios-mock-adapter" target="_blank" rel="noopener noreferrer" class="font-normal text-base">Axios Mock Adapter</a>
          <ul class="list-disc ml-5">
            <li>Export a single instance of MockAdapter to use in each test file</li>
            <li>Creating a separate instance in each test file can lead to race conditions</li>
          </ul>
        </li>
        <li>
          <a href="https://www.chaijs.com/" target="_blank" rel="noopener noreferrer" class="font-normal text-base">Chai</a>
          <ul class="list-disc ml-5">
            <li>We typically use the expect assertion style</li>
          </ul>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/flush-promises" target="_blank" rel="noopener noreferrer" class="font-normal text-base">Flush Promises</a>
          <ul class="list-disc ml-5">
            <li>This can be used to fulfill any promises should your test assert on logic that occurs after an async promise based operation (resolve or reject)</li>
          </ul>
        </li>
        <li>
          <a href="https://istanbul.js.org/" target="_blank" rel="noopener noreferrer" class="font-normal text-base">Istanbul</a>
          <ul class="list-disc ml-5">
            <li>Istanbul instruments ES5 and ES2015+ JavaScript code with line counters, so that you can track your unit-test coverage</li>
            <li>The nyc command-line-client for Istanbul is useful and allows for custom set up</li>
          </ul>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/babel-plugin-rewire" target="_blank" rel="noopener noreferrer" class="font-normal text-base">Rewire</a>
          <ul class="list-disc ml-5">
            <li>
              Rewire adds a default export to any module which does not already have one
              <ul class="list-disc mb-2 ml-4">
                <li>To avoid issues with Vuex ensure you have an explicit default export in your module</li>
              </ul>
            </li>
            <li>
              Adds a special getter and setter to modules to enable the ability to:
              <ul class="list-disc mb-2 ml-4">
                <li>inject mocks for other modules or globals like process</li>
                <li>inspect private variables</li>
                <li>override varibles within the module</li>
              </ul>
            </li>
            <li>Non-exported functions must be called somewhere in the exported function (or module) for rewire to be able to access it</li>
          </ul>
        </li>
        <li>
          <a href="https://sinonjs.org/" target="_blank" rel="noopener noreferrer" class="font-normal text-base">Sinon</a>
          <ul class="list-disc ml-5">
            <li>Sinon provides the ability to add standalone test spies, stubs and mocks</li>
          </ul>
        </li>
        <li>
          <a href="https://vue-test-utils.vuejs.org/" target="_blank" rel="noopener noreferrer" class="font-normal text-base">Vue Test Utils</a>
          <ul class="list-disc ml-5">
            <li>The official unit-test utility library for Vue JS enabling the ability to test single file components</li>
          </ul>
        </li>
      </ul>
    </section>
    <section id="resource-libraries" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Test Examples</h2>
      <ul class="list-disc mt-2 ml-5">
        <li><a href="https://lmiller1990.github.io/vue-testing-handbook/" target="_blank" rel="noopener noreferrer" class="font-normal text-base">Vue Test Handbook</a></li>
      </ul>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Resources'
};
</script>
