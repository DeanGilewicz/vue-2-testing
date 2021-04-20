export const generatedTodosWithOneComplete = function(todos) {
  return todos.map((todo, index) => {
    if (index === 1) return Object.assign({}, todo, { completed: true });
    return Object.assign({}, todo);
  });
};
