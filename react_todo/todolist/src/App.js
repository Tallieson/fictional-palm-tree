import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">All</Link>
            </li>
            <li>
              <Link to="/todo">Todo</Link>
            </li>
            <li>
              <Link to="/done">Done</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/">
            <All />
          </Route>
          <Route path="/todo">
            <Todo />
          </Route>
          <Route path="/done">
            <Done />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function All() {
  return <h2>All</h2>;
}

function Todo() {
  return <h2>Todo</h2>;
}

function Done() {
  return <h2>Done</h2>;
}




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

