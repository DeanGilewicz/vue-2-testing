<template>
  <div>
    <section class="end-to-end mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Things To Consider</h2>
      <p class="mb-2">End-to-end tests usually take longer to run but offer the most value as your application is tested the way a user would use it.</p>
      <p class="mb-2">These tests can provide a good deal of confidence when testing your application's core functionality.</p>
      <p class="mb-2">A few end-to-end tests can provide a large amount of code coverage.</p>
    </section>
    <section id="todo-end-to-end" class="mt-4 md:mt-6 lg:mt-8">
      <h2 class="mb-2 text-lg md:text-xl lg:text-2xl">Todo Example</h2>
      <TestCodeWrapper
        :config="{
          describeBlock: {
            text: 'Todo Application - Home Page Create Todo',
            contextBlockOuter: {
              text: '1440 x 900 - when user attempts to create a todo with a name',
              contextBlockInners: [
                {
                  text: '',
                  itBlocks: [
                    {
                      text: 'should create the todo when add todo button pressed',
                      test: `cy.get(todoTextInputEl).type(newTodoName);
            cy.get(todoAddButtonEl).click();
            rendersOneNewTodo(newTodoName);`
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
              text: 'show content',
              itBlocks: [
                {
                  text: 'when visiting the blog on desktop, clicking on show content button displays the content for main article',
                  test: `cy.visit('/the-blog');
        cy.viewport(1440, 900);
        cy.get('[data-test=content]').should(not.be.visible);
        cy.get('[data-test=button]').click();
        cy.get('[data-test=content]').should(be.visible);`
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
  name: 'EndToEnd',
  components: {
    TestCodeWrapper
  }
};
</script>
