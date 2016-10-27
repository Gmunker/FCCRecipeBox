import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

// NEW ES6 CLASS COMPONETS

export class Search extends React.Component {
	render() {
	let {dispatch, showCompleted, searchText} = this.props;
		return (
			<div className="container__header">
				<div>
					<input type="search" ref="searchText" placeholder="Search Todo's" value={searchText} onChange={() => {
						let searchText = this.refs.searchText.value;
						dispatch(actions.setSearchText(searchText));
					}}/>
				</div>
				<div>
					<label>
						<input type="checkbox" ref="showCompleted" checked={showCompleted} onChange={() => {
							dispatch(actions.toggleShowCompleted());
						}}/>
						Show Completed Todos
					</label>
				</div>
			</div>
		)
	}
}

// ORGINAL COMPONETS FROM COURSE

// export let Search = React.createClass({
// 	render() {
// 		let {dispatch, showCompleted, searchText} = this.props;
// 		return (
// 			<div className="container__header">
// 				<div>
// 					<input type="search" ref="searchText" placeholder="Search Todo's" value={searchText} onChange={() => {
// 						let searchText = this.refs.searchText.value;
// 						dispatch(actions.setSearchText(searchText));
// 					}}/>
// 				</div>
// 				<div>
// 					<label>
// 						<input type="checkbox" ref="showCompleted" checked={showCompleted} onChange={() => {
// 							dispatch(actions.toggleShowCompleted());
// 						}}/>
// 						Show Completed Todos
// 					</label>
// 				</div>
// 			</div>
// 		)
// 	}
// });



export default connect((state) => {
	return {showCompleted: state.showCompleted, searchText: state.searchText}
})(Search);
