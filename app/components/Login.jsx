import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';

// NEW ES6 CLASS COMPONENTS

export class Login extends React.Component {
  onLogin() {
    let {dispatch} = this.props;

    dispatch(actions.startLogin());
  }
  render() {
    return (
      <div>
        <h1 className="page-title">Todo App</h1>
        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
              <h3>Login</h3>
              <p>Login with GitHub account below</p>
              <button className="button" onClick={this.onLogin.bind(this)}>Login with GitHub</button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

// ORGINAL CODE FROM COURSE

// export let Login = React.createClass({
//   onLogin() {
//     let {dispatch} = this.props;
//
//     dispatch(actions.startLogin());
//   },
//   render() {
//     return (
//       <div>
//         <h1 className="page-title">Todo App</h1>
//         <div className="row">
//           <div className="columns small-centered small-10 medium-6 large-4">
//             <div className="callout callout-auth">
//               <h3>Login</h3>
//               <p>Login with GitHub account below</p>
//               <button className="button" onClick={this.onLogin}>Login with GitHub</button>
//             </div>
//           </div>
//         </div>
//       </div>
//
//     )
//   }
// })

export default Redux.connect()(Login);
