import React, { Component } from 'react'
import '../App.css';
import './index.css';
import { FaGithubSquare } from 'react-icons/fa';
export class View extends Component {
    constructor(props){
        super(props);
          this.state = {
            expList:[],
            progress:0,
            activeItem:props.item,
            editing:false,
            makeChanges:false,
    
          }

          this.handleClick = this.handleClick.bind(this)
        };
        handleClick = (e) => {
          if (e.target.classList.contains('backdrop')) {
            this.setState({
              makeChanges:false,
              editing:false,
            });
          }
        }

    render() {
        var exp=this.props.item
        return (
            <div className="view" onClick={()=>this.props.handle(this.props.item)}>
                <div className="card  "  key={exp.id} >
                    <img className="card-img-top images" src={exp.image_url} alt={exp.title}/>
                    <div className="card-body">
                        <h5 className="card-title">{exp.title} </h5>
                        <p className="card-text">{exp.description} <br/> {exp.tools}</p>
                        { exp.github && <a className="fa" href={exp.github}><FaGithubSquare/></a>}
                    </div>
                </div>
            </div>
        )
    }
}

export default View
