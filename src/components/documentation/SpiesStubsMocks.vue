<template>
  <div>
    <section class="spies-stubs-mocks mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Things To Consider</h2>
      <p class="mb-2">Reasons why you may want to use a <span class="text-green-500">spy</span>:</p>
      <ul class="list-disc mb-2 ml-5">
        <li>When you do not want to change the function but you want to confirm its behavior</li>
        <li>To determine whether the function has been called</li>
        <li>To confirm what arguments, if any, were provided when the function was called</li>
        <li>To confirm what errors, if any, were thrown when the function was called</li>
        <li>To confirm the return value of the function</li>
      </ul>
      <p class="mb-2">Reasons why you may want to use a <span class="text-green-500">stub</span>:</p>
      <ul class="list-disc mb-2 ml-5">
        <li>When you want to change how the function behaves</li>
        <li>To control the exact returned response or error value of the function to test other dependent logic</li>
        <li>To replace problematic pieces of code, typically external - network connection, db etc</li>
        <li>To follow code paths that wouldn't otherwise be possible, such as error handling</li>
        <li>To simplify testing asynchronous code by forcing a callback right away, making the test synchronous</li>
      </ul>
      <p class="mb-2">Reasons why you may want to use a <span class="text-green-500">mock</span>:</p>
      <ul class="list-disc mb-2 ml-5">
        <li>When validating how an external dependency is used within a function</li>
        <li>To confirm your external dependency is used at all</li>
        <li>To confirm your external dependency is used correctly</li>
        <li>To ensure your function can handle different responses from external dependencies</li>
      </ul>
    </section>
    <section id="todo-spies-stubs-mocks" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Todo Example</h2>
      <TestCodeWrapper
        :config="{
          describeBlock: {
            text: 'Vuex Store - Todos',
            contextBlockOuter: {
              text: 'Actions',
              contextBlockInners: [
                {
                  text: 'addTodo',
                  itBlocks: [
                    {
                      text: 'should call addTodo mutation with todo payload when todo does not exist in state',
                      test: `const getters = {
              doesTodoExist: () => false
            };
            const commit = sinon.spy();
            const theTodo = {...defaultTodo};
            Todos.actions.addTodo(
              {
                commit,
                getters
              },
              theTodo
            );
            sinon.assert.calledOnceWithExactly(commit, 'addTodo', theTodo);
            sinon.reset(commit);`
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
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Spies</h3>
      <TestCodeWrapper
        :config="{
          contextBlockOuter: {
            text: 'Methods',
            contextBlockInners: [
              {
                text: 'theMethod',
                itBlocks: [
                  {
                    text: 'should not call spyFnExample',
                    test: `const scope = {
            $store: {
              dispatch: {
                vuexDispatch: sinon.spy()
              }
            }
          };
          const payload = { id: 1 };
          Component.methods.theMethod.call(scope, payload);
          sinon.assert.not.called(scope.$store.dispatch, 'vuexDispatch');
          sinon.reset(scope.$store.dispatch.vuexDispatch);`
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
            text: 'Methods',
            contextBlockInners: [
              {
                text: 'theMethod',
                itBlocks: [
                  {
                    text: 'should call spyFnExample with object consisting of an id of 1',
                    test: `const scope = {
            $store: {
              dispatch: {
                vuexDispatch: sinon.spy()
              }
            }
          };
          const payload = { id: 1 };
          Component.methods.theMethod.call(scope, payload);
          sinon.assert.calledOnceWithExactly(scope.$store.dispatch, 'vuexDispatch', payload);
          sinon.reset(scope.$store.dispatch.vuexDispatch);`
                  }
                ]
              }
            ]
          }
        }"
      />
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Stubs</h3>
      <TestCodeWrapper
        :config="{
          contextBlockOuter: {
            text: 'Methods',
            contextBlockInners: [
              {
                text: 'theMethod',
                itBlocks: [
                  {
                    text: 'should return congratulations when dispatch returns abc',
                    test: `const scope = {
            $store: {
              dispatch: {
                vuexDispatch: sinon.stub().returns('abc')
              }
            }
          };
          const payload = { id: 1 };
          Component.methods.theMethod.call(scope, payload);
          sinon.assert.calledWithExactly(scope.$store.dispatch, 'vuexDispatch', payload);
          expect(Component.methods.theMethod.call(scope, payload)).to.equal('congratulations');
          sinon.reset(scope.$store.dispatch.vuexDispatch);`
                  }
                ]
              }
            ]
          }
        }"
      />
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Mocks</h3>
      <TestCodeWrapper
        :config="{
          contextBlockOuter: {
            text: 'Methods',
            contextBlockInners: [
              {
                text: 'theMethod',
                itBlocks: [
                  {
                    text: 'should create user when dispatch is called with user obj',
                    test: `let requestMock = sinon.mock(axios)
          const scope = {
            $store: {
              dispatch: {
                vuexDispatch: theImportedDispatchFn
              }
            }
          };
          const payload = { firstName: 'demo', lastName: 'user' };
          Component.methods.theMethod.call(scope, payload);
          requestMock.expects('post').once().withArgs(payload)
          requestMock.verify();
          requestMock.restore();`
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
  name: 'SpiesStubsMocks',
  components: {
    TestCodeWrapper
  }
};
</script>
