<template>
  <div>
    <section class="computed mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Things To Consider</h2>
      <p class="mb-2">Computed properties should be pure functions and therefore have no side effects. This means these can be tested directly with assertions being made against the returned value.</p>
      <p class="mb-2">Computed properties can be mocked when testing the result of the returned value in another context.</p>
    </section>
    <section id="todo-computed" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Todo Example</h2>
      <TestCodeWrapper
        :config="{
          describeBlock: {
            text: 'Todo',
            contextBlockOuter: {
              text: 'Computed',
              contextBlockInners: [
                {
                  text: 'doesTodoExist',
                  itBlocks: [
                    {
                      text: 'should return false by default',
                      test: `const state = {};
            expect(Todo.computed.doesTodoExist.call(state)).to.equal(false);`
                    },
                    {
                      text: 'should return true when todo exists and is not an empty object',
                      test: `const state = {todo: {id: 1}};
            expect(Todo.computed.doesTodoExist.call(state)).to.equal(true);`
                    }
                  ]
                }
              ]
            }
          }
        }"
      />
    </section>
    <section id="todo-implementations" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Implementations</h2>
      <p class="mb-2">When testing computed properties in isolation (pure function) there is no need to render the Vue component in which the computed property is defined.</p>
      <p class="mb-2">Implementing your tests this way improves the time it takes for these tests to complete.</p>
      <TestCodeWrapper
        :config="{
          contextBlockInners: [
            {
              text: 'computedObject',
              itBlocks: [
                {
                  text: 'should return empty object by default',
                  test: `const state = {};
        expect(component.computed[computedName].call(state)).to.eql({});`
                }
              ]
            }
          ]
        }"
      />
      <TestCodeWrapper
        :config="{
          contextBlockInners: [
            {
              text: 'computedArray',
              itBlocks: [
                {
                  text: 'should return empty array by default',
                  test: `const state = {};
        expect(component.computed[computedName].call(state)).to.eql([]);`
                }
              ]
            }
          ]
        }"
      />
      <TestCodeWrapper
        :config="{
          contextBlockInners: [
            {
              text: 'computedBoolean',
              itBlocks: [
                {
                  text: 'should return false by default',
                  test: `const state = {};
        expect(component.computed[computedName].call(state)).to.equal(false);`
                }
              ]
            }
          ]
        }"
      />
      <TestCodeWrapper
        :config="{
          contextBlockInners: [
            {
              text: 'computedString',
              itBlocks: [
                {
                  text: 'should return empty string by default',
                  test: `const state = {};
        expect(component.computed[computedName].call(state)).to.equal('');`
                }
              ]
            }
          ]
        }"
      />
      <TestCodeWrapper
        :config="{
          contextBlockInners: [
            {
              text: 'computedNumber',
              itBlocks: [
                {
                  text: 'should return 0 by default',
                  test: `const state = {};
        expect(component.computed[computedName].call(state)).to.equal(0);`
                }
              ]
            }
          ]
        }"
      />
    </section>
  </div>
</template>

<script>
import TestCodeWrapper from '@/components/documentation/TestCodeWrapper';
export default {
  name: 'Computed',
  components: {
    TestCodeWrapper
  }
};
</script>
