<template>
  <div>
    <section class="vuex mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Things To Consider</h2>
      <p class="mb-2">The Vuex store can be tested in isolation outside of any components since getters, mutations and actions are all JavaScript functions.</p>
      <p class="mb-2">When testing a component's integration with Vuex then these tests should live inside of the component being tested.</p>
      <p class="mb-2">
        There are several areas that can be tested including:
        <ul class="list-disc mt-2 ml-5">
          <li>
            state
            <ul class="list-disc mb-2 ml-4">
              <li>expected default state and data type</li>
            </ul>
          </li>
          <li>
            getters
            <ul class="list-disc mb-2 ml-4">
              <li>confirm computed return value</li>
            </ul>
          </li>
          <li>
            mutations
            <ul class="list-disc mb-2 ml-4">
              <li>confirming mutations to state are performed in the expected manner</li>
            </ul>
          </li>
          <li>
            actions
            <ul class="list-disc mb-2 ml-4">
              <li>confirming returned value if any</li>
              <li>confirming side effects occur as expected, such as correct mutation was called with expected payload</li>
            </ul>
          </li>
        </ul>
      </p>
      <p class="mt-2">
        Recommendations
        <ul class="list-disc mt-2 ml-5">
          <li>Gettters - If a getter uses another getter then stub the expected return result of the first getter to focus on testing the getter in question</li>
          <li>Mutations - Be sure to create copies of the state you are mutating in your tests to avoid issues that occur with references to the same state object across tests</li>
          <li>Actions - When an action contains a side effect (e.g. network request) you'll usually want to mock it forcing the flow of logic to test both success and failure cases</li>
        </ul>
      </p>
    </section>
    <section id="todo-vuex" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Todo Example</h2>
      <TestCodeWrapper
        :config="{
          describeBlock: {
            text: 'Todos',
            contextBlockOuter: {
              text: 'Getters',
              contextBlockInners: [
                {
                  text: 'completedTodoNumber',
                  itBlocks: [
                    {
                      text: 'should return 2 when there are 2 completed todos',
                      test: `const state = [
              {completed: true},
              {completed: true}
            ];
            expect(Todos.getters.completedTodoNumber(state)).to.equal(2);`
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
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">State</h3>
      <TestCodeWrapper
        :config="{
          contextBlockInners: [
            {
              text: 'defaultState',
              itBlocks: [
                {
                  text: 'should be an empty Array by default',
                  test: `expect(vuexModule.state).to.eql([]);`
                }
              ]
            }
          ]
        }"
      />
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Getters</h3>
      <TestCodeWrapper
        :config="{
          contextBlockInners: [
            {
              text: 'myGetter',
              itBlocks: [
                {
                  text: 'should return false when thing does not exist in state',
                  test: `const payload = {...copiedPayload};
        const state = [];
        expect(vuexModule.getters.myGetter(state, payload)).to.equal(false);`
                }
              ]
            }
          ]
        }"
      />
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Mutations</h3>
      <TestCodeWrapper
        :config="{
          contextBlockInners: [
            {
              text: 'myMutation',
              itBlocks: [
                {
                  text: 'should add payload object to state',
                  test: `const payload = {id: 123, name: 'my thing'};
        const state = [];
        vuexModule.mutations.myMutation(state, payload);
        expect(state.length).to.equal(1);
        expect(state[0]).to.eql(payload);`
                }
              ]
            }
          ]
        }"
      />
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Actions</h3>
      <TestCodeWrapper
        :config="{
          contextBlockInners: [
            {
              text: 'myAction',
              itBlocks: [
                {
                  text: 'should call myMutation with payload when invoked',
                  test: `const commit = sinon.spy();
        const payload = {id: 123, name: 'my thing'};
        Todos.actions.myAction({commit}, payload);
        sinon.assert.calledOnceWithExactly(commit, 'myMutation', payload);
        sinon.reset(commit);`
                }
              ]
            }
          ]
        }"
      />
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Mock Axios Inside of Action</h3>
      <TestCodeWrapper
        :config="{
          contextBlockInners: [
            {
              text: 'myAction',
              itBlocks: [
                {
                  text: 'should call endpoint and update Vuex',
                  test: `const commit = sinon.spy();
        const mockResponse = [
          {
            id: 1,
            name: 'A Todo',
            completed: false
          },
          {
            id: 2,
            name: 'Another Todo',
            completed: false
          }
        ];
        mockApi.onGet('/path/to/endpoint').reply(200, mockResponse);
        await Todos.actions.getTodos(
          {
            commit
          }
        );
        expect(mockApi.history.get.length).to.equal(1);
        expect(mockApi.history.get[0].url).to.equal(
          '/path/to/endpoint'
        );
        await flushPromises();
        sinon.assert.calledOnceWithExactly(commit, 'updateVuex', mockResponse);
        sinon.reset(commit);
        mockApi.reset();`
                }
              ]
            }
          ]
        }"
      />
      <h3 class="mt-2 mb-2 text-base md:text-lg lg:text-xl">Within a Component</h3>
      <TestCodeWrapper
        :config="{
          contextBlockInners: [
            {
              text: 'My component dispatches myAction',
              itBlocks: [
                {
                  text: 'should dispatch myAction',
                  test: `const vuex = {
          $store: {
            dispatch: sinon.spy(),
            state: {}
          }
        };
        Todos.created.call(vuex);
        sinon.assert.calledOnceWithExactly(vuex.$store.dispatch, 'myAction');
        sinon.reset(vuex.$store.dispatch);`
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
  name: 'Vuex',
  components: {
    TestCodeWrapper
  }
};
</script>
