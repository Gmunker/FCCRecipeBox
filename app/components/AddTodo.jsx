import React from 'react';
const {connect} = require('react-redux');
const actions = require('actions');

// NEW ES6 CLASS COMPONENTS

export class AddTodo extends React.Component{
	handleSubmit(e) {
		e.preventDefault();
		const {dispatch} = this.props;
		const todoText = this.refs.todoText.value;

		if (todoText.length > 0) {
			this.refs.todoText.value = '';
			dispatch(actions.startAddTodo(todoText));
		} else {
			this.refs.todoText.focus();
		}
	}
	render() {
		return (
			<div className="container__footer">
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input type="text" ref="todoText" placeholder="What do you need to do?"/>
					<button className="button expanded">Add Todo</button>
				</form>
			</div>
		);
	}
}

// ORGINAL COMPONENTS FROM COURSE

// export let AddTodo = React.createClass({
// 	handleSubmit: function(e) {
// 		e.preventDefault();
// 		const {dispatch} = this.props;
// 		const todoText = this.refs.todoText.value;
//
// 		if (todoText.length > 0) {
// 			this.refs.todoText.value = '';
// 			dispatch(actions.startAddTodo(todoText));
// 		} else {
// 			this.refs.todoText.focus();
// 		}
// 	},
// 	render() {
// 		return (
// 			<div className="container__footer">
// 				<form onSubmit={this.handleSubmit}>
// 					<input type="text" ref="todoText" placeholder="What do you need to do?"/>
// 					<button className="button expanded">Add Todo</button>
// 				</form>
// 			</div>
// 		);
// 	}
// });

export default connect()(AddTodo);
