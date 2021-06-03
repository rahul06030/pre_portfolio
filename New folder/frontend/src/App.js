import './App.css';
import React, { Component } from "react";
import Education from './components/education';
import Skill from './components/skill';
import Experience from './components/experience';
import Profile from './components/profile';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import Project from './components/project';
// import Image from './components/images';

class App extends Component {
  render() {
    return (
      <>
        <h1 >Portfolio</h1>


        <Profile></Profile>
        <h1>Projects</h1>
        <Project></Project>
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
