<template>
  <main class="contribute container mx-auto px-2 md:px-4 lg:px-6">
    <section class="title">
      <h1 class="text-2xl md:text-3xl lg:text-4xl text-center text-center">Contributing To Project</h1>
    </section>
    <section id="overview" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Overview</h2>
      <p class="mt-2">Thank you for being interested in the contributing to this project.</p>
      <p class="mt-2">We really appreciate you being willing to improve this project and ensure it's continued usefulness for our developers.</p>
      <p class="mt-2">In an effort to keep this project more maintainable, we have devised the guidelines below.</p>
    </section>
    <section id="updating-information" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Informational Updates</h2>
      <p class="mt-2">When your merge request is only concerned with the following modifications:</p>
      <ul class="list-disc mt-2 ml-5">
        <li>Typo correction(s)</li>
        <li>Text updates to better clarify documentation</li>
        <li>Addition of text to provide further context</li>
      </ul>
      <p class="mt-2">All current tests must pass before being considered for merging.</p>
    </section>
    <section id="updating-tests-for-an-existing-feature" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Updating Tests For An Existing Feature</h2>
      <p class="mt-2">When your merge request is concerned with any of the following:</p>
      <ul class="list-disc mt-2 ml-5">
        <li>Updates to existing test(s) to improve code coverage</li>
        <li>Refactor of existing test(s) to better represent testing best practices</li>
        <li>Creation of new tests to improve code coverage</li>
      </ul>
      <p class="mt-2">All current and any new tests must pass before being considered for merging.</p>
      <p class="mt-2">New test code is expected to be made inside of the application's tests folder.</p>
      <p class="mt-2">Code coverage must not drop below threshold and should ideally be improved with the inclusion of this merge request.</p>
      <p class="mt-2">Documentation should be updated to reflect this change and / or be modified to include any example implementations as appropriate from this merge request.</p>
      <p class="mt-2">Any new testing libraries should be documented on the resources page with appropriate comments.</p>
    </section>
    <section id="creating-and-testing-a-new-feature" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Creating and Testing A New Feature</h2>
      <p class="mt-2">When your merge request is concerned with any of the following:</p>
      <ul class="list-disc mt-2 ml-5">
        <li>Creating a new feature</li>
        <li>Testing a new feature</li>
      </ul>
      <p class="mt-2">New features will not be merged unless there are comprehensive tests in place that test this new feature.</p>
      <p class="mt-2">All current and any new tests must pass before being considered for merging.</p>
      <p class="mt-2">Code coverage must not drop below threshold and should ideally be improved with the inclusion of this merge request.</p>
      <p class="mt-2">New feature code is expected to be made inside of the application's <span class="text-green-500">src</span> folder.</p>
      <p class="mt-2">New test code is expected to be made inside of the application's <span class="text-green-500">tests</span> folder.</p>
      <p class="mt-2">Documentation should be updated to reflect this change and/or be modified to include any example implementations as appropriate from this merge request.</p>
      <p class="mt-2">Any new testing libraries should be documented on the resources page with appropriate comments.</p>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Contribute'
};
</script>
