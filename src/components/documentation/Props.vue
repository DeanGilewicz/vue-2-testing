<template>
  <div>
    <section class="props mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Things To Consider</h2>
      <p class="mb-2">If a prop contains a custom prop validator then this can be tested.</p>
      <p class="mb-2">You may also consider testing a prop when concerned with ensuring the data type will not change.</p>
      <p class="mb-2">Props should be tested inside of other contexts when the assertion depends upon the existance or value of a prop.</p>
    </section>
    <section id="todo-props" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Todo Example</h2>
      <TestCodeWrapper
        :config="{
          describeBlock: {
            text: 'Todo',
            contextBlockOuter: {
              text: 'Props',
              contextBlockInners: [
                {
                  text: 'todo',
                  itBlocks: [
                    {
                      text: 'should be an Object with a default value of empty object',
                      test: `const todoProp = Todo.props.todo;
            expect(todoProp.type).to.equal(Object);
            expect(todoProp.default()).to.eql({});`
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
      <p class="mb-2">When testing props directly these can be accessed straight from the component.</p>
      <p class="mb-2">Implementing your tests this way improves the time it takes for these tests to complete.</p>
      <TestCodeWrapper
        :config="{
          contextBlockInners: [
            {
              text: 'propObject',
              itBlocks: [
                {
                  text: 'should be an Object with a default value of empty object',
                  test: `const componentProp = component.props.propObjectName;
        expect(componentProp.type).to.equal(Object);
        expect(componentProp.default()).to.eql({});`
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
              text: 'propArray',
              itBlocks: [
                {
                  text: 'should be an Array with a default value of empty array',
                  test: `const componentProp = component.props.propArrayName;
        expect(componentProp.type).to.equal(Array);
        expect(componentProp.default()).to.eql([]);`
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
              text: 'propBoolean',
              itBlocks: [
                {
                  text: 'should be a Boolean with a default value of false',
                  test: `const componentProp = component.props.propBooleanName;
        expect(componentProp.type).to.equal(Boolean);
        expect(componentProp.default).to.equal(false);`
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
              text: 'propString',
              itBlocks: [
                {
                  text: 'should be a String with a default value of empty',
                  test: `const componentProp = component.props.propStringName;
        expect(componentProp.type).to.equal(String);
        expect(componentProp.default).to.equal('');`
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
              text: 'propNumber',
              itBlocks: [
                {
                  text: 'should be a Number with a default value of 0',
                  test: `const componentProp = component.props.propNumberName;
        expect(componentProp.type).to.equal(Number);
        expect(componentProp.default).to.equal(0);`
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
  name: 'Props',
  components: {
    TestCodeWrapper
  }
};
</script>
