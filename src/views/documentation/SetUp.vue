<template>
  <main class="set-up container mx-auto px-2 md:px-4 lg:px-6">
    <section class="title">
      <h1 class="text-2xl md:text-3xl lg:text-4xl text-center">Set Up</h1>
    </section>
    <section id="installation" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Installation</h2>
      <p class="mt-2">If your project was created using <a href="https://cli.vuejs.org/guide/" target="_blank" rel="noopener noreferrer" class="font-normal text-blue-400">Vue Cli</a> then your project will already have a <span class="text-green-500">tests</span> folder and necessary default <a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer" class="font-normal text-blue-400">npm packages</a>.</p>
      <p class="mt-2">If your project does not yet have a <span class="text-green-500">tests</span> folder then create one at the root level of the project. Cd into this folder and then use <a href="https://cli.vuejs.org/guide/" target="_blank" rel="noopener noreferrer" class="font-normal text-blue-400">Vue Cli</a> to create a new project selecting only options needed for testing. Once complete, you can delete application code (components) leaving only testing files.</p>
    </section>
    <section id="folder-structure" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Folder Structure</h2>
      <p class="mt-2 mb-2">The test folder structure should resemble the project <span class="text-green-500">src</span> hierarchy as close as possible.</p>
      <pre class="bg-black text-green-500">
        <code>
    // src
    src/components/atoms/MyCoolComponent.vue

    // tests
    tests/components/atoms/MyCoolComponent.spec.js
        </code>
      </pre>
    </section>
    <section id="testing-tools" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Testing Tools</h2>
      <p>The following tools provide us with the ability to perform a diverse set of tests.</p>
      <p>Take a look at your project's <span class="text-green-500">package.json</span> file to determine what tools are already present and install any you will need.</p>
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Test Runner / Environment</h3>
      <ul class="list-disc mt-2 ml-5">
        <li>This is something that creates a browser like environment for your tests to run in</li>
        <li>Examples are Karma, Jest, Mocha-Webpack etc</li>
      </ul>
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Testing Framework</h3>
      <ul class="list-disc mt-2 ml-5">
        <li>A way to structure and organize your tests</li>
        <li>Some frameworks come with runners/environments built in (such as Jest)</li>
        <li>Using Vue Cli you have the option to choose Mocha or Jest</li>
      </ul>
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Assertion Library</h3>
      <ul class="list-disc mt-2 ml-5">
        <li>This is what actually runs the test specs and determine whether a given condition is valid or not</li>
        <li>A popular assetion library is <a href="https://www.chaijs.com/" target="_blank" rel="noopener noreferrer" class="font-normal text-blue-400">Chai</a></li>
      </ul>
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Test Utilites / Plugins</h3>
      <ul class="list-disc mt-2 ml-5">
        <li>
          <span class="font-bold">Vue Test Utils</span>
          <ul class="list-disc mb-2 ml-4">
            <li>By default, one of the packages that <a href="https://cli.vuejs.org/guide/" target="_blank" rel="noopener noreferrer" class="font-normal text-blue-400">Vue Cli</a> will install for testing is <a href="https://vue-test-utils.vuejs.org/" target="_blank" rel="noopener noreferrer" class="font-normal text-blue-400">Vue Test Utils</a></li>
            <li>
              This package allows you to unit test Single File Components (SPCs) in Vue JS
              <ul class="list-disc mb-2 ml-4">
                <li>shallowMount - creates a wrapper that contains the mounted and rendered Vue component, but with stubbed child components</li>
                <li>mount - creates a wrapper that contains the mounted and rendered Vue component with no stubbed child components</li>
                <li>createLocalVue - returns a Vue class to add components, mixins and install plugins without polluting the global Vue class</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <span class="font-bold">Sinon</span>
          <ul class="list-disc mb-2 ml-4">
            <li><a href="https://sinonjs.org/" target="_blank" rel="noopener noreferrer" class="font-normal text-blue-400">Sinon</a> allows us to create standalone test spies, stubs and mocks that work with any unit testing framework</li>
            <li>
              Spies
              <ul class="list-disc mb-2 ml-4">
                <li>allows the unit test to that a small unit of code interacted with a dependency</li>
                <li>should be used for observation of functions</li>
              </ul>
            </li>
            <li>
              Stubs
              <ul class="list-disc mb-2 ml-4">
                <li>allows the unit test to control the return value of a function of a dependency.</li>
                <li>have all of the functionality that spies do but should be used when manipulation is needed</li>
              </ul>
            </li>
            <li>
              Mocks
              <ul class="list-disc mb-2 ml-4">
                <li>are stubs plus expectations expressed at once</li>
                <li>should not be used in set up hook since it includes expectations</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <section id="what-to-test-for" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">What To Test For</h2>
      <p class="mt-2">You should not test the Vue JS framework. There are already tests for this.</p>
      <p class="mt-2">You should test the different pieces of your application independently, how they interact with each other and how the application works as a whole.</p>
      <ul class="list-disc mt-2 ml-5">
        <li>
          <span class="font-bold">Static</span>
          <ul class="list-disc mb-2 ml-4">
            <li>our projects should include the use of <a href="https://eslint.org/" target="_blank" rel="noopener noreferrer" class="font-normal text-blue-400">ESLint</a> and specically have installed the eslint-config-havue</li>
            <li>our projects can also decide whether or not to perform static type analysis using a tool such as <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" class="font-normal text-blue-400">TypeScript</a></li>
          </ul>
        </li>
        <li>
          <span class="font-bold">Unit</span>
          <ul class="list-disc mb-2 ml-4">
            <li>should test one component in isolation</li>
            <li>should mock imported components</li>
            <li>can test whether other imported components exist but not what occurs inside of them</li>
            <li>
              <a href="https://vue-test-utils.vuejs.org/" target="_blank" rel="noopener noreferrer" class="font-normal text-blue-400">Vue Test Utils</a> shallow mount should be used when rendering the component template (DOM):
              <ul class="list-disc mb-2 ml-4">
                <li>any child components rendered by the component under test are automatically stubbed</li>
                <li>tests are faster since it doesn't need to update and render the entire component tree</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <span class="font-bold">Integration</span>
          <ul class="list-disc mb-2 ml-4">
            <li>can mock all or some imported components</li>
            <li>should mock API calls (authored determined response)</li>
            <li>should test interactions between parent and child(ren) component(s)</li>
            <li>assert expected behavior based on the main specific component you are testing</li>
            <li>
              <a href="https://vue-test-utils.vuejs.org/" target="_blank" rel="noopener noreferrer" class="font-normal text-blue-400">Vue Test Utils</a> mount should be used when rendering the component template (DOM) or child(ren) component template(s):
              <ul class="list-disc mb-2 ml-4">
                <li>will create an instance of every child component</li>
                <li>includes child components in the component tree</li>
                <li>includes its rendered output in the virtual DOM</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <span class="font-bold">End-To-End</span>
          <ul class="list-disc mb-2 ml-4">
            <li>use these tests to perform an automated complete flow as a user</li>
            <li>ideally, these tests should not mock anything</li>
            <li>can use a tool such as <a href="https://www.cypress.io/" target="_blank" rel="noopener noreferrer" class="font-normal text-blue-400">Cypress.io</a> or <a href="https://webdriver.io/" target="_blank" rel="noopener noreferrer" class="font-normal text-blue-400">Webdriver.io</a></li>
          </ul>
        </li>
      </ul>
    </section>
    <section id="running-tests" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Running Tests</h2>
      <p class="mt-2">Tests are ran using <span class="text-green-500">npm scripts</span>. To locate these scripts open up your project's package.json and look in the <span class="text-green-500">scripts</span> section.</p>
      <p class="mt-2">For example, in your terminal you can run <span class="text-green-500">npm run test:unit</span> which should kick off the unit tests.</p>
      <p class="mt-2">The test summary provided in the terminal will provide you with information on passing and failing tests.</p>
    </section>
    <section id="next-up" class="mt-4 md:mt-6 lg:mt-8">
      Lets now take a look at how we should structure our <router-link to="/documentation/structure" class="font-normal text-base text-blue-400">tests</router-link>.
    </section>
  </main>
</template>

<script>
export default {
  name: 'SetUp'
};
</script>
