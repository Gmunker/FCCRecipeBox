import firebase, {firebaseRef, githubProvider} from 'app/firebase/';
import moment from 'moment';

export let setSearchText = (searchText) => {
	return {type: 'SET_SEARCH_TEXT', searchText};
};

export let toggleShowCompleted = () => {
	return {type: "TOGGLE_SHOW_COMPLETED"};
};

export let addTodo = (todo) => {
	return {type: "ADD_TODO", todo};
};

export let startAddTodo = (text) => {
	return (dispatch, getState) => {
		let todo = {
			text,
			completed: false,
			createdAt: moment().unix(),
			completedAt: null
		};
		let uid = getState().auth.uid;
		let todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo);

		return todoRef.then(() => {
			dispatch(addTodo({
				...todo,
				id: todoRef.key
			}));
		});

	};
};

export let addTodos = (todos) => {
	return {type: 'ADD_TODOS', todos}
};

export let startAddTodos = () => {
	return (dispatch, getState) => {
		let uid = getState().auth.uid;
		return firebaseRef.child(`users/${uid}/todos`).once('value').then((snapshot) => {
			let todos = snapshot.val() || {};
			let newTodos = [];
			Object.keys(todos).map((key) => {
				let todoData = todos[key];
				newTodos.push({
					id: key,
					...todos[key]
				});
			});
			dispatch(addTodos(newTodos));
		});
	};
};

export let updateTodo = (id, updates) => {
	return {type: "UPDATE_TODO", id, updates};
};

export let startToggleTodo = (id, completed) => {
	return (dispatch, getState) => {
		let uid = getState().auth.uid;
		let todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
		let updates = {
			completed,
			completedAt: completed
				? moment().unix()
				: null
		};

		return todoRef.update(updates).then(() => {
			dispatch(updateTodo(id, updates));
		});
	};
};

export let login = (uid) => {
	return {type: 'LOGIN', uid}
};

export let logout = () => {
	return {type: 'LOGOUT'}
}

export let startLogin = () => {
	return (dispatch, getState) => {
		firebase.auth().signInWithPopup(githubProvider).then((result) => {
			console.log('Auth Worked!', result)
		}, (error) => {
			console.log('unable to auth', error)
		});
	};
};

export let startLogout = () => {
	return (dispatch, getState) => {
		return firebase.auth().signOut().then(() => {
			console.log('logged out');
		});
	};
};
