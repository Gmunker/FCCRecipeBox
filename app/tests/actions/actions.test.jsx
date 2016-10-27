import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import firebase, {firebaseRef} from 'app/firebase/'
import * as actions from 'actions';

let createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
	it('should generate searchText action', () => {
		let action = {
			type: "SET_SEARCH_TEXT",
			searchText: 'Some Search Text'
		};

		let res = actions.setSearchText(action.searchText);

		expect(res).toEqual(action);
	});

	it('should generate toggleShowCompleted action', () => {
		let action = {
			type: 'TOGGLE_SHOW_COMPLETED'
		};
		let res = actions.toggleShowCompleted();

		expect(res).toEqual(action);
	});

	it('should generate addTodo action', () => {
		let action = {
			type: "ADD_TODO",
			todo: {
				id: "jdjd22",
				text: "Something to test",
				completed: false,
				createdAt: 45454
			}
		};
		let res = actions.addTodo(action.todo);

		expect(res).toEqual(action);
	});

	it('should generate add todos action object', () => {
		let todos = [
			{
				id: '111',
				text: 'anything',
				completed: 'false',
				completedAt: undefined,
				createdAt: 33000
			}
		];
		let action = {
			type: 'ADD_TODOS',
			todos
		};
		let res = actions.addTodos(todos);

		expect(res).toEqual(action);
	});

	it('should generate UPDATE_TODO action', () => {
		let action = {
			type: 'UPDATE_TODO',
			id: 22,
			updates: {
				completed: false
			}
		};
		let res = actions.updateTodo(action.id, action.updates);

		expect(res).toEqual(action);
	});

	describe('Tests with firebade todos', () => {
		let testTodoRef;
		let uid;
		let todosRef;

		beforeEach((done) => {
			firebase.auth().signInAnonymously().then((user) => {
				uid = user.uid;
				todosRef = firebaseRef.child(`users/${uid}/todos`);

				return todosRef.remove();
			}).then(() => {
				testTodoRef = todosRef.push();
				return testTodoRef.set({
					text: 'something to do',
					completed: false,
					createdAt: 123
				});
			})
			.then(() => done())
			.catch(done);
		});

		afterEach((done) => {
			todosRef.remove().then(() => done());
		});

		it('should toggleTodo and dispatch UPDATE_TODO action', (done) => {
			const store = createMockStore({auth: {uid}});
			const action = actions.startToggleTodo(testTodoRef.key, true);

			store.dispatch(action).then(() => {
				const mockActions = store.getActions();

				expect(mockActions[0]).toInclude({type: 'UPDATE_TODO', id: testTodoRef.key});

				expect(mockActions[0].updates).toInclude({completed: true});

				expect(mockActions[0].updates.completedAt).toExist();

				done();
			}, done);
		}); // it should toggleTodo..

		it('should add todo to todos and dispatch ADD_TODOS', (done) => {
			const store = createMockStore({auth: {uid}});
			const action = actions.startAddTodos();

			store.dispatch(action).then(() => {
				const mockActions = store.getActions();

				expect(mockActions.length).toEqual(1);
				expect(mockActions[0].type).toEqual('ADD_TODOS');
				expect(mockActions[0].text).toEqual(testTodoRef.text);
				done();
			},done);
		})// should add 1 todo to todos

		it('should create todo and dispatch addTodo', (done) => {
			const store = createMockStore({auth: {uid}});
			const todoText = 'My todo item';

			store.dispatch(actions.startAddTodo(todoText)).then(() => {
				const actions = store.getActions();
				expect(actions[0]).toInclude({type: 'ADD_TODO'});
				expect(actions[0].todo).toInclude({text: todoText});
				done();
			}).catch(done);
		});
	});// Tests with firebade todos

	describe('Tests with Auth', () => {
		it('should generate login action object', () => {
			const action = {
				type: 'LOGIN',
				uid: 123
			};

			const res = actions.login(action.uid);

			expect(res).toEqual(action);
		});// Generate login action

		it('should generate logout action', () => {
			const action = {
				type: 'LOGOUT'
			};

			const res = actions.logout();

			expect(res).toEqual(action);
		})
	});// Tests with Auth
});// Actions
