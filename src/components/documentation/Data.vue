<template>
  <div>
    <section class="data mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Things To Consider</h2>
      <p class="mb-2">You should only consider testing the default value when it is being set by props.</p>
      <p class="mb-2">Otherwise, data value change should be tested inside of other contexts.</p>
    </section>
    <section id="todo-data" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Todo Example</h2>
      <TestCodeWrapper
        :config="{
          describeBlock: {
            text: 'Todos',
            contextBlockOuter: {
              text: 'Data',
              contextBlockInners: [
                {
                  text: 'newTodo',
                  itBlocks: [
                    {
                      text: 'should have a default value of todo object return by setInitialNewTodo method',
                      test: `const todoObject = {
              id: 123,
              name: '',
              completed: false
            };
            const scope = {
              setInitialNewTodo: () => todoObject
            };
            expect(Todos.data.call(scope).newTodo).to.eql(todoObject);`
                    }
                  ]
                },
                {
                  text: 'newTodoMessages',
                  itBlocks: [
                    {
                      text: 'should have a default value of empty object',
                      test: `const scope = {
              setInitialNewTodo: () => ({})
            };
            expect(Todos.data.call(scope).newTodoMessages).to.eql({});`
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
              text: 'dataObject',
              itBlocks: [
                {
                  text: 'should have a default value of empty object',
                  test: `expect(Component.data().dataObject).to.eql({});`
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
              text: 'dataArray',
              itBlocks: [
                {
                  text: 'should have a default value of empty array',
                  test: `expect(Component.data().dataArray).to.eql([]);`
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
              text: 'dataBoolean',
              itBlocks: [
                {
                  text: 'should have a default value of false',
                  test: `expect(Component.data().dataArray).to.equal(false);`
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
              text: 'dataString',
              itBlocks: [
                {
                  text: 'should have a default value of empty string',
                  test: `expect(Component.data().dataString).to.equal('');`
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
              text: 'dataNumber',
              itBlocks: [
                {
                  text: 'should have a default value of 0',
                  test: `expect(Component.data().dataNumber).to.equal(0);`
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
  name: 'Data',
  components: {
    TestCodeWrapper
  }
};
</script>
