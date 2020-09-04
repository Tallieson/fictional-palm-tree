import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import todos from "./todos"

const todolist = todos.todos
todolist.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
let todoNumber = todolist[0].id

class TodoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }

    // allows functions to acess prop values of the component
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // gets us acess to the sendTodo function, now with 'Apps' parameters bound to it
    this.sendTodo = this.props.func
  }

  handleChange(event) {
    this.setState({
      text: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.sendTodo(this.state.text)
    this.setState({
      text: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' value={this.state.text} onChange={this.handleChange}></input>
        <input type='submit' value='Add Todo'></input>
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: todolist,
      numberOfTodos: todoNumber
    }
  
  this.sendTodo = this.sendTodo.bind(this)
  this.completeTodo = this.completeTodo.bind(this)
  }
  
  completeTodo(id){
    this.setState({
    todos: this.state.todos
    .filter(todo => todo.id === id)
    .map((specificTodo) => {
      specificTodo.completed = !specificTodo.completed
      return specificTodo
    })
  })
  }

  sendTodo(newTodo){
    this.setState({
      todos: this.state.todos.concat({
        "id": this.state.NumberOfTodos + 1,
        "text": newTodo,
        "completed": false
      }),
      numberOfTodos: this.state.numberOfTodos + 1
    })
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">All</Link>
              </li>
              <li>
                <Link to="/not_done">Not Done</Link>
              </li>
              <li>
                <Link to="/done">Done</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/not_done">
              <Todos sendTodo={this.sendTodo} completeTodo={this.completeTodo} todos={this.state.todos.filter(todo => !todo.completed)} />
            </Route>
            <Route path="/done">
              <Todos sendTodo={this.sendTodo} completeTodo={this.completeTodo} todos={this.state.todos.filter(todo => todo.completed)} />
            </Route>
            <Route path="/">
              <Todos sendTodo={this.sendTodo} completeTodo={this.completeTodo} todos={this.state.todos} />
            </Route>
          </Switch>
        </div>
      </Router>
    );

    function Todos(props) {
      let listOfTodos = props.todos
      return (
        <div>
          <div>
            <h2>Todos</h2>
            {listOfTodos.map((todo) => 
              <li key={todo.id}>
                <span>{todo.text}</span>
                <button onClick={() => props.completeTodo(todo.id)}>✔</button>
              </li>)}
          </div>
          <div>
            <TodoForm func={props.sendTodo}></TodoForm>
          </div>
        </div>
      )
    }
  }
}

export default App
// this.setState({ todos: this.state.todos.concat(newTodo) })


// class todoForm extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       text: ''
//     }
//     // 
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//     // gets us acess to the sendTodo function, now with 'Apps' parameters bound to it
//     this.sendTodo = this.props.func
//   }

//   handleChange(event) {
//     this.setState({
//       text: event.target.value
//     })
//   }

//   handleSubmit(event) {
//     event.preventDefault()
//     this.sendTodo({
//       "text":this.state.text
//     })
//     this.setState({
//       text: ''
//     })
//   }

//   render(){
//     return(
//       <form onSubmit= {this.handleSubmit}>
//         <input type='text' value={this.state.text} onChange={this.handleChange}></input>
//         <input type='submit' value='Add Todo'></input>
//       </form>
//     )
//   }
// }

// class App extends React.Component {
//   constructor(props){
//     super(props)
//     this.state ={
//     todos: []
//   }
//   //binding this function uses the state of this form, rather then the state of where it's called
//   // otherwise it would only have access to the state in the constructor it is called from
//   this.sendTodo = this.sendTodo.bind(this)
// }

//   sendTodo(finalMessage){
//     socket.emit('chat message', finalMessage)
//   }

//  //runs as soon as the component is mounted to the DOM
//   componentDidMount(){
//     fetch('/todos')
//     .then(response => response.json())
//     .then(todos => {
//       this.setState({todos: todos})
//     })
//     socket.on('chat message', msg => {
//       console.log('Got a message:', msg)
//       let finalMessages = this.state.messages
//       finalMessages.push(msg)
//       this.setState({
//         messages: finalMessages
//       })
//     })
//   }

//   render(){  
//     return(
//     <div>
//         <Chatter messages={this.state.messages}/>
//         {/* passing sendTodo so we can get access to this constructors state where it is called */}
//         <MessageForm nick={this.state.nick} room={this.state.room} func={this.sendTodo}/>
//     </div>
//     )
//   }
// }

