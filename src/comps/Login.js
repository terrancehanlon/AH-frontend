import React, { Component } from 'react';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: 'username', 
			password: 'password', 
			succesfull: false,
			noAccount: false,
			tried: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	  }

	handleSubmit(event) {
		// window.alert('A name was submitted: ' + this.state);
		// setTimeout(() => {}, 1000)

		fetch('login/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'username': this.state['username'],
				'password': this.state['password']
			})
		}).then((response) => { return response.json()} ).then((data) => {
			if(data['valid']){
				console.log('right creds!');
				this.setState([{'succesfull': true}]);
				this.setState([{'tried': true}]);
			}
			else{
				console.log('wrong creds');
				this.setState({['succesfull']: false});
				this.setState({['tried']: true});
			}
		})

		event.preventDefault();
	  }

	  handleChange = (e) => {
		this.setState({
		   [e.target.id]: e.target.value
		})
	  }

	render(){ 
		
		return(
			<div>
			<h1> Hello </h1>
			<form onSubmit={this.handleSubmit} >
				<input type="text" id="username" onChange={e => this.handleChange(e)} placeholder="username" name="username" />
				<br/>
				<input type="password" onChange={e => this.handleChange(e)} placeholder="password" name="name" />
				<br/>
				<input type="submit" value="Submit" />
				</form>
				{!this.state['succesfull'] && this.state['tried'] &&
					<h3>NO good</h3>
				}
			</div>

		);
	}
}

export default Login; // Don’t forget to use export default!


//fetch('https://mywebsite.com/endpoint/', {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     firstParam: 'yourValue',
//     secondParam: 'yourOtherValue'
//   })
// });