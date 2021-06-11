import React from 'react';
import '../App.css';
import './index.css'

class Course extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        courseList:[],

        activeItem:{
            id:null,
            title:'',
            certi_link:'',
            completed_on:"",
            institute:"",
        },
        editing:false,
        makeChanges:false,

      }
      this.fetchCourses = this.fetchCourses.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleMakeChanges = this.handleMakeChanges.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.getCookie = this.getCookie.bind(this)
      this.startEdit = this.startEdit.bind(this)
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
  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

  componentWillMount(){
    this.fetchCourses()
  }

  fetchCourses(){
    fetch('http://127.0.0.1:8000/api/course-list/')
    .then(response => response.json())
    .then(data =>
      this.setState({
        courseList:data
      })
      )
  }

  handleMakeChanges(){
    if(this.state.makeChanges===false){
      this.setState({
       makeChanges:true
    });
  }
    else{
    this.setState({
      makeChanges:false
   });}
  }




  handleChange(e){
    const name = e.target.name
    const value = e.target.value

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        [name]:value

      }
    })
  }

  handleSubmit(e){
    e.preventDefault()
    var csrftoken = this.getCookie('csrftoken')
    var url = `http://127.0.0.1:8000/api/course-create/`

    if(this.state.editing === true){
      url = `http://127.0.0.1:8000/api/course-update/${ this.state.activeItem.id}/`
      this.setState({
        makeChanges:false,
        editing:false
      })
    }

    fetch(url, {
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
      body:JSON.stringify(this.state.activeItem)
    }).then((response)  => {
        this.fetchCourses()
        this.setState({

          makeChanges:false,
          editing:false,
           activeItem:{
            id:null,
            title:'',
            certi_link:'',
            completed_on:"",
            institute:"",
        }
        })
    }).catch(function(error){
      console.log(error)
        this.setState({errorMessage: error.message});

    })

  }

  startEdit(course){
    if(this.props.user!==null){

    this.setState({
      activeItem:course,
      makeChanges:true,
      editing:true,
    })
  }
  }




  render(){
    var courses = this.state.courseList
    var self = this
    return(
        <div className="container "  >
          <div >
             { this.props.user!==null && <button  style={{margin:"1.5rem"}}  onClick={self.handleMakeChanges} className="btn btn-sm btn-outline-danger">{(this.state.makeChanges)?'X' : 'Add'}</button>
       }   </div>
          <div id="course-container" >
             {
              this.state.makeChanges&& <div  id="form-wrapper" onClick={this.handleClick} className="backdrop">

                 <form onSubmit={this.handleSubmit}  id="form">
                    <div className="flex-wrapper">
                          <button  style={{margin:"1rem"}}  onClick={self.handleMakeChanges} className="btn btn-sm btn-outline-danger">{(this.state.makeChanges)?'X' : 'Add'}</button>
                      <div >
                        <input onChange={this.handleChange} className="form-control" id="title" value={this.state.activeItem.title} type="text" name="title" placeholder=" title.." />
                        <input onChange={this.handleChange} className="form-control" id="institute" value={this.state.activeItem.institute} type="text" name="institute" placeholder=" institute.." />
                        <input onChange={this.handleChange} className="form-control" id="completed_on" value={this.state.activeItem.completed_on} type="date" name="completed_on" placeholder="completed_on.." />
                        <input onChange={this.handleChange} className="form-control" id="certi_link" value={this.state.activeItem.certi_link} type="url" name="certi_link" placeholder="certi_link.." />
                         </div>

                         <div style={{flex: 1 ,}}>
                            <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                          </div>
                      </div>
                </form>
                { this.state.errorMessage &&  <h3 className="error"> { this.state.errorMessage } </h3> }

              </div>}

              <div style={{marginLeft:"1.5rem "}}>
                    {courses.map(function(course, index){
                      return(<>
                        <div className="card border-dark mb-3 col-md-6" key={index} onDoubleClick={() => self.startEdit(course)} style={{display:"flex" ,width:"25rem" }}  >
                          <div className="card-header">{course.completed_on}</div>
                          <div className="card-body text-primary">
                            <h5 className="card-title">{course.title}</h5>
                            <p className="card-text">{course.institute}</p>
                            <a href={course.certi_link}   className="card-link" >Click to verify </a>
                          </div>
                        </div>

                          </>
                        )
                    })}
              </div>
          </div>

        </div>
      )
  }
}



export default Course;
