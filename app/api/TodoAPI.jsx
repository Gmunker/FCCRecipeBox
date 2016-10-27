import $ from 'jquery';

module.exports = {
	filterTodos(todos, showCompleted, searchText) {
		let filteredTodos = todos;

		//Filter by showCompleted
		filteredTodos = filteredTodos.filter((todo) => {
			return !todo.completed || showCompleted;
		});

		//Filter by searchText
		filteredTodos = filteredTodos.filter((todo) => {
			let text = todo.text.toLowerCase();
			return searchText.length === 0 || text.indexOf(searchText.toLowerCase()) > -1;
		})

		//Sort todos with non-completed first
		filteredTodos.sort((a, b) => {
			if (!a.completed && b.completed) {
				return -1;
			} else if (a.completed && !b.completed) {
				return 1;
			} else {
				return 0;
			}
		});

		return filteredTodos;
	}
};
