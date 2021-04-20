<template>
  <main class="demo-app container mx-auto px-2 md:px-4 lg:px-6">
    <section class="title">
      <h1 class="text-2xl md:text-3xl lg:text-4xl text-center">Edit Todo</h1>
    </section>
    <section class="container-todo mt-4 md:mt-6 lg:mt-8">
      <div>
        <router-link data-test="edit-todo-link" to="/demo-app">Back To All Todos</router-link>
        <div class="todo mt-4">
          <h2 class="text-xl md:text-2xl lg:text-3xl">Change Todo Name</h2>
          <div class="flex flex-col my-4">
            <input
              data-test="edit-todo-input"
              v-if="theTodo"
              type="text"
              class="w-64 p-1 border border-solid text-lg text-gray-600"
              :value="theTodo.name"
              @input="(e) => this.newName = e.target.value"
            />
            <div class="mt-4">
              <button data-test="edit-todo-button-cancel" class="inline-block w-32 px-4 py-2 border border-solid rounded-full leading-normal tracking-wide text-center text-base bg-blue-500 text-white cursor-pointer" @click="$router.push('/demo-app')">Cancel</button>
              <button data-test="edit-todo-button-save" class="inline-block w-32 ml-2 px-4 py-2 border border-solid border-green-500 rounded-full leading-normal tracking-wide text-center text-base bg-green-500 text-white cursor-pointer" @click="handleSave">Save</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'DemoAppEditTodo',
  components: {},
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      newName: ''
    };
  },
  created() {
    // return to demo app home
    if (this.$store.state.todos.length === 0 || !this.$store.state.todos.find((todo) => todo.id === Number(this.id))) {
      return this.$router.replace('/demo-app');
    }
  },
  computed: {
    theTodo() {
      return this.$store.state.todos.find((todo) => todo.id === Number(this.id));
    }
  },
  methods: {
    handleSave(e) {
      this.$store.dispatch('setTodoName', { todo: this.theTodo, name: this.newName });
      this.$router.push('/demo-app');
    }
  }
};
</script>
