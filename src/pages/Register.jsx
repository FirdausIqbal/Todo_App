import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import API_URL from '../api_url'
import { mobile } from '../responsive'

const Container = styled.div`
    height: 100vh;
    background-color: #d1cd94;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
    width: 30%;
    padding: 3rem;
    background-color: white;
    border-radius: 1rem;
    ${mobile({
        width: '800%'
    })}
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Title = styled.h1``
const Input = styled.input`
    margin-bottom: 1rem;
    padding: 0.5rem;
`
const Button = styled.button`
    padding: 0.5rem;
`

const ErrorText = styled.p`
    color: #d43d3d;
    font-size: 0.8rem;
`

const Register = ({isAuth}) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    })
    const [errStatus, setErrStatus] = useState()

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev, 
            [e.target.name] : e.target.value
        }))
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${API_URL}auth/register`, formData, {withCredentials: true})
            if (response.status === 200){
                const {email, ...loginData} = formData;
                const resLogin = await axios.post(`${API_URL}auth/login`, loginData, { withCredentials: true });
                isAuth(resLogin.data)
            }
        } catch (error) {
            const keyLetter = error.response.data.message.split(" ")[0]
            setErrStatus(keyLetter)
        }
    }
  return (
    <Container>
        <Wrapper>
            <Title>Register</Title>
            <Form>
                <Input onChange={handleChange} name='username' type='text' placeholder='username' required/>
                <Input onChange={handleChange} name='password' type='password' placeholder='password' required/>
                <Input onChange={handleChange} name='email' type='email' placeholder='Email'/>
                {errStatus ? <ErrorText>* {errStatus === 'Fields' ? "Kolom 'username & password' Tidak Boleh Kosong" : `${errStatus} sudah pernah digunakan` }</ErrorText> : null}
                <Button onClick={handleRegister}>Register</Button>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register
