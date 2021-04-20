<template>
  <div>
    <section class="template mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Things To Consider</h2>
      <p class="mb-2">Testing the template can provide the most bang for buck since these tests are not as concerned with implementation details and are more closely aligned with how the user will see and interact with your applicaton.</p>
      <p class="mb-2">Template testing is concerned with the appearance of the DOM based on the applicaton state.</p>
      <p class="mb-2">
        There are several areas that can be tested including:
        <ul class="list-disc ml-5">
          <li>
            accessibility
            <ul class="list-disc mb-2 ml-4">
              <li>use of aria labels</li>
            </ul>
          </li>
          <li>
            appearance
            <ul class="list-disc mb-2 ml-4">
              <li>rendering of html elements and content based on data, props or computed properties</li>
            </ul>
          </li>
          <li>
            attributes
            <ul class="list-disc mb-2 ml-4">
              <li>whether certain attributes exist based on data, props or computed properties</li>
            </ul>
          </li>
          <li>
            slots
            <ul class="list-disc mb-2 ml-4">
              <li>rendering of slot content based on data, props or computed properties</li>
            </ul>
          </li>
          <li>
            states
            <ul class="list-disc mb-2 ml-4">
              <li>active, blur, focus</li>
            </ul>
          </li>
          <li>
            styles
            <ul class="list-disc mb-2 ml-4">
              <li>dynamically applied styles for html element based on data, props or computed properties</li>
            </ul>
          </li>
        </ul>
      </p>
    </section>
    <section id="todo-template" class="mt-4 md:mt-6 lg:mt-8">
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
                      text: 'should not render an input-checkbox component by default',
                      test: `const wrapper = shallowMount(Todo);
            expect(wrapper.find('[data-test=todo-input-checkbox]').exists()).to.equal(false);`
                    },
                    {
                      text: 'should render an input-checkbox component when a todo exists',
                      test: `const wrapper = shallowMount(Todo, {
              propsData: {
                todo: {
                  id: 1
                }
              }
            });
            expect(wrapper.find('[data-test=todo-input-checkbox]').exists()).to.equal(true)`
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
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Appearance</h3>
      <TestCodeWrapper
        :config="{
          contextBlockOuter: {
            text: 'Template',
            contextBlockInners: [
              {
                text: 'appearance',
                itBlocks: [
                  {
                    text: 'should render number of completed things',
                    test: `const localVue = createLocalVue();
          localVue.use(Vuex);
          const getters = {
            completedThings: () => 1
          };
          const store = new Vuex.Store({state: {}, getters});
          const wrapper = shallowMount(Todos, {
            store,
            localVue
          });
          expect(wrapper.find('[data-test=title]').text()).to.equal('1 Complete');`
                  }
                ]
              }
            ]
          }
        }"
      />
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Attributes</h3>
      <TestCodeWrapper
        :config="{
          contextBlockOuter: {
            text: 'Template',
            contextBlockInners: [
              {
                text: 'attributes',
                itBlocks: [
                  {
                    text: 'should disable text input when in a pending state',
                    test: `const state = {
            pending: true
          };
          const wrapper = shallowMount(Component);
          expect(wrapper.find('[data-test=text-input]').attributes('disabled')).to.equal('true');`
                  }
                ]
              }
            ]
          }
        }"
      />
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Slots</h3>
      <TestCodeWrapper
        :config="{
          contextBlockOuter: {
            text: 'Template',
            contextBlockInners: [
              {
                text: 'slots',
                itBlocks: [
                  {
                    text: 'should render footer slot when content provided',
                    test: `const wrapper = shallowMount(Component, {
            slots: {
              footer: 'Footer Slot Content'
            }
          });
          expect(wrapper.text()).to.equal('Footer Slot Content');`
                  }
                ]
              }
            ]
          }
        }"
      />
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Styles</h3>
      <TestCodeWrapper
        :config="{
          contextBlockOuter: {
            text: 'Template',
            contextBlockInners: [
              {
                text: 'styles',
                itBlocks: [
                  {
                    text: 'should render a background color inline style for input checkbox dynamically',
                    test: `const wrapper = shallowMount(Component, {
            computed: {
              dynamicStyle: () => ({backgroundColor: 'blue'})
            }
          });
          expect(wrapper.find('[data-test=input-checkbox]').attributes('style')).to.equal('background-color: blue;');`
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
  name: 'Template',
  components: {
    TestCodeWrapper
  }
};
</script>
