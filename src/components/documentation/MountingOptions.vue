<template>
  <div>
    <section class="mounting-options mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Things To Consider</h2>
      <p class="mb-2">Vue Test Utils provides the ability to pass options when mounting or shallow mounting a component.</p>
      <p class="mb-2">The options object can contain any option that would be valid in a call to new Vue({ /* options */ }). These options will be merged with the component's existing options when mounted with mount or shallowMount.</p>
    </section>
    <section id="todo-mounting-options" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Todo Example</h2>
      <TestCodeWrapper
        :config="{
          describeBlock: {
            text: 'Todo',
            contextBlockOuter: {
              text: 'Template',
              contextBlockInners: [
                {
                  text: 'appearance',
                  itBlocks: [
                    {
                      text: 'should render an input-checkbox component when a todo exists',
                      test: `const wrapper = shallowMount(Todo, {
              propsData: {
                todo: {
                  id: 1
                }
              }
            });
            expect(wrapper.find('[data-test=todo-input-checkbox]').exists()).to.equal(true);`
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
      <p class="mb-2">There are many useful mounting options that are available and below are only a handful.</p>
      <TestCodeWrapper
        :config="{
          contextBlockOuter: {
            text: 'Template',
            contextBlockInners: [
              {
                text: 'appearance',
                itBlocks: [
                  {
                    text: 'should render section tag with Hello text when renderSectionTag has value of Hello',
                    test: `const wrapper = shallowMount(Component, {
            data() {
              return {
                renderSectionTag: Hello
              };
            }
          });
          expect(wrapper.find('[data-test=sectionTag]').text()).to.equal('Hello');`
                  }
                ]
              }
            ]
          }
        }"
      />
      <TestCodeWrapper
        :config="{
          contextBlockOuter: {
            text: 'Template',
            contextBlockInners: [
              {
                text: 'appearance',
                itBlocks: [
                  {
                    text: 'should render message when displayMessage is true',
                    test: `const wrapper = shallowMount(Component, {
            propsData: {
              displayMessage: true
            }
          });
          expect(wrapper.find('[data-test=message]').exists()).to.equal(true);`
                  }
                ]
              }
            ]
          }
        }"
      />
      <TestCodeWrapper
        :config="{
          contextBlockOuter: {
            text: 'Template',
            contextBlockInners: [
              {
                text: 'appearance',
                itBlocks: [
                  {
                    text: 'should render warning slot text when provided',
                    test: `const wrapper = shallowMount(Component, {
            slots: {
              warning: 'Warning Slot Content'
            }
          });
          expect(wrapper.text()).to.include('Warning Slot Content');`
                  }
                ]
              }
            ]
          }
        }"
      />
      <TestCodeWrapper
        :config="{
          contextBlockOuter: {
            text: 'Template',
            contextBlockInners: [
              {
                text: 'appearance',
                itBlocks: [
                  {
                    text: 'should render description when displayDescription computed property returns true',
                    test: `const wrapper = shallowMount(Component, {
            computed: {
              displayDescription: () => true
            }
          });
          expect(wrapper.find('[data-test=description]').exists()).to.equal(true);`
                  }
                ]
              }
            ]
          }
        }"
      />
      <TestCodeWrapper
        :config="{
          contextBlockOuter: {
            text: 'Template',
            contextBlockInners: [
              {
                text: 'appearance',
                itBlocks: [
                  {
                    text: 'should render button',
                    test: `const $router = {
            push: () => {}
          };
          const wrapper = shallowMount(Component, {
            mocks: {
              $router
            }
          });
          expect(wrapper.find('[data-test=button]').exists()).to.equal(true);`
                  }
                ]
              }
            ]
          }
        }"
      />
      <TestCodeWrapper
        :config="{
          contextBlockOuter: {
            text: 'Template',
            contextBlockInners: [
              {
                text: 'appearance',
                itBlocks: [
                  {
                    text: 'should render name element with person text',
                    test: `const localVue = createLocalVue();
          localVue.use(Vuex);
          const store = new Vuex.Store(state: { name: 'person' });
          const wrapper = shallowMount(Component, {
            store,
            localVue
          });
          expect(wrapper.find('[data-test=name]').text()).to.equal('person');`
                  }
                ]
              }
            ]
          }
        }"
      />
    </section>
  </div>
</template>

<script>
import TestCodeWrapper from '@/components/documentation/TestCodeWrapper';
export default {
  name: 'MountingOptions',
  components: {
    TestCodeWrapper
  }
};
</script>
