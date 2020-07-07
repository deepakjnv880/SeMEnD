import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';
import Nvbar from '../Navbar/Navbar';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      token: '',
      redirect: localStorage.getItem('userTokenTime') ? true : false
    }

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.emailInputChangeHandler = this.emailInputChangeHandler.bind(this);
    this.passwordInputChangeHandler = this.passwordInputChangeHandler.bind(this);
  }

  onSubmitHandler() {
    if (!(this.state.email === '' || this.state.password === '')
      && (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email))) {
      axios.post('/api/signIn', {
        email: this.state.email,
        password: this.state.password
      }).then(res => {
        console.log("dfndslfsd=========> ",res);
        this.setState({
          token: res.data.token
        });
        const data = {
          token: this.state.token,
          time: new Date().getTime()
        }
        localStorage.setItem('userTokenTime', JSON.stringify(data));
        this.setState({
          redirect: true
        });
      }).catch(err => {
        console.log("error aa gya === ",err);
      });
    } else {
      alert('Please enter valid details');
    }
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
    if (this.state.redirect) return <Redirect to="/" />;
    var bg=require('./b.jpeg')
    return (
      <React.Fragment>
      <Nvbar/>
      <div style={{backgroundImage: "url("+bg+")",backgroundRepeat: "no-repeat",height:"44.5vw",backgroundSize:"100% 100%" ,width:"99.8vw"}}>
        <p style={{visibility:"hidden"}}>smclmslc</p>
        <form style={{padding:"20px",marginTop:"6vw",width:"18vw",marginLeft:"30vw",borderStyle:"groove",borderWidth:"2px"}} onSubmit={this.onSubmitHandler.bind(this)}>
          <fieldset style={{color:"green"}}>
          <h3 style={{color:"silver"}}>Login now</h3>
          <input
              className="w3-input"
              id="email"
              style={{backgroundColor:'transparent',color:"white"}}
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.emailInputChangeHandler}
              required 
          />
          <input
              className="w3-input"
              id="password"
              style={{backgroundColor:'transparent',color:"white"}}
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.passwordInputChangeHandler}
              required 
          />
          <br/>
          <button onClick={this.onSubmitHandler} className="btn-success" type="button">Submit</button>
          <br/><br/>
          <Link to="/signUp" className="text-info">Sign Up here</Link>
          </fieldset>
        </form>
      </div>
      </React.Fragment>
    );
  }
}

export default SignIn;