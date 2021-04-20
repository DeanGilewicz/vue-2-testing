<template>
  <div>
    <section class="events mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Things To Consider</h2>
      <p class="mb-2">Custom or default events that are not associated with component methods and are directly triggered can be tested independently.</p>
      <p class="mb-2">Otherwise these events should be tested inside of the context from which it is triggered.</p>
    </section>
    <section id="todo-events" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Todo Example</h2>
      <TestCodeWrapper
        :config="{
          describeBlock: {
            text: 'Todo',
            contextBlockOuter: {
              text: 'Events',
              contextBlockInners: [
                {
                  text: 'delete-todo',
                  itBlocks: [
                    {
                      text: 'should emit custom event with payload when delete todo button exists and is clicked',
                      test: `const wrapper = shallowMount(Todo, {
              propsData: {
                todo: {
                  id: 1
                }
              }
            });
            const wrapper = shallowMount(Todo, {
              propsData: {
                todo: {
                  id: 1
                }
              }
            });
            wrapper.find('[data-test=todo-delete-todo]').trigger('click');
            expect(wrapper.emitted()['delete-todo'].length).to.equal(1);
            expect(wrapper.emitted()['delete-todo'][0][0]).to.eql({id: 1});`
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
              text: 'custom-event',
              itBlocks: [
                {
                  text: 'should emit custom event when button is clicked',
                  test: `const wrapper = shallowMount(Component);
        wrapper.find('button').trigger('click');
        expect(wrapper.emitted()['custom-event'].length).to.equal(1);
        expect(wrapper.emitted()['custom-event'][0][0]).to.equal('expected payload');`
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
  name: 'Events',
  components: {
    TestCodeWrapper
  }
};
</script>
