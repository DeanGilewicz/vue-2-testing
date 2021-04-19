<template>
  <main class="demo-app container mx-auto px-2 md:px-4 lg:px-6">
    <section class="title">
      <h1 class="text-2xl md:text-3xl lg:text-4xl text-center text-center" data-test="todo-app-title">{{ $getConstant('TODO_PRETTY_NAME') }}</h1>
    </section>
    <section class="mt-4 md:mt-6 lg:mt-8">
      <div>
        <Todos />
      </div>
    </section>
  </main>
</template>

<script>
import Todos from '@/components/organisms/Todos';
export default {
  name: 'DemoApp',
  components: {
    Todos
  }
};
</script>
