import React from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  padding: 2rem 4rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #00000037;
`;

const Left = styled.div``;
const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;


const Header = ({data}) => {
  const logoutHandle = async()=>{
    try {
      await axios.post("http://localhost:3001/auth/logout", {}, { withCredentials: true});
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
        <h5 style={{ cursor: "pointer", fontSize: "1rem" }} onClick={logoutHandle}>Logout</h5>
        <i style={{ fontSize: "1.4rem" }} className="fa-regular fa-user"></i>
      </Right>
    </Container>
  );
};

export default Header;
