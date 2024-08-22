import React from "react";
import styled from "styled-components";
import axios from "axios";
import API_URL from "../api_url";
import { mobile } from "../responsive";

const Container = styled.div`
  padding: 2rem 4rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #00000037;
`;

const Left = styled.div`
  ${mobile({
    fontSize: '2rem'
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
  display: none;
  font-size: 2rem;
  ${mobile({
    display: 'block'
  })}
`


const Header = ({data}) => {
  const logoutHandle = async()=>{
    try {
      await axios.post(`${API_URL}auth/logout`, {}, { withCredentials: true});
      localStorage.removeItem("user")
      window.location.reload()
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <Container>
      <Left>
        <h3>Hello, {data.username}</h3>
      </Left>
      <Right >
        <CostumBars>
          <h5 style={{ cursor: "pointer", fontSize: "1rem" }} onClick={logoutHandle}>Logout</h5>
          <i style={{ fontSize: "1.4rem" }} className="fa-regular fa-user"></i>
        </CostumBars>
        <Bars>
          <i className="fa-solid fa-bars"></i>
        </Bars>
      </Right>
    </Container>
  );
};

export default Header;
