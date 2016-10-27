import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import $ from 'jQuery';
import TestUtils from 'react-addons-test-utils';

import {Search} from 'Search';

describe('Search', () => {
	it('should exist', () => {
		expect(Search).toExist();
	});

	it('should dispatch setSearchText on input change', () => {
		let searchText = "dog";
		let action = {
			type: 'SET_SEARCH_TEXT',
			searchText
		}
		let spy = expect.createSpy();
		let search = TestUtils.renderIntoDocument(<Search dispatch={spy}/>);

		search.refs.searchText.value = searchText;
		TestUtils.Simulate.change(search.refs.searchText);

		expect(spy).toHaveBeenCalledWith(action);
	});

	it('should dispatch toggleShowCompleted when checkbox checked', () => {
		let action = {
			type: 'TOGGLE_SHOW_COMPLETED'
		};
		let spy = expect.createSpy();
		let search = TestUtils.renderIntoDocument(<Search dispatch={spy}/>);

		search.refs.showCompleted.checked = true;
		TestUtils.Simulate.change(search.refs.showCompleted);

		expect(spy).toHaveBeenCalledWith(action);
	});
});
