import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

function SignUp() {
   const history = useHistory();
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const emailRef = useRef();
   const passwordRef = useRef();
   const passwordConfirmRef = useRef();
   const nameRef = useRef();
   const { signUp } = useAuth();

   async function handleSubmit(e) {
      e.preventDefault();
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
         return setError("password do not match");
      }
      try {
         setError("");
         setLoading(true);
         await signUp(emailRef.current.value, passwordRef.current.value);
         history.push("/");
      } catch {
         setError("Failed to create an account");
      }
      setLoading(true);
   }

   return (
      <React.Fragment>
         <Card>
            <Card.Body>
               <h2 className='text-center mb-4'>Sign Up</h2>
               {error && <Alert variant='danger'>{error}</Alert>}
               <Form onSubmit={handleSubmit}>
                  <Form.Group id='name'>
                     <Form.Label>Name</Form.Label>
                     <Form.Control type='text' ref={nameRef} required></Form.Control>
                  </Form.Group>
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
                  <Form.Group id='password-confirm'>
                     <Form.Label>Confirm Password</Form.Label>
                     <Form.Control
                        type='password'
                        ref={passwordConfirmRef}
                        required
                     ></Form.Control>
                  </Form.Group>
                  <Button className='w-100' type='submit' disabled={loading}>
                     Sign Up
                  </Button>
               </Form>
            </Card.Body>
         </Card>
         <div className='w-100 text-center mt-2'>
            Already have an account? <Link to='/login'>Log In</Link>
         </div>
      </React.Fragment>
   );
}

export default SignUp;
