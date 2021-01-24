import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

function ForgotPassword() {
   const [error, setError] = useState("");
   const [message, setMessage] = useState("");
   const [loading, setLoading] = useState(false);
   const emailRef = useRef();
   const { resetPassword } = useAuth();

   async function handleSubmit(e) {
      e.preventDefault();

      try {
         setError("");
         setLoading(true);
         await resetPassword(emailRef.current.value);
         setMessage("Check your inbox for instructions");
         setLoading(true);
      } catch {
         setError("Failed to reset");
      }
      setLoading(false);
   }

   return (
      <React.Fragment>
         <Card>
            <Card.Body>
               <h2 className='text-center mb-4'>Login</h2>
               {message && <Alert variant='success'>{message}</Alert>}
               {error && <Alert variant='danger'>{error}</Alert>}
               <Form onSubmit={handleSubmit}>
                  <Form.Group id='email'>
                     <Form.Label>Email</Form.Label>
                     <Form.Control type='email' ref={emailRef} required></Form.Control>
                  </Form.Group>

                  <Button
                     className='w-100'
                     type='submit'
                     disabled={loading}
                     variant='success'
                  >
                     Reset Password
                  </Button>
               </Form>
               <div className='w-100 text-center mt-3'>
                  <Link to='/login'>Login</Link>
               </div>
            </Card.Body>
         </Card>
         <div className='w-100 text-center mt-2'>
            New? <Link to='/signup'>Register here</Link>
         </div>
      </React.Fragment>
   );
}

export default ForgotPassword;
