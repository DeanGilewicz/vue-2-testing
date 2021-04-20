<template>
  <div>
    <section class="watch mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Things To Consider</h2>
      <p class="mb-2">Watchers are primarily used to trigger a side effect when dependencies change.</p>
      <p class="mb-2">It can be useful to test a watcher's direct behavior to confirm side effects are being called when expected with the correct payload (if any).</p>
    </section>
    <section id="todo-watch" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Todo Example</h2>
      <TestCodeWrapper
        :config="{
          describeBlock: {
            text: 'Todos',
            contextBlockOuter: {
              text: 'Watch',
              contextBlockInners: [
                {
                  text: 'newTodoName',
                  itBlocks: [
                    {
                      text: 'should call handleResetAsyncTimer when called with an empty string',
                      test: `const scope = {
              handleResetAsyncTimer: sinon.spy()
            };
            Todos.watch.newTodoName.call(scope, '');
            sinon.assert.calledOnce(scope.handleResetAsyncTimer);
            sinon.reset(scope.handleResetAsyncTimer);`
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
              text: 'watchDataProperty',
              itBlocks: [
                {
                  text: 'should call event when watched value changes',
                  test: `const scope = {
          event: sinon.spy()
        }
        Todos.watch.newTodoName.call(scope, 'changed');
        sinon.assert.calledOnce(scope.event);
        sinon.reset(scope.event);`
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
              text: 'watchComputedProperty',
              itBlocks: [
                {
                  text: 'should change text in DOM when watched value changes',
                  test: `const domEl = document.createElement('div');
        const innerHTML = <p class='mirrors-code-being-tested'>Original Text</p>
        domEl.innerHTML = innerHTML;
        const scope = {
          $refs: {
            childComponent: {
              $el: {
                querySelector: () => domEl
              }
            }
          }
        };
        Component.watch.computedProperty.call(scope, true, false);
        expect(domEl.textContent).to.equal('Changed Text');`
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
  name: 'Watch',
  components: {
    TestCodeWrapper
  }
};
</script>
