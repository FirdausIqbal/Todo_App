import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import API_URL from '../api_url'
import { mobile } from '../responsive'

const Container = styled.div`
    background-color: #ffce8e;
    padding: 2rem;
    border-radius: 10px;
    flex-basis: 40%;
    border-top-right-radius: 60px;
    ${mobile({
        flexBasis: '100%'
    })}
`
const Title = styled.h4`
    font-size: 1rem;
    text-transform: capitalize;
    letter-spacing: 0px;
`
const Content = styled.p`
    padding: 2rem 0;
`
const Date = styled.p`
    font-size: 0.8rem;
    font-weight: 600;
`
const Button = styled.button`
    padding: 0.3rem 1.5rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    color: ${({name}) => name === 'delete' ? 'white' : 'black'};
    background-color: #${ ({name}) => name === 'delete' ? 'be4747' : 'fff'};
    margin-right: 1rem;

`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
`
const EditContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const EditContent = styled.textarea`
    padding: 10px;
    margin-bottom: 2rem;
    border: none;
`
const EditTitle = styled.input`
    padding: 10px;
    margin-bottom: 1rem;
    border: none;
`



const Task = ({dataTask, next}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState({
        taskName: dataTask.taskName,
        contentTask: dataTask.contentTask
    })

    const handleEdit = ()=>{
        setIsEdit(true)
    }
    const handleSave = async()=>{
        try {
            await axios.put(`${API_URL}task/${dataTask.id}`, dataEdit, { withCredentials: true})
            setIsEdit(false)
            // window.location.reload()
            next()
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleChange = (e)=>{
        setDataEdit((prev)=> ({
            ...prev, 
            [e.target.name] : e.target.value
        }))
    }
    const handleRemove = async() => {
        try {
            await axios.delete(`${API_URL}task/${dataTask.id}`, { withCredentials:true });
            next();
        } catch (error) {
            console.log(error.message)
        }
    }


  return (
    <Container>
        {isEdit 
        ? 
            <EditContainer>
                <EditTitle type='text' name='taskName' value={dataEdit.taskName} onChange={handleChange}/>
                <EditContent name='contentTask' value={dataEdit.contentTask} onChange={handleChange}/>
                <Button style={{ width: "40%"}} onClick={handleSave}>
                    <i className="fa-solid fa-floppy-disk"></i>
                </Button>
            </EditContainer>
        :   
        <div>
            <Title>{dataTask.taskName}</Title>
            <Content>{dataTask.contentTask}</Content>
            <Bottom>
                <Date>{dataTask.time}</Date>
                <div>
                    <Button name='edit' onClick={handleEdit}>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                    <Button name='delete' onClick={handleRemove}>
                        <i className="fa-solid fa-trash-can"></i>
                    </Button>
                </div>
            </Bottom>
        </div>
        }
    </Container>
  )
}

export default Task
