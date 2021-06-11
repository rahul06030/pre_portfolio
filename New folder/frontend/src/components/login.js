import React , { Component } from "react";
import firebase from '../firebase'
import '../App.css';
import './index.css';
class Login extends Component{
constructor(props)
{
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state={
        errorMessage: '',        
        email : "",
        password : ""
    }
}
login(e){
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
    }).catch((err)=>{
        this.setState({errorMessage: err.message});
    })
}
signup(e){
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
    }).catch((err)=>{
        this.setState({errorMessage: err.message});
    })
}
handleChange(e){
    this.setState({
        [e.target.name] : e.target.value,
    })
}
render()
{
    return(

        <div className="card bg-primary text-white mb-3 col-md-6">
        <div className="card-body">


        <form  id="form">
        <div className="form-group">
        <input type="email" className="form-control"  placeholder="Enter email" name='email'   onChange={this.handleChange}  value={this.state.email} />
        </div>
        <div className="form-group">
        <input type="password" className="form-control"   onChange={this.handleChange} name='password' value={this.state.password} placeholder="Password"/>
        </div>
        <div >
            <button  type="submit" className="btn btn-primary" onClick={this.login}>Login</button>
            <button  type="submit" className="btn btn-primary" onClick={this.signup}>Signup</button>
        </div>
        </form>
        { this.state.errorMessage &&  <h3 className="error"> { this.state.errorMessage } </h3> }
        </div>
        </div>
    )
}
}
export default Login;