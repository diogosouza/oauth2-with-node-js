import Button from "react-bootstrap/Button";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get(
      "access_token"
    );

    axios
      .get("http://localhost:8010/proxy/user", {
        headers: {
          Authorization: "token " + token,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }, []);

  return (
    <div className="App text-center container-fluid">
      {!loggedIn ? (
        <>
          <img
            className="mb-4"
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            width="150"
          ></img>
          <h1 className="h3 mb-3 font-weight-normal">Sign in with GitHub</h1>
          <Button
            type="primary"
            className="btn"
            size="lg"
            href="https://github.com/login/oauth/authorize?client_id=8f672e53bc6b92be977d&redirect_uri=http://localhost:8080/oauth/redirect"
          >
            Sign in
          </Button>
        </>
      ) : (
        <>
          <h1>Welcome!</h1>
          <p>
            This is a simple integration between OAuth2 on GitHub with Node.js
          </p>

          <CardDeck>
            {[...Array(3)].map((e, i) => (
              <Card style={{ maxWidth: "25%", margin: "auto" }}>
                <Card.Img variant="top" src={user.avatar_url} />
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>{user.bio}</Card.Text>
                  <Button
                    variant="primary"
                    target="_blank"
                    href={user.html_url}
                  >
                    GitHub Profile
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </CardDeck>
        </>
      )}
    </div>
  );
}

export default App;
