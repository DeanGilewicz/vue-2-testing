<template>
  <main class="introduction container mx-auto px-2 md:px-4 lg:px-6">
    <section class="title">
      <h1 class="text-2xl md:text-3xl lg:text-4xl text-center">Introduction</h1>
    </section>
    <section id="what-is-testing" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">What Is Testing?</h2>
      <p class="mt-2">Testing is the process of evaluating an application or its component(s) with the intent to find whether it satisfies the specified requirements or not.</p>
      <p class="mt-2">In other words, you could say testing is executing an application in order to identify any gaps, errors, or missing requirements in contrary to the actual requirements.</p>
    </section>
    <section id="why-test" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Why Should I Test?</h2>
      <p class="mt-2">To avoid users encounting errors with your application that can:</p>
      <ul class="list-disc mt-2 ml-5">
        <li>Cause financial harm</li>
        <li>Decrease user trust</li>
        <li>Halt feature development</li>
      </ul>
      <p class="mt-2">As a developer we should release code that:</p>
      <ul class="list-disc mt-2 ml-5">
        <li>Works</li>
        <li>Doesn't introduce bugs</li>
        <li>Doesn't break other code</li>
        <li>Is maintainable and understandable</li>
      </ul>
      <p class="mt-2">Only through testing can we have confidence in our code.</p>
    </section>
    <section id="testing-approaches" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Testing Approaches</h2>
      <p class="mt-2">The following approaches can be used independently or in tandem to approach testing from both perspectives.</p>
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Test Driven Development (TDD)</h3>
      <ul class="list-disc mt-2 ml-5">
        <li>The process by which you write tests before coding then implement the minimum amount of code necessary to pass the test. You can then refactor and repeat the process</li>
        <li>This can provide broad test coverage of your application and give you the confidence to make changes to your application as it grows because you can see previous tests passing and trust that your changes have not broken anything</li>
      </ul>
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Behavior Driven Development (BDD)</h3>
      <ul class="list-disc mt-2 ml-5">
        <li>The process by which the focus of tests is on behavior, rather than implementation, from a user's expected experience</li>
        <li>The tests are not concerned with how the application reaches a result but rather what the result should be</li>
        <li>This can provide broad test coverage of your application and give you the confidence to make changes to your application as it grows because you can see previous tests passing and trust that your changes have not broken anything</li>
      </ul>
    </section>
    <section id="testing-types" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Testing Types</h2>
      <p class="mt-2">There are multiple layers to testing that will increase confidence in your application code:</p>
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Structural Testing</h3>
      <p>Structural testing is a category of testing in which the internal structures of the system under test is known to the test.</p>
      <p>Static, unit and integration tests typically fall into this category since both require an understanding of the application's internal structure.</p>
      <ul class="list-disc mt-2 ml-5">
        <li>
          <span class="font-bold">Static</span>
          <ul class="list-disc mb-2 ml-4">
            <li>Use a static type system and a linter to capture basic errors like typos and syntax</li>
          </ul>
        </li>
        <li>
          <span class="font-bold">Unit</span>
          <ul class="list-disc mb-2 ml-4">
            <li>The testing of individual units of code in isolation from the rest of the application</li>
            <li>All values should be stubbed or mocked, and the unit test runs solely in memory</li>
            <li>Write effective unit tests that target the critical behavior and functionality of your application</li>
          </ul>
        </li>
        <li>
          <span class="font-bold">Integration</span>
          <ul class="list-disc mb-2 ml-4">
            <li>Builds on the unit test by testing multiple pieces of the application together</li>
            <li>Develop integration tests to audit your application holistically and make sure everything works together correctly in harmony</li>
          </ul>
        </li>
      </ul>
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Functional Testing</h3>
      <p>Functional testing is a category of testing in which the internal structures of the system under test is not known to the test.</p>
      <p>End-to-end tests typically fall into this category since these tests aren't coupled to implementation details but rather the functionality of the whole application.</p>
      <ul class="list-disc mt-2 ml-5">
        <li>
          <span class="font-bold">End-To-End</span>
          <ul class="list-disc mb-2 ml-4">
            <li>These are functional tests involving automated interaction testing of critical paths in your application</li>
          </ul>
        </li>
      </ul>
      <p class="mt-6">Functional tests without unit tests can never provide deep enough code coverage to be confident that you have an adequate regression safety net for continuous delivery.</p>
      <p class="mt-2">Unit tests provide code coverage depth and functional tests provide user requirement test case coverage breadth.</p>
    </section>
    <section id="next-up" class="mt-4 md:mt-6 lg:mt-8">
      Let's dive in to the <router-link to="/documentation/set-up" class="font-normal text-base text-blue-400">set up</router-link>.
    </section>
  </main>
</template>

<script>
export default {
  name: 'Introduction'
};
</script>
