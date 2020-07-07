import React from 'react';
import { Route } from 'react-router-dom';
import Upload from './components/Upload/Upload';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import SignOut from './components/signOut/SignOut';
// import Nvbar from './components/Navbar/Navbar'; // not resolved yet

function App() {
  return (
    <div>
      {/* <Nvbar/> */}
      <React.Fragment>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/signOut" component={SignOut} />
      </React.Fragment>
    </div>
  );
}

export default App;