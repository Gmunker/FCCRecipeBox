import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import expect from 'expect';
import $ from 'jQuery';
import TestUtils from 'react-addons-test-utils';

import ConnectedTodoList, {TodoList} from 'TodoList';
import ConnectedTodo, {Todo} from 'Todo';
import {configure} from 'configureStore'

describe('TodoList', () => {
	it('should exist', () => {
		expect(TodoList).toExist();
	});

	it('should render one Todo Component for each todo item', () => {
		var todos = [
			{
				id: 1,
				text: 'Do something',
				completed: false,
				completedAt: undefined,
				createdAt: 500
			}, {
				id: 2,
				text: 'Do something else',
				completed: false,
				completedAt: undefined,
				createdAt: 500
			}
		];

		let store = configure({todos});
		let provider = TestUtils.renderIntoDocument(
			<Provider store={store}>
				<ConnectedTodoList/>
			</Provider>
		);
		let todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
		var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

		expect(todosComponents.length).toBe(todos.length);
	});

	it('should render empty message if no todos', () => {
		var todos = [];
		var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
		var $el = $(ReactDOM.findDOMNode(todoList));

		expect($el.find('.container__message').length).toBe(1);
	});

});
