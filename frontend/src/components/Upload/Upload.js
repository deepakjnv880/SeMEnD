import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import './Upload.css';
import Nvbar from '../Navbar/Navbar';
import './SignIn.css';

class Upload extends React.Component {
  state = {
    file: null,
    written_text: "",
    redirect:false
  }

  fileChangeHandler(event) {
      this.setState({
        file: event.target.files[0],
      });
  }

  fileChangeHandler2(event) {
    this.setState({
      written_text: event.target.value,
    });
  }

  fileUploadHandler(event) {
    const data = new FormData();
    data.append('file',this.state.file);
    data.append('written_text',this.state.written_text);
    data.append('token',JSON.parse(localStorage.getItem('userTokenTime')).token);
    axios.post('/api/upload', data,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      }
    }).then(res => {
      this.setState({
        redirect: true
      });
      console.log("Upload succesfull",res)
    }).catch(err => {
      console.log(`Upload Fail with status: ${err.statusText}`);
    });

  }

  render() {
    if (!localStorage.getItem('userTokenTime')) return <Redirect to="/signIn" />
    if (this.state.redirect) return <Redirect to="/" />;
    var bg=require('./c.jpg')
    return (
      <React.Fragment>
        <Nvbar />
        <div div style={{backgroundImage: "url("+bg+")",backgroundRepeat: "no-repeat",height:"44.5vw",backgroundSize:"100% 100%" ,width:"99.8vw"}}>
        <p style={{visibility:"hidden"}}>smclmslc</p>
          <form style={{padding:"20px",marginTop:"6vw",width:"20vw",marginLeft:"30vw",borderStyle:"groove",borderWidth:"2px"}} method="post" action="/api/upload" encType="multipart/form-data">
              <h4 style={{color:"silver"}}>Write your post here.</h4>
              <textarea
                className="w3-input"
                placeholder="write the content here..."
                style={{backgroundColor:'transparent',color:"white",'resize':"none"}}
                onChange={this.fileChangeHandler2.bind(this)}
              />
              <br/>
              <label style={{fontSize:"0.9vw",color:"silver"}}>Upload Your Image Below if needed</label>
              <br/>
              <input
                type="file"
                name="file"
                style={{backgroundColor:'transparent',color:"white"}}
                onChange={this.fileChangeHandler.bind(this)} />
              <br/>
              <br/>
              <button
                type="button"
                className="btn-success"

                onClick={this.fileUploadHandler.bind(this)}>Submit
              </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Upload;
