import React from 'react';


class Skill extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        skillList:[],
        activeItem:{
          id:null,
          name:'',

        },
        editing:false,
        makeChanges:false,

      }
      this.fetchSkills = this.fetchSkills.bind(this)
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
    this.fetchSkills()
  }

  fetchSkills(){
    fetch('http://127.0.0.1:8000/api/skill-list/')
    .then(response => response.json())
    .then(data =>
      this.setState({
        skillList:data
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
    const value = e.target.value

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        name:value

      }
    })
  }

  handleSubmit(e){
    e.preventDefault()
    var csrftoken = this.getCookie('csrftoken')
    var url = `http://127.0.0.1:8000/api/skill-create/`

    if(this.state.editing === true){
      url = `http://127.0.0.1:8000/api/skill-update/${ this.state.activeItem.id}/`
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
        this.fetchSkills()
        this.setState({
           activeItem:{
            id:null,
            name:'',
 
        }
        })
    }).catch(function(error){
      console.log('ERROR:', error)
    })

  }

  startEdit(skill){
    if(this.props.user!==null){

    this.setState({
      activeItem:skill,
      makeChanges:true,
      editing:true,
    })
  }
  }




  render(){
    var skills = this.state.skillList
    var self = this
    return(
        <div className="container">

        <h1>My Skills</h1>
  
                            <div>
                  {this.props.user!==null && <button   style={{margin:"0 auto", margin:"5px"}} onClick={self.handleMakeChanges} className="btn btn-sm btn-outline-danger">{(this.state.makeChanges)?'X' : 'Add'}</button>
                           } </div>
          <div id="skill-container">
             { this.state.makeChanges
             &&
              <div  id="form-wrapper" className="backdrop" onClick={this.handleClick} >
                 <form onSubmit={this.handleSubmit}  id="form">
                 <button   style={{margin:"1rem"}} onClick={self.handleMakeChanges} className="btn btn-sm btn-outline-danger">{(this.state.makeChanges)?'X' : 'Add'}</button>
      <div className="flex-wrapper">
                        <div style={{flex: 6}}>
                        <input onChange={this.handleChange} className="form-control" id="name" value={this.state.activeItem.name} type="text" name="name" placeholder=" Skill.." />
                    </div>
                         <div style={{flex: 1}}>
                            <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                          </div>
                      </div>
                </form>
              </div>}

              <div  id="list-wrapper">
                    {skills.map(function(skill, index){
                      return(
                          <span  key={index} onDoubleClick={() => self.startEdit(skill)} >
                            
                          <button  style={{color:"black", borderRadius:"20px" , margin:"1rem"}}   className="btn btn-md btn-outline-success">
                                    {skill.name}
                          </button>
                        </span> 
                        )
                    })}
              </div>
          </div>

        </div>
      )
  }
}



export default Skill;
