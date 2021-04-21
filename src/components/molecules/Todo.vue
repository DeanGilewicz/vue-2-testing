<template>
  <div class="todo flex flex-col my-4">
    <div class="inline-flex items-center">
      <input
        v-if="doesTodoExist"
        class="p-1 cursor-pointer"
        data-test="todo-input-checkbox"
        id="todo-input-checkbox"
        type="checkbox"
        :checked="todo.completed"
        @change="$emit('change-todo-status', $event, todo)"
      />
      <label class="ml-2 cursor-pointer" data-test="todo-input-checkbox-label" for="todo-input-checkbox" :style="isImportantTodoStyles">{{ todo.name }}</label>
    </div>
    <div class="flex">
      <button
        v-if="doesTodoExist"
        class="mt-3 inline-block w-32 px-4 py-2 border border-solid border-error rounded-full leading-normal tracking-wide text-center text-base bg-red-500 text-white cursor-pointer"
        data-test="todo-button-delete-todo"
        :class="[{ complete: todo.completed }]"
        @click="$emit('delete-todo', todo)"
      >
        Delete
      </button>
      <button
        v-if="edit"
        data-test="todo-button-edit-todo"
        class="mt-3 ml-2 inline-block w-32 px-4 py-2 border border-solid border-lavender rounded-full leading-normal tracking-wide text-center text-base bg-yellow-500 text-white cursor-pointer"
        @click="$emit('edit-todo', todo)"
      >
        Edit
      </button>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  components: {},
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    todo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    doesTodoExist() {
      if (this.todo && Object.keys(this.todo).length > 0) return true;
      return false;
    },
    isImportantTodoStyles() {
      if (this.todo && this.todo.name && this.todo.name.toLowerCase().includes('*')) {
        return {
          backgroundColor: 'lightgray',
          padding: '2px 4px'
        };
      }
      return {};
    }
  }
};
</script>
