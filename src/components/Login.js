import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

function Login() {
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const emailRef = useRef();
   const passwordRef = useRef();
   const { login } = useAuth();
   const history = useHistory();
   async function handleSubmit(e) {
      e.preventDefault();

      try {
         setError("");
         setLoading(true);
         await login(emailRef.current.value, passwordRef.current.value);
         history.push("/");
         setLoading(true);
      } catch {
         setError("Failed to sign in");
      }
      setLoading(false);
   }

   return (
      <React.Fragment>
         <Card>
            <Card.Body>
               <h2 className='text-center mb-4'>Login</h2>
               {error && <Alert variant='danger'>{error}</Alert>}
               <Form onSubmit={handleSubmit}>
                  <Form.Group id='email'>
                     <Form.Label>Email</Form.Label>
                     <Form.Control type='email' ref={emailRef} required></Form.Control>
                  </Form.Group>
                  <Form.Group id='password'>
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                        type='password'
                        ref={passwordRef}
                        required
                     ></Form.Control>
                  </Form.Group>

                  <Button
                     className='w-100'
                     type='submit'
                     disabled={loading}
                     variant='success'
                  >
                     Login
                  </Button>
               </Form>
               <div className='w-100 text-center mt-3'>
                  <Link to='/forgot-password'>forgot password?</Link>
               </div>
            </Card.Body>
         </Card>
         <div className='w-100 text-center mt-2'>
            New? <Link to='/signup'>Register here</Link>
         </div>
      </React.Fragment>
   );
}

export default Login;
