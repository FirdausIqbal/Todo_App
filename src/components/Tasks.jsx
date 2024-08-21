import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Task from "./Task";
import TaskForm from "./TaskForm";
import API_URL from "../api_url";

const Body = styled.div`
  background-color: #ffffff;
  height: 100%;
`;

const Container = styled.div`
  padding: 2rem 5rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 500;
  padding-bottom: 1rem;
  text-align: center;
`
const ContainerTask = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`

const EmptyText = styled.p`
  font-size: 1.5rem;
  color: #8b2222;
  flex: 1;
  text-align: center;
`


const Tasks = () => {
  const [task, setTask] = useState([]);
  const [reload, setReload] = useState();


  const handleReload = ()=>{
    const setter = Math.floor(Math.random() * 10)
    setReload(setter)
  }

  useEffect(()=>{
    const getTask = async()=>{
      try {
        const response = await axios.get(`${API_URL}task/user/all`, { withCredentials:true })
        const filterResponse = response.data.map((item)=>{
          const {createdAt, updatedAt, ...data} = item;
          const date = new Date(updatedAt).toLocaleDateString()
          const time = new Date(updatedAt).toLocaleTimeString()
          const newData = {...data, date, time}
          return newData
        })
        setTask(filterResponse)
      } catch (error) {
        console.log(error.message)
      }
    }
    getTask();
  }, [reload])
  return (
    <Body>
      <Container>
        <Title>
          Add Task
        </Title>
        <TaskForm next={handleReload} />
        <Title>
          Your Task
        </Title>
        <ContainerTask>
          {task.length === 0 
          ? 
          <EmptyText>Belum Ada Task</EmptyText> 
          : 
          task.map((item) => (
            <Task dataTask={item} key={item.id} next={handleReload}/>
          ))}
        </ContainerTask>
      </Container>
    </Body>
  );
};

export default Tasks;
