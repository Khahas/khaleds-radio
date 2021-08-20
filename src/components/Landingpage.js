import React from "react";
import { Link } from "react-router-dom"
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

function landingPage() {
  return (
    <div>
      <Jumbotron>
        <h1>Welcome to your Radio Buddy</h1>
        <Link to="/channels">
          <Button variant="primary" size="lg" block>
            See all channels
          </Button>
        </Link>
        <Link to="/category">
        <Button variant="primary" size="lg" block>
          See Categories
        </Button>  
        </Link> 
        
        {/* Instead of false you want a variable (isLoggedIn) that you can change depending on if you are logged in or not */}
       { true && <Link to="/favorite">
       <Button variant="primary" size="lg" block>
          See favorite
        </Button>
        </Link>}
      </Jumbotron>
    </div>
  );
}

export default landingPage;
