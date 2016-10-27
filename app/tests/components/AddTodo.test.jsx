var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jQuery');

import * as actions from 'actions';
var {AddTodo} = require('AddTodo');

describe('AddTodo', () => {
	it('should exist', () => {
		expect(AddTodo).toExist();
	});

	it('should dispatch ADD_TODO when valid todo text', () => {
		let todoText = 'Walk the dog';
		let action = actions.startAddTodo(todoText);
		let spy = expect.createSpy();
		let addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
		let $el = $(ReactDOM.findDOMNode(addTodo));

		addTodo.refs.todoText.value = todoText;
		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toHaveBeenCalledWith(action);
	});

	it('should not dispatch ADD_TODO when invalid text', () => {
		let todoText = '';
		let spy = expect.createSpy();
		let addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
		let $el = $(ReactDOM.findDOMNode(addTodo));

		addTodo.refs.todoText.value = todoText;
		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toNotHaveBeenCalled();
	});

});
