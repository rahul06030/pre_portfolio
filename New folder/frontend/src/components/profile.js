import React from 'react';
import '../App.css';
import './index.css';
import { FaGithubSquare ,FaLinkedin ,FaInstagram} from 'react-icons/fa';


class Profile extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        profileList:[],
        activeItem:{
            id:null,
            first_name:'',
            last_name:'',
            date_of_birth:'',
            email_address:'',
            phone_number:'',
            bio:'',
            github:'',
            linkedin:'',
            instagram:'',
  

        },
        editing:false,
        makeChanges:false,

      }
      this.fetchProfiles = this.fetchProfiles.bind(this)
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
    this.fetchProfiles()
  }

  fetchProfiles(){
    fetch('http://127.0.0.1:8000/api/profile-view/')
    .then(response => response.json())
    .then(data =>
      this.setState({
        profileList:data
      })
      )

  }

  handleMakeChanges(){
    if( this.state.makeChanges===false){
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
    var url = `http://127.0.0.1:8000/api/profile-create/`

    if(this.state.editing === true){
      url = `http://127.0.0.1:8000/api/profile-update/${ this.state.activeItem.id}/`
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
        this.fetchProfiles()
        this.setState({
          makeChanges:false,
          editing:false,
           activeItem:{
            id:null,
            first_name:'',
            last_name:'',
            date_of_birth:'',
            email_address:'',
            phone_number:'',
            bio:"",
            github:"",
            linkedin:'',
            instagram:'',
  
        }
        })
    }).catch(function(error){
      console.log('ERROR:', error)
    })

  }

  startEdit(profile){
    if(this.props.user!==null){
    this.setState({
      activeItem:profile,
      makeChanges:true,
      editing:true,
    })
  }
  }




  render(){
    var profile = this.state.profileList    
    var self = this
    const index=1;  
    return(


<>


              {
                ((profile.id==null) || this.state.makeChanges )&& this.props.user!==null && <div >
                  <button  style={{margin:"1.5rem"}}   onClick={self.handleMakeChanges} className="btn btn-sm btn-outline-danger">{(this.state.makeChanges)?'X' : 'Add'}</button>
              </div> 
              }
             {  this.state.makeChanges 
                     && 
             <div id="form-wrapper"  >

                 <form onSubmit={this.handleSubmit}  id="form">
                    <div className="flex-wrapper">
                        <div  >
                        <input onChange={this.handleChange} className="form-control" id="first_name" value={this.state.activeItem.first_name} type="text" name="first_name" placeholder=" first_name.." />
                        <input onChange={this.handleChange} className="form-control" id="last_name" value={this.state.activeItem.last_name} type="text" name="last_name" placeholder=" last_name.." />
                        <input onChange={this.handleChange} className="form-control" id="date_of_birth" value={this.state.activeItem.date_of_birth} type="date" name="date_of_birth" placeholder="date_of_birth.." />
                        <input onChange={this.handleChange} className="form-control" id="email_address" value={this.state.activeItem.email_address} type="email" name="email_address" placeholder="email_address.." />
                        <input onChange={this.handleChange} className="form-control" id="phone_number" value={this.state.activeItem.phone_number} type="text" name="phone_number" placeholder="phone_number.." />
                        <input onChange={this.handleChange} className="form-control" id="bio" value={this.state.activeItem.bio} type="text" name="bio" placeholder="bio.." />
                        <input onChange={this.handleChange} className="form-control" id="github" value={this.state.activeItem.github} type="url" name="github" placeholder="github.." />
                        <input onChange={this.handleChange} className="form-control" id="linkedin" value={this.state.activeItem.linkedin} type="url" name="linkedin" placeholder="linkedin.." />
                        <input onChange={this.handleChange} className="form-control" id="instagram" value={this.state.activeItem.instagram} type="url" name="instagram" placeholder="instagram.." />
                      </div>

                        <div style={{flex: 1}}>
                          <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                        </div>
                  </div>
                </form>

              </div>}

              <div  id="list-wrapper " className="profile">
               {
                profile.id!=null 
                      && 
                <div className="jumbotron " key={index} onDoubleClick={() => self.startEdit(profile)}>
                  <h1 className="display-4">{profile.first_name}     {profile.last_name}</h1>
                  <p className="lead">{profile.bio}</p>
                  <hr className="my-4" />
                  <p> 
                      { profile.github && <a className="fa " href={profile.github}><FaGithubSquare/></a>}
                      { profile.linkedin&& <a className="fa " href={profile.linkedin}  ><FaLinkedin/></a>}
                      { profile.instagra&&<a className="fa " href={profile.instagram}  ><FaInstagram/></a>}
                  </p>
                  <h6 className="lead">
                      <label> Contact : {profile.phone_number}</label> 
                      <label> Email:  {profile.email_address} </label><br/>
                      <label> Birth date:  {profile.date_of_birth}   </label><br/>
                      <p className="pullRight" style={{right:"30px",textAlign:"right" }}>Last updated on: {profile.updated_on}</p>
                  </h6>
                </div>}
         </div>
</>
      )
  }
}


export default Profile;
