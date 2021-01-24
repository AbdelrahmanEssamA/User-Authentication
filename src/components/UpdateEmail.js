import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

function UpdateEmail() {
   const history = useHistory();
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const emailRef = useRef();
   const passwordRef = useRef();
   const passwordConfirmRef = useRef();
   const { updateEmail, updatePassword, currentUser } = useAuth();

   async function handleSubmit(e) {
      e.preventDefault();
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
         return setError("password do not match");
      }
      const promises = [];
      setLoading(true);
      if (emailRef.current.value !== currentUser.email) {
         promises.push(updateEmail(emailRef.current.value));
      }
      if (passwordRef.current.value) {
         promises.push(updatePassword(passwordRef.current.value));
      }
      Promise.all(promises)
         .then(() => {
            history.push("/");
         })
         .catch(() => {
            setError("Failed to update");
         })
         .finally(setLoading(false));
   }

   return (
      <React.Fragment>
         <Card>
            <Card.Body>
               <h2 className='text-center mb-4'>Update Data</h2>
               {error && <Alert variant='danger'>{error}</Alert>}
               <Form onSubmit={handleSubmit}>
                  <Form.Group id='email'>
                     <Form.Label>Email</Form.Label>
                     <Form.Control type='email' ref={emailRef} required></Form.Control>
                  </Form.Group>
                  <Form.Group id='password'>
                     <Form.Label>Password</Form.Label>
                     <Form.Control type='password' ref={passwordRef}></Form.Control>
                     <p>LEAVE BLANK TO KEEP THE SAME</p>
                  </Form.Group>
                  <Form.Group id='password-confirm'>
                     <Form.Label>Confirm Password</Form.Label>
                     <Form.Control
                        type='password'
                        ref={passwordConfirmRef}
                     ></Form.Control>
                     <p>LEAVE BLANK TO KEEP THE SAME</p>
                  </Form.Group>
                  <Button className='w-100' type='submit' disabled={loading}>
                     Update
                  </Button>
               </Form>
            </Card.Body>
         </Card>
         <div className='w-100 text-center mt-2'>
            <Link to='/'>Cancel</Link>
         </div>
      </React.Fragment>
   );
}

export default UpdateEmail;
