<template>
  <div>
    <section ref="container" class="lifecycle mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Things To Consider</h2>
      <p class="mb-2">Lifecycle hooks create side effects so ensuring these occur as expected can be important.</p>
      <p class="mb-2">Typical side effects include setting a non-reactive property, updating a reactive property's value, modifiying DOM elements or triggering a method.</p>
    </section>
    <section id="todo-lifecycle" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Todo Example</h2>
      <TestCodeWrapper
        :config="{
          describeBlock: {
            text: 'Todos',
            contextBlockOuter: {
              text: 'Lifecycle',
              contextBlockInners: [
                {
                  text: 'should dispatch getTodos event',
                  itBlocks: [
                    {
                      text: 'should emit custom event with payload when delete todo button exists and is clicked',
                      test: `const vuex = {
              $store: {
                dispatch: sinon.spy(),
                state: {
                  todos: []
                }
              }
            };
            Todos.created.call(vuex);
            sinon.assert.calledOnceWithExactly(vuex.$store.dispatch, 'getTodos');
            sinon.reset(vuex.$store.dispatch);`
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
      <TestCodeWrapper
        :config="{
          contextBlockInners: [
            {
              text: 'created',
              itBlocks: [
                {
                  text: 'should set the reactive data property code to JavaScript',
                  test: `Todos.created();
        expect(Todos.code).to.equal('JavaScript');`
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
              text: 'mounted',
              itBlocks: [
                {
                  text: 'should set height of containers to largest content size',
                  test: `Todos.mounted();
        expect(Todos.$refs.container.offsetHeight).to.equal(500);`
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
              text: 'beforeDestroy',
              itBlocks: [
                {
                  text: 'should reset reactive data property code to empty string',
                  test: `Todos.beforeDestroy();
        expect(Todos.code).to.equal('');`
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
              text: 'destroyed',
              itBlocks: [
                {
                  text: 'should trigger clean up method',
                  test: `Todos.destroyed();
        expect(Todos.emitted()['cleanUp'].length).to.equal(1);`
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
  name: 'Lifecycle',
  components: {
    TestCodeWrapper
  }
};
</script>
