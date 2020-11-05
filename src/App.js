import React from 'react';
import './App.css';
let counter = 1;

class ChuckNorrisJokeButton extends React.Component {
	render() {
		return (
			<a id="chuck-button" onClick={this.props.onClick}>
				<img id="chuck-img" src='chuck.png' alt="image not found" />
			</a>
		);
	}
}

class ChuckNorrisJokeDisplay extends React.Component {
	render() {
		return (
			<div id="chuck-joke">
				<p>{ this.props.value }</p>
			</div>
		);
	}
}

class ChuckNorrisJokeWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: {},
			error: '',
		}
	}

	handleJoke(jkObj) {
		if(jkObj.type.localeCompare('success') === 0) {
			this.setState({value: jkObj.value})
		} else {
			this.setState({error: jkObj.type})
		}
	}

	flipDisplay() {
		document.getElementById('chuck-joke').style.display = 'block';
	}

	handleClick() {
		counter++;
		this.flipDisplay();
		fetch('http://api.icndb.com/jokes/random')
		.then(response => response.json())
		.then(json => this.handleJoke(json));
	}

	render() {
		const val = (this.state.value ? this.state.value.joke : this.state.error)
		return (<div>
					<h4>Chuck Norris Joke:</h4>
					<div id="chuck-wrapper">
						<ChuckNorrisJokeButton cnt={counter} onClick={() => this.handleClick()}/>
						<ChuckNorrisJokeDisplay value={val} />
					</div>
				</div>);
	}
}

class RefreshButton extends React.Component {
	render() {
		return (
			<button  onClick={this.props.onClick}>
				Refresh
			</button>
		);
	}
}

class Todo extends React.Component {
	render() {
		return (
			<div className="todo">
				{ this.props.index + ') ' + this.props.text }
			</div>
		);
	}
}

class TodoList extends React.Component {
	renderTodo(index, text) {
		return(
			<Todo index={index} text={text}/>
		);
	}

	render() {
		let list;
		if(this.props.todos)
			list = this.props.todos.map((value) => this.renderTodo(value.id, value.title));
		return (<div id="list-wrapper">
					{list}
				</div>
		);
	}
}

class ListWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
		}
	}

	handleClick() {
		fetch('https://jsonplaceholder.typicode.com/todos')
		.then(response => response.json())
		.then(json => this.setState({todos: json}));
	}

	render() {
		return (<div>
					<h4>Todos:</h4>
					<RefreshButton onClick={() => this.handleClick()}/>
					<TodoList todos={this.state.todos}/>
				</div>);
	}
}

export default class App extends React.Component {
	render() {
		return (
			<div>
				<ChuckNorrisJokeWrapper />
				<ListWrapper/>
			</div>
		);
	}
}
