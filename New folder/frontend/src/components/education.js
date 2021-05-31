import React from 'react';
import '../App.css';


class Education extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        eduList:[],
        activeItem:{
          id:null,
          title:'',
          college:'',
          year:"",
        },
        editing:false,
        makeChanges:false,

      }
      this.fetchEdus = this.fetchEdus.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleMakeChanges = this.handleMakeChanges.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.getCookie = this.getCookie.bind(this)
      this.startEdit = this.startEdit.bind(this)
  };

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
    this.fetchEdus()
  }

  fetchEdus(){
    fetch('http://127.0.0.1:8000/api/education-list/')
    .then(response => response.json())
    .then(data =>
      this.setState({
        eduList:data
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
    var url = `http://127.0.0.1:8000/api/education-create/`

    if(this.state.editing === true){
      url = `http://127.0.0.1:8000/api/education-update/${ this.state.activeItem.id}/`
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
        this.fetchEdus()
        this.setState({
           activeItem:{
            id:null,
            title:'',
            college:'',
            year:"",
        }
        })
    }).catch(function(error){
      console.log('ERROR:', error)
    })

  }

  startEdit(edu){
    this.setState({
      activeItem:edu,
      makeChanges:true,
      editing:true,
    })
  }




  render(){
    var edus = this.state.eduList
    var self = this
    return(
        <div className="container">
                            <div >
                                <button  style={{margin:"0 auto"}}  onClick={self.handleMakeChanges} className="btn btn-sm btn-outline-danger">{(this.state.makeChanges)?'X' : 'Add'}</button>
                            </div>
          <div id="edu-container" style={{maxWidth:"65%" , margin:"0 auto"}}>
             {
              this.state.makeChanges&& <div  id="form-wrapper">
                 <form onSubmit={this.handleSubmit}  id="form">
                    <div className="flex-wrapper">
                        <div >
                        <input onChange={this.handleChange} className="form-control" id="title" value={this.state.activeItem.title} type="text" name="title" placeholder=" title.." />
                        <input onChange={this.handleChange} className="form-control" id="college" value={this.state.activeItem.college} type="text" name="college" placeholder=" college.." />
                        <input onChange={this.handleChange} className="form-control" id="year" value={this.state.activeItem.year} type="text" name="year" placeholder="Year.." />
                         </div>

                         <div style={{flex: 1}}>
                            <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                          </div>
                      </div>
                </form>
              </div>}

              <div  id="list-wrapper" style={{maxWidth:"65%" , margin:"0 auto"}}>
                    {edus.map(function(edu, index){
                      return(
                          <div key={index} onDoubleClick={() => self.startEdit(edu)}  className="edu-wrapper flex-wrapper">
                          <div>
                          <span>{edu.title}</span><br/>
                          <span>{edu.college}</span><br/>
                          <span>{edu.year}</span><br/>

                          </div>
                          <hr />
                          </div>
                        )
                    })}
              </div>
          </div>

        </div>
      )
  }
}



export default Education;
