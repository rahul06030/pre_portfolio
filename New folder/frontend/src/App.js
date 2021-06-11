import './App.css';
import'bootstrap/dist/css/bootstrap.min.css';
import'./components/index.css';
import'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from "react";
import Education from './components/education';
import Skill from './components/skill';
import Experience from './components/experience';
import Profile from './components/profile';
import Project from './components/project';
import Course from './components/course';
import Login from './components/login';
import firebase from './firebase';

class App extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      user : {}
    }
  }
  componentDidMount()
  {
    this.authListener();
  }
  authListener(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user)
      {
        this.setState({user})
      }
      else{
        this.setState({user : null})
      }
    })
  }
  logout(){
  firebase.auth().signOut();
}
     
  render() {
    return (
      <>
<Login></Login>
      <div className="App">
        {this.state.user &&
       <button onClick={this.logout}>Logout</button>}
      </div>

        <Profile user={this.state.user} ></Profile>
        <br/>
        <Skill user={this.state.user}></Skill>
        <br/>
        <Project user={this.state.user}></Project>     
        <br/>
        <div  className="table-wrapper-scroll-y my-custom-scrollbar">
          <table className="table table-bordered border-4">
            <thead> 
              <tr> 
                <th><h1>Education</h1></th>
                <th><h1>Courses and Certificates</h1></th>
              </tr>
          </thead>
          <tbody className="tbody ">
            <tr>
                <td><Education user={this.state.user}> </Education></td>
                <td>  <Course user={this.state.user}></Course></td>
            </tr>
          </tbody>
          </table>
          </div>
        <Experience user={this.state.user}></Experience>  

      </>
    );
  }
}

export default App;
