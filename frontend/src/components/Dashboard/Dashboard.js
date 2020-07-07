import React from 'react';
import {Redirect } from 'react-router-dom';
import axios from 'axios';

import { Linkedin,Facebook,Instagram,GitHub } from 'react-feather';

import './Dashboard.css';
import Nvbar from '../Navbar/Navbar';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    let shouldRedirect = false;
    if (localStorage.getItem('userTokenTime')) {
      // Check if user holds token which is valid in accordance to time
      const data = JSON.parse(localStorage.getItem('userTokenTime'));
      if (new Date().getTime() - data.time > (1 * 60 * 60 * 1000)) {
        // It's been more than hour since you have visited dashboard
        localStorage.removeItem('userTokenTime');
        shouldRedirect = true;
      }
    } else {
      shouldRedirect = true;
    }

    this.state = {
      redirect: shouldRedirect,
      postList: [],
      refersh:false
    }
    this.deepak = this.deepak.bind(this);
    this.myonclick = this.myonclick.bind(this);
  }

  myonclick(e){
    axios.post('/api/update', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      },
      info:{
        post_id:e.target.id
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
    window.location.href = window.location.href;
  }

  deepak(props){
      if(!props.taken_by){
        return (
        <button id={props.id} name={props.taken_by} onClick={this.myonclick} style={{float:"right" , backgroundColor:"red"}}>Not taken</button>
        );
      }
      else{
        return <button id={props.id} name={props.taken_by} onClick={this.myonclick} style={{float:"right", backgroundColor:"lightblue"}}>Taken by {props.taken_by}</button>;
      }
  }

  componentDidMount() {
    if (localStorage.getItem('userTokenTime')) {
      axios.get('/api/postLists', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
        }
      }).then(res => {
        this.setState({
          postList: res.data
        });
      });
    }
  }

  render() {
    if (this.state.redirect) return <Redirect to="/signIn" />
    const posts = this.state.postList.map(post => {
      return (
        <div style={{marginBottom:"2vw"}} class="card">
          <div class="card-header">
            <label style={{float:"left"}}>{post.creater}</label>
            <this.deepak taken_by={post.taken_by} id={post._id}/>
          </div>
          <div class="card-body">{post.text}</div>
          <img onError={i => i.target.style.display='none'} class="card-img-bottom" alt="" src={"http://localhost:3333/"+post.image_path} ></img>
        </div>
      );
    });

    return (
      <React.Fragment>
        <Nvbar />

        <div class="row">
          <div class="column1" style={{backgroundColor:"lightsilver"}}>
            <img style={{width:"100%"}} src={require('./sem1.png')} alt="dlvdm" />
            <br/>
            <br/>
            <img style={{width:"100%"}} src={require('./sem3.png')} alt="dlvdm" />
          </div>
          <div class="column2" style={{backgroundColor:'#949494'}}>
            {posts}
          </div>
          <div class="column3" style={{backgroundColor:"lightsilver"}}>
            <img style={{width:"100%"}} src={require('./sem2.png')} alt="dlvdm" />
            <br/>
            <br/>
            
            <img style={{width:"100%"}} src={require('./sem4.png')} alt="dlvdm" />
          </div>
        </div>
        <div style={{backgroundColor:"black"}} class="footer">
          <br/>
          <h4> Address and Phone </h4>
          <h6>Deepak Kumar<br/>Near Bright career public school<br/>Samastipur, Bihar 848101 India<br/>+91 9709214184</h6>
          <br/>
          <h4> Emails </h4>
          <h6>{"deepakkumar.dakshana17@gmail.com"}<br/>{"B17039@students.iitmandi.ac.in"}</h6>
          <br/>
          <a href="https://www.linkedin.com/in/deepakjnv880/" target="_blank"><Linkedin color="blue" size={48} /></a>
          <a  href="https://www.facebook.com/deepak.jnv.3" target="blank"><Facebook color="blue" size={48} /></a>
          <a href="https://www.instagram.com/deepak.jnv/" target="_blank" ><Instagram color="blue" size={48} /> </a>
          <a href="https://github.com/deepakjnv880" target="_blank"><GitHub color="blue" size={48} /> </a> 
          <br/><br/>
          <label><font size="3"> Copyright @ All Rights reserved.</font></label>
        </div>
      </React.Fragment>
    );
  }
}
export default Dashboard;