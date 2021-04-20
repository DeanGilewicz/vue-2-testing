<template>
  <main class="structure container mx-auto px-2 md:px-4 lg:px-6">
    <section class="title">
      <h1 class="text-2xl md:text-3xl lg:text-4xl text-center">Structure</h1>
    </section>
    <section id="considerations" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Considerations</h2>
      <p class="mt-2">Before creating a test file it is important you first consider what you are trying to test and whether this is best suited for a unit, integration or end-to-end test.</p>
      <p class="mt-2">These decisions will shape your test set up and what "tools" you may or may not need to include to achieve your desired outcome.</p>
      <p class="mt-2">You'll also have a clearer picture of what you may need to import and / or mock.</p>
    </section>
    <section id="test-structure" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Test Structure</h2>
      <p class="mt-2">Here are two mnemonics you can consider when setting up your tests:</p>
      <ul class="list-disc mt-2 ml-5">
        <li>AAA - Arrange, Act, Assert</li>
        <li>GWT - Given, When, Then</li>
      </ul>
      <p class="mt-2">To aid your test structure we have devised the following standard conventions:</p>
      <h3 class="mt-4 mb-2 text-base md:text-lg lg:text-xl">Describe Block</h3>
      <ul class="list-disc mt-2 ml-5 mb-2">
        <li>Ideally, there should be one describe block per test file</li>
        <li>The name of the component defined in the Vue component's export default should be used in the describe block</li>
        <li>If a component name is not defined in the Vue file then define it. This will allow for better debugging in the Vue dev tools when looking through the component tree</li>
      </ul>
      <pre class="bg-black text-green-500">
        <code>
    // Vue file - MyCoolComponent.vue
    export default {
      name: "MyCoolComponent"
    };

    // Test file - MyCoolComponent.spec.js
    describe("MyCoolComponent", () => { /*...*/ });
        </code>
      </pre>
      <h3 class="mt-4 mb-2 text-base md:text-lg lg:text-xl">Context Block</h3>
      <ul class="list-disc mt-2 ml-5 mb-2">
        <li>This is used to better organize the tests for the component defined in the describe block that you are testing</li>
        <li>
          We make use of two context blocks:
          <ul class="list-disc ml-4">
            <li>The first is used to define the area of code you are testing, for example <span class="text-green-500">Computed</span> or <span class="text-green-500">Methods</span></li>
            <li>The second is a nested context used to define the name of the specific code block you are testing, for example naming the specific computed property you are testing, such as <span class="text-green-500">getUpperCaseName</span></li>
          </ul>
        </li>
        <li>Using two context blocks provides us with better code readability in the terminal as well as effective code folding in IDEs</li>
      </ul>
      <pre class="bg-black text-green-500">
        <code>
    // Vue file - MyCoolComponent.vue
    export default {
      name: "MyCoolComponent",
      data() {
        return {
          name: "",
          age: 50
        };
      },
      computed: {
        getUpperCaseName() {
          if (this.name) {
            return this.name.toUpperCase();
          }
          return "";
        },
        ageInOneYear() {
          return this.age + 1;
        }
      },
      methods: {
        handleClick() { /*...*/ }
      }
    };

    // Test file - MyCoolComponent.spec.js
    describe("MyCoolComponent", () => {
      context("Computed", () => {
        context("getUpperCaseName", () => { /*...*/ });
        context("ageInOneYear", () => { /*...*/ });
      });
      context("Methods", () => {
        context("handleClick", () => { /*...*/ });
      });
    });
        </code>
      </pre>
      <h3 class="mt-4 mb-2 text-base md:text-lg lg:text-xl">It Block</h3>
      <ul class="list-disc mt-2 ml-5 mb-2">
        <li>Where you perform individual tests</li>
        <li>The description should clearly describe the test and not test multiple things at once</li>
      </ul>
      <pre class="bg-black text-green-500">
        <code>
    // Vue file - MyCoolComponent.vue
    export default {
      name: "MyCoolComponent",
      data() {
        return {
          name: "",
          age: 50
        };
      },
      computed: {
        getUpperCaseName() {
          if (this.name) {
            return this.name.toUpperCase();
          }
          return "";
        },
        ageInOneYear() {
          return this.age + 1;
        }
      },
      methods: {
        handleClick() { /*...*/ }
      }
    };

    // Test file - MyCoolComponent.spec.js
    describe("MyCoolComponent", () => {
      context("Computed", () => {
        context("getUpperCaseName", () => {
          it("should return an empty string when name data value does not exist", () => {
            /*...*/
          });
          it("should return an uppercased name when name data value exists", () => {
            /*...*/
          });
        });
        context("ageInOneYear", () => { /*...*/ });
      });
      context("Methods", () => {
        context("handleClick", () => { /*...*/ });
      });
    });
        </code>
      </pre>
    </section>
    <section id="test-hooks" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Test Hooks</h2>
      <p class="mt-2">For each context block of tests consider the commonalities between tests and whether it makes sense to move that code to a test hook to avoid bloating tests.</p>
      <p class="mt-2">There are 4 test hooks that can be used:</p>
      <ul class="list-disc mt-2 ml-5">
        <li>
          <span class="font-bold">before</span>
          <ul class="list-disc mb-2 ml-4">
            <li>runs once before the first test in the associated block</li>
          </ul>
        </li>
        <li>
          <span class="font-bold">beforeEach</span>
          <ul class="list-disc mb-2 ml-4">
            <li>runs before each test in the associated block</li>
          </ul>
        </li>
        <li>
          <span class="font-bold">afterEach</span>
          <ul class="list-disc mb-2 ml-4">
            <li>rruns after each test in the associated block</li>
          </ul>
        </li>
        <li>
          <span class="font-bold">after</span>
          <ul class="list-disc mb-2 ml-4">
            <li>runs once after the last test in the associated block</li>
          </ul>
        </li>
      </ul>
      <p>Avoid mutating state and instead create a copy of the current state to use as input for your tests to avoid mutated state leaking across tests.</p>
      <p>Attention should be made to tear down any test set up (e.g. return any modified state to original non-modified state) once the test(s) using such input has been ran.</p>
    </section>
    <section id="test-sequence" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Test Sequence</h2>
      <p class="mt-2">Your <span class="text-green-500">it</span> blocks should be constructed in the following order:</p>
      <ol class="list-decimal mt-2 ml-5 mb-2">
        <li>Test default expectation first whether that is a default value returned from a computed property, default behavior from a method, or default elements rendered in the DOM etc</li>
        <li>Test conditional cases (if any) resulting in default value returned</li>
        <li>Test conditional cases (if any) resulting in non-default value returned</li>
      </ol>
      <pre class="bg-black text-green-500">
        <code>
    // Vue file - MyCoolComponent.vue
    export default {
      name: "MyCoolComponent",
      data() {
        return {
          name: "",
          age: ""
        };
      },
      computed: {
        happyAnniversaryText() {
          if (this.name && this.age) {
            return `Hello ${this.name}, you are ${age} today`;
          }
          return '';
        }
      }
    };

    // Test file - MyCoolComponent.spec.js
    describe("MyCoolComponent", () => {
      context("Computed", () => {
        context("happyAnniversaryText", () => {
          it("should return an empty string when name data value does not exist", () => { /*...*/ });
          it('should return an empty string when age data value does not exist', () => { /*...*/ });
          it('should return an empty string when name data value does exist and age data value does not exist', () => { /*...*/ });
          it('should return an empty string when name data value does not exist and age data value does exist', () => { /*...*/ });
          it('should return an anniversary greeting when name data value exists and age data value exists', () => { /*...*/ });
        });
      });
    });
        </code>
      </pre>
      <p class="mt-2">When testing XHR requests be sure to test request payloads and / or url params along with success and failure responses.</p>
    </section>
    <section id="test-identifiers" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="text-xl md:text-2xl lg:text-3xl">Test Identifiers</h2>
      <p class="mt-2">HA uses a specific attribute to help target elements and / or specific blocks of code that is rendered in the DOM.</p>
      <p class="mt-2">When writing tests it is helpful to include at least one main test identifier in the component's template using this <span class="text-green-500">data-test</span> attribute.</p>
      <p class="mt-2">The <span class="text-green-500">data-test</span> attribute should be used in the following ways:</p>
      <ul class="list-disc mt-2 ml-5">
        <li>
          <span class="font-bold">On the root component element</span>
          <ul class="list-disc mb-2 ml-4">
            <li>consider setting a default prop for the value of this data attribute so parent components have the opportunity to override when rendering this component multiple times on a page</li>
          </ul>
        </li>
        <li>
          <span class="font-bold">On parent element of a slot</span>
          <ul class="list-disc mb-2 ml-4">
            <li>slot elements get replaced when rendered so to target a slot you can use this attribute on a parent element</li>
          </ul>
        </li>
        <li>
          <span class="font-bold">On child elements</span>
          <ul class="list-disc mb-2 ml-4">
            <li>when you are unable to access the element through the root element or distinguish between two elements that have the same tag for instance</li>
          </ul>
        </li>
        <li>
          <span class="font-bold">On imported components</span>
          <ul class="list-disc mb-2 ml-4">
            <li>this can help when unit testing and when only being concerned with whether a component is rendered in the DOM or not</li>
          </ul>
        </li>
      </ul>
      <pre class="bg-black text-green-500">
        <code>
    // Vue file - MyCoolComponent.vue
    {{ templateExample }}
        </code>
      </pre>
    </section>
    <section id="next-up" class="mt-4 md:mt-6 lg:mt-8">
      Lets now take a look at how to test with some <router-link to="/documentation/examples/computed" class="font-normal text-base text-blue-400">examples</router-link>.
    </section>
  </main>
</template>

<script>
export default {
  name: 'Structure',
  data() {
    return {
      templateExample: `<template>
      <div :data-test="rootDataTestValue" class="my-cool-component">
        <div>
          <span>{{ name }}</span>
          <span v-if="name.first" data-test="company-rating">{{ name.first }}</span>
          <anotherComponent data-test="another-component">
            <div data-test="slot-default" v-if="age">
              <slot>Hey look at me!</slot>
            </div>
          </anotherComponent>
        </div>
      </div>
    </template>`
    };
  }
};
</script>
