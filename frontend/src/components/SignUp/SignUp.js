import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
import Nvbar from '../Navbar/Navbar';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      redirect: localStorage.getItem('userTokenTime') ? true : false
    }

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.firstNameInputChangeHandler = this.firstNameInputChangeHandler.bind(this);
    this.lastNameInputChangeHandler = this.lastNameInputChangeHandler.bind(this);
    this.emailInputChangeHandler = this.emailInputChangeHandler.bind(this);
    this.passwordInputChangeHandler = this.passwordInputChangeHandler.bind(this);
  }

  onSubmitHandler (e) {
    e.preventDefault();
    if (!(this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.password === '')
      && (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email))) {
      axios.post('/api/signUp', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      }).then(res => {
        console.log(res);
        this.setState({
          redirect: true
        });
      }).catch(err => {
        console.log(err);
      });
    } else {
      alert('Please enter valid details');
    }
  }

  firstNameInputChangeHandler(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  lastNameInputChangeHandler(event) {
    this.setState({
      lastName: event.target.value
    });
  }

  emailInputChangeHandler(event) {
    this.setState({
      email: event.target.value
    });
  }

  passwordInputChangeHandler(event) {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    if (this.state.redirect) return <Redirect to='/' />
    var bg=require('./b.jpeg')
    return (
      <React.Fragment>
      <Nvbar/>
      <div style={{backgroundImage: "url("+bg+")",backgroundRepeat: "no-repeat",height:"44.5vw",backgroundSize:"100% 100%" ,width:"99.8vw"}}>
        <p style={{visibility:"hidden"}}>smclmslc</p>
        <form style={{padding:"20px",marginTop:"6vw",width:"18vw",marginLeft:"30vw",borderStyle:"groove",borderWidth:"2px"}} onSubmit={this.onSubmitHandler.bind(this)}>
          <h3 style={{color:"silver"}} >Register Now</h3>
            <input
              style={{backgroundColor:'transparent',color:"white"}}
              id="first-name"
              className="w3-input"
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={this.firstNameInputChangeHandler}
              required 
            />
            <input
              style={{backgroundColor:'transparent',color:"white"}}
              id="last-name"
              className="w3-input"
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={this.lastNameInputChangeHandler}
              required 
            />
            <input
              style={{backgroundColor:'transparent',color:"white"}}
              id="email"
              className="w3-input"
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.emailInputChangeHandler}
              required />          
            <input
              style={{backgroundColor:'transparent',color:"white"}}
              id="password"
              className="w3-input"
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.passwordInputChangeHandler}
              required 
            />
            <br/>
            <input type="submit" name="submit" className="btn-success" value="Submit" />          <br/><br/>
            <Link to="/signIn" className="text-info">Login here</Link>
        </form>
      </div>
      </React.Fragment>
    );
  }
}

export default SignIn;


