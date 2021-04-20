<template>
  <div>
    <section class="integration mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Things To Consider</h2>
      <p class="mb-2">Writing integration tests is more involved than unit tests, and will take longer to run but should provide valuable confidence in your application since integration tests cover how related code interacts with each other.</p>
      <p class="mb-2">It is up to you to decide when to import and use components and / or stores and when to mock them.</p>
      <p class="mb-2">Integration tests are useful when testing parent and child component interaction and associated state behavior.</p>
    </section>
    <section id="todo-integration" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Todo Example</h2>
      <TestCodeWrapper
        :config="{
          describeBlock: {
            text: 'Todos',
            contextBlockOuter: {
              text: 'Create a todo',
              contextBlockInners: [
                {
                  text: '',
                  itBlocks: [
                    {
                      text: 'should change an incomplete todo into a complete todo when the todo\'s checkbox is clicked',
                      test: `const modifiedTodosModule = cloneDeep(TodosModule);
            modifiedTodosModule.actions.getTodos = () => {};
            modifiedTodosModule.state = [
              {...defaultTodo, name: 'the todo'},
              {...defaultTodo, id: 456}
            ];
            const wrapper = mount(Todos, {
              localVue,
              store: new Vuex.Store({
                modules: {
                  todos: modifiedTodosModule,
                  stateMachine: {}
                }
              })
            });
            const incompleteHeader = wrapper.find('[data-test=todo-heading-incomplete]');
            const completeHeader = wrapper.find('[data-test=todo-heading-complete]');
            expect(incompleteHeader.text()).to.equal('Outstanding (2)');
            expect(completeHeader.text()).to.equal('Completed (0)');
            await wrapper
              .find('[data-test=todo-incomplete] [data-test=todo-input-checkbox]')
              .trigger('click', {todo: modifiedTodosModule.state[0]});
            await wrapper.vm.$nextTick();
            expect(incompleteHeader.text()).to.equal('Outstanding (1)');
            expect(completeHeader.text()).to.equal('Completed (1)');`
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
              text: 'delete data',
              itBlocks: [
                {
                  text: 'clicking button deletes thing',
                  test: `const wrapper = mount(Component, {
          localVue,
          store: new Vuex.Store({
            modules: {
              theModule
            }
          });
          const thing = wrapper.find('[data-test=thing]');
          expect(thing.exists()).to.equal(true);
          await wrapper.find('[data-test=button-delete]').trigger('click');
          await wrapper.vm.$nextTick();
          expect(thing.exists()).to.equal(false);
        });`
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
  name: 'Integration',
  components: {
    TestCodeWrapper
  }
};
</script>
