<template>
  <div>
    <section class="router mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Things To Consider</h2>
      <p class="mb-2">When testing route changes triggered by a component, it can be useful to assert that the router method was invoked.</p>
      <p class="mb-2">In most instances, vue-router features should be mocked to allow you to test the component itself.</p>
      <p class="mb-2">Since routing by definition has to do with the overall structure of the application and involves multiple components, it is ideally tested via integration or end-to-end tests.</p>
    </section>
    <section id="todo-router" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Todo Example</h2>
      <TestCodeWrapper
        :config="{
          describeBlock: {
            text: 'Todos',
            contextBlockOuter: {
              text: 'Methods',
              contextBlockInners: [
                {
                  text: 'handleEditTodo',
                  itBlocks: [
                    {
                      text: 'should change route to edit specific todo url',
                      test: `const scope = {
              $router: {
                push: sinon.spy()
              }
            };
            Todos.methods.handleEditTodo.call(scope, defaultTodo);
            sinon.assert.calledOnceWithExactly(
              scope.$router.push,
              '/demo-app/123/edit'
            );
            sinon.reset(scope.$router.push);`
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
              text: 'router push',
              itBlocks: [
                {
                  text: 'should change route to my-url when myMethod called',
                  test: `const $router = {
          push: sinon.spy()
        };
        const wrapper = shallowMount(Component, {
          mocks: {
            $router
          }
        });
        wrapper.vm.myMethod();
        sinon.assert.calledOnceWithExactly(
          wrapper.vm.$router.push,
          '/my-url'
        );
        sinon.reset(wrapper.vm.$router.push);`
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
  name: 'Router',
  components: {
    TestCodeWrapper
  }
};
</script>
