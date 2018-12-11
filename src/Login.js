import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

const Login = ({ history, loginUser = f => f }) => {
  let _email, _password;

  var email, pass;

  const handleLogin = e => {
    e.preventDefault();
    loginUser(email, pass);
  };

  const onChangeEmail = e => {
    e.preventDefault();
    email = e.target.value;
  };

  const onChangePass = e => {
    e.preventDefault();
    pass = e.target.value;
  };

  return (
    // <div id="main">
    //   <form id="login-form" action="" onSubmit={handleLogin} method="post">
    //     <h3 style={{ padding: 15 }}>Login Form</h3>
    //     <input ref={input => (_email = input)} style={styles.input} autoComplete="off" id="email-input" name="email" type="text" className="center-block" placeholder="email" />
    //     <input ref={input => (_password = input)} style={styles.input} autoComplete="off" id="password-input" name="password" type="password" className="center-block" placeholder="password" />
    //     <button type="submit" style={styles.button} className="landing-page-btn center-block text-center" id="email-login-btn" href="#facebook" >
    //       Login
    //     </button>
    //   </form>
    //   <Link style={styles.link} to="/register" >
    //     Register
    //   </Link>
    // </div>

    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form
                    id="login-form"
                    action=""
                    onSubmit={handleLogin}
                    method="post"
                  >
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={value => onChangeEmail(value)}
                        autoComplete="off"
                        id="email-input"
                        name="email"
                        type="text"
                        className="center-block"
                        placeholder="email"
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={value => onChangePass(value)}
                        autoComplete="off"
                        id="password-input"
                        name="password"
                        type="password"
                        className="center-block"
                        placeholder="password"
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button
                          type="submit"
                          onSubmit={handleLogin}
                          color="primary"
                          className="mt-3"
                          className="landing-page-btn center-block text-center"
                          id="email-login-btn"
                        >
                          Login
                        </Button>
                      </Col>
                      {/* <Col xs="6" className="text-right">
                  <Button color="link" className="px-0">Forgot password?</Button>
                </Col> */}
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: 44 + "%" }}
              >
                <CardBody className="text-center">
                  <div>
                    <h2>Pemeliharaan dan Peminjaman Kendaraan</h2>
                    <p>Dinas Pekerjaan Umum dan Penataan Ruang Kota Mataram</p>
                    {/* <Button color="primary" className="mt-3" active>Register Now!</Button> */}
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const styles = {
  input: {
    backgroundColor: "white",
    border: "1px solid #cccccc",
    padding: 15,
    float: "left",
    clear: "right",
    width: "80%",
    margin: 15
  },
  button: {
    height: 44,
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
    border: "none",
    backgroundColor: "red",
    margin: 15,
    float: "left",
    clear: "both",
    width: "85%",
    color: "white",
    padding: 15
  },
  link: {
    width: "100%",
    float: "left",
    clear: "both",
    textAlign: "center"
  }
};

export default Login;
