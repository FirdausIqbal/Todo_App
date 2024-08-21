import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import API_URL from '../api_url'

const Container = styled.div`
    margin-bottom: 2rem;
`
const BodyForm = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: #0b77be; */
`
const Form = styled.form`
    width: 40%;
    padding: 2rem;
    box-shadow: 10px 10px 20px #c5c5c5;
    border-radius: 10px;
`
const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`
const InputTitle = styled.input`
    flex: 1;
    padding: 0.3rem;
    border: none;
    border-bottom: 1px solid black;
    `
const InputContent = styled.textarea`
    flex: 1;
    padding: 0.3rem;
    border: none;
    border-bottom: 1px solid black;
`
const SubmitContainer = styled.div`
    display: flex;
    justify-content: end;
`
const Submit = styled.button`
    padding: 0.5rem;
    border: none;
    color: white;
    background-color: #4753ff;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s ease;
    &:hover{
        background-color: #87a7ff;
    }
`


const TaskForm = ({ next }) => {
    const [dataForm, setDataForm] = useState({
        taskName: "",
        contentTask: ""
    })
    const handleChange = (e) => {
        setDataForm((prev) => ({
            ...prev, 
            [e.target.name] : e.target.value
        }));
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await axios.post(`${API_URL}task/`, dataForm, { withCredentials: true })
            setDataForm({
                taskName: "",
                contentTask: ""
            })
            next();
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <Container>
        <BodyForm>
            <Form>
                <InputContainer>
                    <label style={{ flex: '1' }} htmlFor="">Title</label>
                    <InputTitle onChange={handleChange} name='taskName' value={dataForm.taskName} type='text' placeholder='Masukkan Judul Task' />
                </InputContainer>
                <InputContainer>
                    <label style={{ flex: '1' }} htmlFor="">Content</label>
                    <InputContent onChange={handleChange} name='contentTask' value={dataForm.contentTask} placeholder='Masukkan Konten Task' />
                </InputContainer>
                <SubmitContainer>
                    <Submit onClick={handleSubmit}>Submit</Submit>
                </SubmitContainer>
            </Form>
        </BodyForm>
    </Container>
  )
}

export default TaskForm
