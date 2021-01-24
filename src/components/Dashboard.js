import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

function Dashboard() {
   const { currentUser, logout } = useAuth();
   const [error, setError] = useState(false);
   const history = useHistory();

   async function handleLogout() {
      setError("");
      try {
         await logout();
         history.push("/login");
      } catch {
         setError("Failed to log out");
      }
   }
   return (
      <React.Fragment>
         <Card>
            <Card.Body>
               <h2 className='text-center mb-4'>Profile</h2>
               {error && <Alert variant='danger'>{error}</Alert>}
               <strong>Email: </strong>
               {currentUser.email}
               <Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
                  Update Profile
               </Link>
            </Card.Body>
         </Card>
         <div className='w-100 text-center mt-2'>
            <Button onClick={handleLogout} variant='danger'>
               Log out
            </Button>
         </div>
      </React.Fragment>
   );
}

export default Dashboard;
