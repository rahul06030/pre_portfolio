// import React, { Component } from 'react'
// import firebase from "../firebase"
// export class Images extends Component {
//     constructor(props){
//     super(props);
//         this.state={
//             files:[]
//         }

//         this.getDownloadUrl = this.getDownloadUrl.bind(this);
//         this.save = this.save.bind(this);


// }
// handleChange=(e)=>{
//     for(let i=0; i<e.target.files.length;i++){
//     var file=e.target.files[i]
//     this.setState(state => {
//         const files = [...state.files, file]; 
//         return {
//                 files
//               };
//         });
// }

// }

// save(){
//     console.log("r", this.state.files.length)
//     for(let i=0; i<this.state.files.length;i++){
//         var file=this.state.files[i]
//             console.log("Current " ,file.name)
//     }
//         // let storageRef=firebase.storage().ref(`project/${file.name}`)
//         // let uploadTask=storageRef.put(file)
//         // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
//         //     (snapshot) => {
//         //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         //         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         //         console.log('Upload is ' + progress + '% done');
//         //         switch (snapshot.state) {
//         //           case firebase.storage.TaskState.PAUSED: // or 'paused'
//         //             console.log('Upload is paused');
//         //             break;
//         //           case firebase.storage.TaskState.RUNNING: // or 'running'
//         //             console.log('Uploading');
//         //             break;
//         //         }
//         //       }, 
//         //       (error) => {
//         //         console.log(error)
//         //       }, 
//         //       () => {
//         //         // Upload completed successfully, now we can get the download URL
//         //         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//         //           const firestoreRef=firebase.firestore().collection(`${this.props.title}/`)
//         //           firestoreRef.add({downloadURL})
//         //                         // console.log('File available at', downloadURL);
    
//         //         });
//         //       })
         
// // }
// }

// handleSave=()=>{
// console.log("clicked")
//     this.save()
// } 


// getDownloadUrl(){
// //      console.log(this.state.files[0].name)
// //    firebase.storage().ref(`project/${this.state.files[0].name}`).getDownloadURL().then(function(url) {
// //         // we get correct URL in the console, but when we click on the 'a' the page just refresh...
// //         console.log( "Got download url: ", url );
//         // var link_item = document.getElementById('download-link')
//         // link_item.setAttribute('href', url)
//     // });
// }


//     render() {
//         return (
//             <div>
//                 <input id="image"type='file' onChange={this.handleChange } multiple/> 
//                 <button id='uplaod' onClick={this.handleSave}>Upload </button>
//             </div>
//         )
//     }
// }

// export default Images
