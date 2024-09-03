import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import API_URL from "../api_url";
import { mobile } from "../responsive";

const Container = styled.div`
  padding: 2rem 4rem;
  display: flex;
  justify-content: space-between;
  background-color: #2b2a2a;
  color: white;
  ${mobile({
    display: 'block', 
    fontSize: '2rem', 
    position: 'fixed', 
    width: '100%', 
    padding: '1rem 3rem'
  })}
`;

const Left = styled.div`
  ${mobile({
    fontSize: '2rem', display: 'none'
  })}
`;
const Right = styled.div`
  display: flex;
  align-items: center;
`;
const CostumBars = styled.div`
  display: flex;
  gap: 25px;
  ${mobile({
    display: 'none'
  })}
`
const Bars = styled.div`
  cursor: pointer;
  display: none;
  font-size: 2rem;
  ${mobile({
    display: 'block'
  })}
`

const Logout = styled.h5`
  cursor: pointer;
  font-size: 1rem;
  ${mobile({
    fontSize: '2rem'
  })}
`
const Actived = styled.div`
  display: block;
`

const Header = ({data}) => {
  const [isActive, setIsActive] = useState(false);
  const logoutHandle = async()=>{
    try {
      await axios.post(`${API_URL}auth/logout`, {}, { withCredentials: true});
      localStorage.removeItem("user")
      window.location.reload()
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleClick = () => {
    setIsActive((prev) => !prev);
  }

  return (
    <Container>
      <Left>
        <h3>Hello, {data.username}</h3>
      </Left>
      <Right >
        <CostumBars>
          <Logout onClick={logoutHandle}>Logout</Logout>
          <i style={{ fontSize: "1.4rem" }} className="fa-regular fa-user"></i>
        </CostumBars>
        <Bars onClick={handleClick}>
          <i className="fa-solid fa-bars"></i>
        </Bars>
      </Right>
      {isActive && 
        <Actived>
          <h3>Hello, {data.username}</h3>
          <Logout onClick={logoutHandle}>Logout</Logout>
        </Actived>}
    </Container>
  );
};

export default Header;
