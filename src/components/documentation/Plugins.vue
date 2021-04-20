<template>
  <div>
    <section class="plugins mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Things To Consider</h2>
      <p class="mb-2">Plugins can and should be mocked.</p>
      <p class="mb-2">The application's use of the plugin should be tested and not the plugin itself.</p>
    </section>
    <section id="todo-plugins" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Todo Example</h2>
      <TestCodeWrapper
        :config="{
          describeBlock: {
            text: 'DemoApp',
            contextBlockOuter: {
              text: 'Template',
              contextBlockInners: [
                {
                  text: 'appearance',
                  itBlocks: [
                    {
                      text: 'should render todo app pretty name by default',
                      test: `const localVue = createLocalVue();
            localVue.use(constantsPlugin);
            const wrapper = shallowMount(DemoApp, {
              localVue
            });
            expect(wrapper.find('[data-test=todo-app-title]').text()).to.equal(constantsPlugin.__get__('CONSTANTS').TODO_PRETTY_NAME);`
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
              text: 'prototype',
              itBlocks: [
                {
                  text: 'should fire tracking events',
                  test: `const localVue = createLocalVue();
        localVue.use(TrackingPlugin);
        localVue.prototype.$logEvent = sinon.spy();
        localVue.prototype.$trackLinkWrapper = sinon.spy();
        localVue.prototype.$pushToGtmDataLayer = sinon.spy();
        const wrapper = shallowMount(TestComponent, { localVue });
        wrapper.vm.fireTracking();
        sinon.assert.calledOnceWithExactly(
          localVue.prototype.$logEvent,
          'event12345',
          'a log event'
        );
        const trackLinkWrapperSpy = localVue.prototype.$trackLinkWrapper.getCall(0);
        expect(trackLinkWrapperSpy.firstArg).to.equal('my custom link event');
        expect(trackLinkWrapperSpy.args[1]).to.equal('o');
        sinon.assert.calledOnceWithExactly(
          localVue.prototype.$pushToGtmDataLayer,
          {
            thisEvent: 'todo submit'
          }
        );
        sinon.reset(localVue.prototype.$logEvent);
        sinon.reset(localVue.prototype.$trackLinkWrapper);
        sinon.reset(localVue.prototype.$pushToGtmDataLayer);`
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
  name: 'Plugins',
  components: {
    TestCodeWrapper
  }
};
</script>
