<template>
  <div>
    <section class="methods mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Things To Consider</h2>
      <p class="mb-2">Testing a method directly to determine it's direct behavior can be useful, especially when returning a value to caller.</p>
      <p class="mb-2">When methods contain side effects it can be useful to test inside of other contexts.</p>
    </section>
    <section id="todo-methods" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Todo Example</h2>
      <TestCodeWrapper
        :config="{
          describeBlock: {
            text: 'Todos',
            contextBlockOuter: {
              text: 'Methods',
              contextBlockInners: [
                {
                  text: 'setInitialNewTodo',
                  itBlocks: [
                    {
                      text: 'should return a Todo object by default when invoked',
                      test: `const scope = {
              generateRandomNumber: () => 123
            };
            expect(Todos.methods.setInitialNewTodo.call(scope)).eql({
              id: 123,
              name: '',
              completed: false
            });`
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
      <p class="mb-2">When testing methods in isolation there are times when there is no need to render the Vue component in which the method is defined.</p>
      <p class="mb-2">Implementing your tests this way improves the time it takes for these tests to complete.</p>
      <TestCodeWrapper
        :config="{
          contextBlockInners: [
            {
              text: 'methodCallingAnotherMethod',
              itBlocks: [
                {
                  text: 'should call another method with payload when invoked',
                  test: `const payload = {id: 123}
        const scope = {
          anotherMethod: sinon.spy()
        };
        Component.methods.methodCallingAnotherMethod.call(scope, payload);
        sinon.assert.calledOnceWithExactly(
          scope.anotherMethod,
          payload
        );
        sinon.reset(scope.anotherMethod);`
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
  name: 'Methods',
  components: {
    TestCodeWrapper
  }
};
</script>
