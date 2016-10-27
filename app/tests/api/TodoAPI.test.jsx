import expect from 'expect';

import TodoAPI from 'TodoAPI';

describe('TodoAPI', () => {
	it('should exist', () => {
		expect(TodoAPI).toExist();
	});

	describe('filterTodos', () => {
		const todos = [
			{
				id: 1,
				text: 'Some Test Text',
				completed: true
			}, {
				id: 2,
				text: 'Some Test Text2',
				completed: false
			}, {
				id: 3,
				text: 'Some Test Text3',
				completed: true
			}
		];

		it('should return all items if showCompleted is true', () => {
			let filteredTodos = TodoAPI.filterTodos(todos, true, '');
			expect(filteredTodos.length).toBe(3);
		});

		it('should return 1 item if showCompleted is false', () => {
			let filteredTodos = TodoAPI.filterTodos(todos, false, '');
			expect(filteredTodos.length).toBe(1);
		});

		it('should sort by completed status', () => {
			let filteredTodos = TodoAPI.filterTodos(todos, true, '');
			expect(filteredTodos[0].completed).toBe(false);
		});

		it('should filter todos by searchText', () => {
			let filteredTodos = TodoAPI.filterTodos(todos, true, 'some');
			expect(filteredTodos.length).toBe(3);
		});

		it('should filter todos by searchText if uppercase', () => {
			let filteredTodos = TodoAPI.filterTodos(todos, true, 'SOME');
			expect(filteredTodos.length).toBe(3);
		});

		it('should show all when no text is entered in search', () => {
			let filteredTodos = TodoAPI.filterTodos(todos, true, '');
			expect(filteredTodos.length).toBe(3);
		});

		it('should return return only 1 todo when valid data is searched', () => {
			let filteredTodos = TodoAPI.filterTodos(todos, true, '3');
			expect(filteredTodos.length).toBe(1);
		})

	}); //filterTodos

}); //describe TodoAPI
