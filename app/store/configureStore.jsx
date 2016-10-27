import * as redux from 'redux';
import thunk from 'redux-thunk';
import {combineReducers, createStore, compose, applyMiddleware} from 'redux';

import {searchTextReducer, showCompletedReducer, todosReducer, authReducer} from 'reducers';

export let configure = (initialState = {}) => {
	let reducer = combineReducers({
		searchText: searchTextReducer,
		showCompleted: showCompletedReducer,
		todos: todosReducer,
		auth: authReducer
	});

	let store = createStore(reducer, initialState, compose(applyMiddleware(thunk), window.devToolsExtension
		? window.devToolsExtension()
		: f => f));
	return store;
};
