const expect = require('expect');
const df = require('deep-freeze-strict');
const reducers = require('reducers');

describe('Reducers', () => {

	describe('searchTextReducer', () => {
		it('should set searchText', () => {
			let action = {
				type: 'SET_SEARCH_TEXT',
				searchText: 'Testing Text'
			};
			let res = reducers.searchTextReducer(df(''), df(action));

			expect(res).toEqual(action.searchText);
		});
	}); // searchTextReducer

	describe('showCompletedReducer', () => {
		it('should set true if false', () => {
			let action = {
				type: 'TOGGLE_SHOW_COMPLETED'
			};
			let res = reducers.showCompletedReducer(df(false), df(action));

			expect(res).toEqual(true);
		});
	}); // searchTextReducer

	describe('todosReducer', () => {
		it('should add new todo', () => {
			let action = {
				type: 'ADD_TODO',
				todo: {
					id: "jdjd22",
					text: "Something to test",
					completed: false,
					createdAt: 45454
				}
			};
			let res = reducers.todosReducer(df([]), df(action));

			expect(res.length).toEqual(1);
			expect(res[0]).toEqual(action.todo);
		}); // Should add new todo

		it('should update todo', () => {
			let todos = [
				{
					id: 120,
					text: 'Something',
					createdAt: 123,
					completed: true,
					completedAt: 125
				}
			];

			let updates = {
				completed: false,
				completedAt: null
			}

			let action = {
				type: 'UPDATE_TODO',
				id: todos[0].id,
				updates
			};

			let res = reducers.todosReducer(df(todos), df(action));
			expect(res[0].completed).toEqual(updates.completed);
			expect(res[0].completedAt).toEqual(updates.completedAt);
			expect(res[0].text).toEqual(todos[0].text);
		}); // Should return opposite

		it('should add exsisting todos', () => {
			let todos = [
				{
					id: 120,
					text: 'Something',
					createdAt: 123,
					completed: false,
					completedAt: undefined
				}
			];

			let action = {
				type: 'ADD_TODOS',
				todos
			};
			let res = reducers.todosReducer(df([]), df(action));

			expect(res.length).toEqual(1);
			expect(res[0]).toEqual(todos[0]);
		});

		it('should remove todos on logout', () => {
			let todos = [
				{
					id: 120,
					text: 'Something',
					createdAt: 123,
					completed: false,
					completedAt: undefined
				}
			];

			let action = {
				type: 'LOGOUT'
			}

			let res = reducers.todosReducer(df([todos]), df(action));

			expect(res.length).toEqual(0);
		});

	}); // Todos Reducer

	describe('authReducer', () => {
		it('should set UID', () => {
		 	const action = {
				type: 'LOGIN',
				uid: 123
			};

		 	const res = reducers.authReducer(df({}), df(action));

			expect(res).toEqual({uid: action.uid});
		});// Set UID

		it('should empty auth on logout', () => {
			const authData = {uid: 123}
			const action = {
				type: 'LOGOUT',
			}

		 	const res = reducers.authReducer(df(authData), df(action));

			expect(res).toEqual({})
		})// Empty UID
	});// Auth Reducer
}); // Reducers
