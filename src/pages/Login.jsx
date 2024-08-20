import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  height: 100vh;
  background-color: #d1cd94;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 500px;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
  /* display: flex;
flex-direction: column; */
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonLogin = styled.button`
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 10px;
  background-color: #${({name}) => name === "login" ? "797979" : "379173"};
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;
  &:hover{
    background-color: #c4c4c4;
  }
`;

const Tittle = styled.h1``;

const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
`

const LoginInput = styled.input`
  width: 50%;
  margin: 10px auto;
  padding: 0.6rem;
  border: 1px solid grey;
  border-radius: 5px;
`;

const Login = ({isAuth}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [status, setStatus] = useState();
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({
        ...prev, [name] : value
      }))
  }

  const submitLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3001/auth/login", formData, {withCredentials: true})
      if(response.status === 200){
        isAuth(response.data)
      }
    } catch (error) {
      setStatus("error")
      setFormData({
        username: "",
        password: ""
      })
    }
  }

  return (
    <Container>
      <Wrapper>
        <Tittle>Login</Tittle>
        <p>Welcome volks.</p>
        {status ? <p style={{ color: "red" }}>Username or password incorrect</p> : null}
        <Form>
          <LoginInput name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
          <LoginInput name="password" value={formData.password} onChange={handleChange} placeholder="Password" type="password" />
          <InputContainer>
            <ButtonLogin name="login" onClick={submitLogin}>Login</ButtonLogin>
            <Link to="/register">
              <ButtonLogin name="register" >Register</ButtonLogin>
            </Link>
          </InputContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
