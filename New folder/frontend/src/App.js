import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Education from './components/education';
import Skill from './components/skill';
import Experience from './components/experience';
import Profile from './components/profile';

class App extends Component {
  render() {
    return (
      <>
        <h1 >Portfolio</h1>
        <Profile></Profile>
        <h1>Eduction </h1>
       <Education></Education>
       <h1>My Skills</h1>
       <Skill></Skill>
       <h1>My Experience</h1>
       <Experience></Experience>
      </>
    );
  }
}

export default App;
