<template>
  <div class="todos">
    <h2 class="text-lg md:text-xl lg:text-2xl"><slot>Create Todo</slot></h2>
    <p v-if="asyncMessage" class="my-5 text-base md:text-lg font-bold italic text-lavender">{{ asyncMessage }}</p>
    <div class="my-5">
      <h3 class="">Todo Name:</h3>
      <div>
        <input
          v-model="newTodo.name"
          class="inline-block p-1 border border-solid"
          data-test="text-input"
          ref="input-todo-add"
          :disabled="stateMachine.currentState === 'pending'"
          :messages="newTodoMessages"
          @keydown="handleKeyPressReturn"
        />
        <button class="inline-block w-48 mt-3 ml-2 px-4 py-2 border border-solid rounded-full leading-normal tracking-wide text-center text-base bg-blue-500 text-white cursor-pointer" data-test="button-todo-add" @click="handleAddTodo">Add Todo</button>
      </div>
    </div>
    <div class="todos-incomplete my-8">
      <h3 data-test="todo-heading-incomplete" class="text-base md:text-lg lg:text-xl">Outstanding ({{ incompleteTodoNumber }})</h3>
      <template v-for="todo in todos">
        <Todo
          v-if="typeof todo.completed !== 'undefined' && !todo.completed"
          data-test="todo-incomplete"
          :edit="true"
          :key="todo.id"
          :todo="todo"
          @change-todo-status="handleChangeTodoStatus"
          @delete-todo="() => handleConfirmationModal(todo)"
          @edit-todo="handleEditTodo"
        />
      </template>
    </div>
    <div class="todos-complete my-8">
      <h3 class="text-base md:text-lg lg:text-xl" data-test="todo-heading-complete">Completed ({{ completedTodoNumber }})</h3>
      <template v-for="todo in todos">
        <Todo
          v-if="typeof todo.completed !== 'undefined' && todo.completed"
          data-test="todo-complete"
          :key="todo.id"
          :todo="todo"
          @change-todo-status="handleChangeTodoStatus"
          @delete-todo="() => handleConfirmationModal(todo)"
        >
          <template v-slot:footer>
            <span class="text-lg">(Go on remove it)</span>
          </template>
        </Todo>
      </template>
    </div>
    <div
      v-if="showConfirmationModal && activeTodo"
      class="modal fixed z-10 top-0 right-0 bottom-0 left-0 flex items-center bg-black bg-opacity-50"
      data-test="confirmation-modal"
      @closeModal="showConfirmationModal = false"
    >
      <div class="modal-content w-full max-w-xl my-0 mx-auto p-4 rounded-2xl bg-white">
        <h3 class="text-lg md:text-xl lg:text-2xl">Delete <span class="text-lg md:text-xl lg:text-2xl text-green-500 capitalize">{{ activeTodo.name }}</span> Todo?</h3>
        <p class="py-2 text-base md:text-lg lg:text-xl">Are you sure you want to delete this todo?</p>
        <button class="mx-2 inline-block w-32 px-4 py-2 border border-solid rounded-full leading-normal tracking-wide text-center bg-blue-500 text-base text-white cursor-pointer" data-test="confirmation-modal-button-cancel" @click="showConfirmationModal = false">Cancel</button>
        <button class="mx-2 inline-block w-32 px-4 py-2 border border-solid border-error rounded-full leading-normal tracking-wide text-center bg-red-500 text-base-500 text-white cursor-pointer" data-test="confirmation-modal-button-delete" @click="() => handleDeleteTodo(activeTodo)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import Todo from '@/components/molecules/Todo';
import { myClearTimeout, mySetTimeout } from '@/utils/helpers';

export default {
  name: 'Todos',
  components: {
    Todo
  },
  data() {
    return {
      activeTodo: null,
      asyncMessage: '',
      asyncTimer: null,
      newTodo: this.setInitialNewTodo(),
      newTodoMessages: {},
      showConfirmationModal: false
    };
  },
  computed: {
    ...mapGetters([
      'completedTodoNumber',
      'incompleteTodoNumber'
    ]),
    ...mapState([
      'stateMachine',
      'todos'
    ]),
    newTodoName() {
      return this.newTodo.name;
    }
  },
  // created() {
  //   if (this.$store.state.todos.length === 0) {
  //     this.$store.dispatch('getTodos').catch((err) => {
  //       // eslint-disable-next-line no-console
  //       console.error('err', err);
  //     });
  //   }
  // },
  mounted() {
    if (this.$refs['input-todo-add']) {
      this.$refs['input-todo-add'].focus();
    }
  },
  methods: {
    ...mapActions([
      'addTodo',
      'deleteTodo',
      'toggleTodoStatus'
    ]),
    generateRandomNumber() {
      return Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
    },
    handleAddTodo() {
      this.newTodoMessages = {};
      if (!this.newTodo.name) {
        this.newTodoMessages = { error: 'Please Name Your Todo' };
        return;
      }
      this.addTodo(this.newTodo);
      this.newTodo = this.setInitialNewTodo();
      this.asyncMessage = '';
    },
    handleChangeTodoStatus(e, todo) {
      this.toggleTodoStatus(todo);
    },
    handleConfirmationModal(todo) {
      this.activeTodo = todo;
      this.showConfirmationModal = true;
    },
    handleDeleteTodo(todo) {
      this.deleteTodo(todo);
      this.activeTodo = null;
    },
    handleEditTodo(todo) {
      return this.$router.push(`/demo-app/${todo.id}/edit`);
    },
    handleGetAsyncMessage() {
      // this.$store.dispatch('getMessage').then((message) => {
      //   this.asyncMessage = message.text;
      //   this.handleResetAsyncTimer();
      // }).catch(() => {
      //   this.asyncMessage = 'Server is down so you may as well create some todos!';
      //   this.handleResetAsyncTimer();
      // });
    },
    handleKeyPressReturn(e) {
      if (e.keyCode !== 13 || e.key !== 'Enter') return;
      this.newTodoMessages = {};
      if (!this.newTodo.name) {
        this.newTodoMessages = { error: 'Please Name Your Todo' };
        return;
      }
      this.addTodo(this.newTodo);
      this.newTodo = this.setInitialNewTodo();
      this.asyncMessage = '';
    },
    handleResetAsyncTimer() {
      if (this.asyncTimer) myClearTimeout(window, this.asyncTimer);
      this.asyncTimer = null;
    },
    handleSetAsyncTimeout() {
      return mySetTimeout(window, 3000, this.handleGetAsyncMessage);
    },
    setInitialNewTodo() {
      return {
        id: this.generateRandomNumber(),
        name: '',
        completed: false
      };
    }
  },
  watch: {
    // watch a reactive property, in this case a computed property
    newTodoName(newName, oldName) {
      if (newName !== '') {
        // once stop typing wait 3 seconds before performing action
        this.handleResetAsyncTimer();
        this.asyncTimer = this.handleSetAsyncTimeout();
      } else {
        this.handleResetAsyncTimer();
      }
    }
  }
};
</script>
