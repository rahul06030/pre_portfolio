import React from 'react';
import '../App.css';
import { FaGithubSquare ,FaLinkedin ,FaInstagram} from 'react-icons/fa';
import firebase from '../firebase'

class Project extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        expList:[],
        progress:0,
        activeItem:{
            id:null,
            title:'',
            description:'',
            image_url:'',
            tools:'',
            github:'',
  

        },
        file:null,
        editing:false,
        makeChanges:false,

      }
      this.fetchExps = this.fetchExps.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleMakeChanges = this.handleMakeChanges.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.getCookie = this.getCookie.bind(this)
      this.startEdit = this.startEdit.bind(this)
      this.handleImage = this.handleImage.bind(this)
      this.getDownloadUrl = this.getDownloadUrl.bind(this)
  };

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
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
    fetch('http://127.0.0.1:8000/api/project-list/')
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

handleImage(e){
  const types =[ 'image/png', 'image/jpeg', 'image/jpg'  ,'img/jpeg', 'img/jpg' ];
    const files=e.target.files[0];
  if(types.includes(files.type)){
    this.setState({
      file:files
    }) 
    this.getDownloadUrl(files)

  }

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


getDownloadUrl(file){
      
        console.log(file.name)
        const storageRef=firebase.storage().ref(`project/${file.name}`)
        let uploadTask=storageRef.put(file)
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({
                  ...this.state,
                  progress:progress
                })
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                  case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Uploading');
                    break;
                }
              }, 
              (error) => {
                console.log(error)
              }, 
              () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  console.log("Active", this.state.activeItem)  
                  this.setState({
                    ...this.state,
                    activeItem:{
                      ...this.state.activeItem,
                    image_url:downloadURL,
                    },
                  })
                  console.log("Inactive", this.state.activeItem)  
    
                });
              })
         }








  handleSubmit(e){  

 
    e.preventDefault()

    var csrftoken = this.getCookie('csrftoken')
    var url = `http://127.0.0.1:8000/api/project-create/`

    if(this.state.editing === true){
      url = `http://127.0.0.1:8000/api/project-update/${ this.state.activeItem.id}/`
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
            image_url:'',
            tools:'',
            github:'',
  
        },
        file:null,

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
                        <input onChange={this.handleChange} className="form-control" id="tools" value={this.state.activeItem.tools} type="text" name="tools" placeholder="tools.." />
                        <input onChange={this.handleChange} className="form-control" id="github" value={this.state.activeItem.github} type="url" name="github" placeholder="github.." />
                        <div> 
                            <input id="image"type='file' onChange={this.handleImage } /> 
                            {/* <button onClick={this.getDownloadUrl} >Upload</button> */}
                        </div>

                        
                     
                        </div>

                         <div style={{flex: 1}}>
                            <h5 style={{display:`${ (this.state.progress>0 &&this.state.progress<100)?'block':'none'}`}}> Uploading image{~~this.state.progress}% done</h5>

                            {  
                              (this.state.progress==100) && <>
                                    <h6>Uploaded Image </h6>
                                    <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                                </>
                                }           </div>
                      </div>
                </form>
              </div>}

              <div  id="list-wrapper" style={{maxWidth:"65%" , margin:"0 auto"}}>
              {exps.map(function(exp, index){
                    return(
                        
                         <div key={index} onDoubleClick={() => self.startEdit(exp)}  className="exp-wrapper flex-wrapper">
                          <div>
                         <span>{exp.title}   </span><br/>
                         <span>{exp.description}  </span><br/>
                          <span>{exp.tools}</span><br/>

                          <span>  <img  src={exp.image_url}  alt={exp.title}/> </span><br/>
                          <span>
                           { exp.github && <a className="fa " href={exp.github}><FaGithubSquare/></a>}
                            </span>
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



export default Project;
