import React from "react";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import UpdateEmail from "./UpdateEmail";
import ForgotPassword from "./ForgotPassword";

import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
   return (
      <Container
         style={{ minHeight: "100vh" }}
         className='d-flex align-items-center justify-content-center'
      >
         <div className='w-100' style={{ maxWidth: "400px" }}>
            <Router>
               <AuthProvider>
                  <Switch>
                     <PrivateRoute exact path='/' component={Dashboard} />
                     <PrivateRoute path='/update-profile' component={UpdateEmail} />
                     <Route path='/signup' component={SignUp} />
                     <Route path='/Login' component={Login} />
                     <Route path='/forgot-password' component={ForgotPassword} />
                  </Switch>
               </AuthProvider>
            </Router>
         </div>
      </Container>
   );
}

export default App;
