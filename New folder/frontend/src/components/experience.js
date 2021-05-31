import React from 'react';
import '../App.css';


class Experience extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        expList:[],
        activeItem:{
          id:null,
          title:'',
          description:'',
          year:"",
        },
        editing:false,
        makeChanges:false,

      }
      this.fetchExps = this.fetchExps.bind(this)
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
    this.fetchExps()
  }

  fetchExps(){
    fetch('http://127.0.0.1:8000/api/experience-list/')
    .then(response => response.json())
    .then(data =>
      this.setState({
        expList:data
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
    var url = `http://127.0.0.1:8000/api/experience-create/`

    if(this.state.editing === true){
      url = `http://127.0.0.1:8000/api/experience-update/${ this.state.activeItem.id}/`
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
        this.fetchExps()
        this.setState({
           activeItem:{
            id:null,
            title:'',
            description:'',
            year:"",
        }
        })
    }).catch(function(error){
      console.log('ERROR:', error)
    })

  }

  startEdit(exp){
    this.setState({
      activeItem:exp,
      makeChanges:true,
      editing:true,
    })
  }




  render(){
    var exps = this.state.expList
    var self = this
    return(
        <div className="container">
                            <div >
                                <button  style={{margin:"0 auto"}}  onClick={self.handleMakeChanges} className="btn btn-sm btn-outline-danger">{(this.state.makeChanges)?'X' : 'Add'}</button>
                            </div>
          <div id="exp-container" style={{maxWidth:"65%" , margin:"0 auto"}}>
             {
              this.state.makeChanges&& <div  id="form-wrapper">
                 <form onSubmit={this.handleSubmit}  id="form">
                    <div className="flex-wrapper">
                        <div >
                        <input onChange={this.handleChange} className="form-control" id="title" value={this.state.activeItem.title} type="text" name="title" placeholder=" title.." />
                        <input onChange={this.handleChange} className="form-control" id="description" value={this.state.activeItem.description} type="text" name="description" placeholder=" description.." />
                        <input onChange={this.handleChange} className="form-control" id="year" value={this.state.activeItem.year} type="text" name="year" placeholder="Year.." />
                         </div>

                         <div style={{flex: 1}}>
                            <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                          </div>
                      </div>
                </form>
              </div>}

              <div  id="list-wrapper" style={{maxWidth:"65%" , margin:"0 auto"}}>
                    {exps.map(function(exp, index){
                      return(
                          <div key={index} onDoubleClick={() => self.startEdit(exp)}  className="exp-wrapper flex-wrapper">
                          <div>
                          <span>{exp.title}</span><br/>
                          <span>{exp.description}</span><br/>
                          <span>{exp.year}</span><br/>

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



export default Experience;
