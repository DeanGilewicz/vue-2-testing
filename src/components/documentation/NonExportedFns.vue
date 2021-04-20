<template>
  <div>
    <section class="non-exported-fns mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Things To Consider</h2>
      <p class="mb-2">This approach should only be used when it adds value to test a function that has not been exported from the component under test.</p>
      <p class="mb-2">When component under test uses an imported method (e.g. from utils file) you can use this approach to confirm that this method is called as expected.</p>
      <p class="mb-2">Exported functions should not be tested using this approach since they are already available to import in your test directly.</p>
    </section>
    <section id="todo-non-exported-fns" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Todo Example</h2>
      <TestCodeWrapper
        :config="{
          describeBlock: {
            text: 'Todos',
            contextBlockOuter: {
              text: 'Methods',
              contextBlockInners: [
                {
                  text: 'handleSetAsyncTimeout',
                  itBlocks: [
                    {
                      text: 'should call mySetTimeout helper fn when invoked',
                      test: `Todos.__Rewire__('mySetTimeout', sinon.spy());
            const scope = {
              handleGetAsyncMessage: () => {}
            };
            Todos.methods.handleSetAsyncTimeout.call(scope);
            sinon.assert.calledOnceWithExactly(Todos.__get__('mySetTimeout'), window, 3000, scope.handleGetAsyncMessage);
            Todos.__ResetDependency__('mySetTimeout');`
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
              text: 'non-exported function in Vuex module',
              itBlocks: [
                {
                  text: 'transformation fn returns a formatted object with values uppercased',
                  test: `const nonExportedTransformationFn = vuexModule.__get__('transformationFn');
        const data = {a: 'thing 1', b: 'thing 2', c: 'thing 3'};
        expect(nonExportedTransformationFn(data)).to.eql({
          a: 'THING 1',
          b: 'THING 2',
          c: 'THING 3'
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
  name: 'NoExportedFns',
  components: {
    TestCodeWrapper
  }
};
</script>
