import React from 'react'
import styled from 'styled-components'

const BodyFooter = styled.div`
    background-color: #1d1d1d;
    color: white;
`
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 4rem;
`
const Left = styled.div`
    
`
const Right = styled.div`
    margin-right: 8rem;
`
const Contact = styled.div`
    display: flex;
    gap: 10px;
`

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <BodyFooter>
        <Container>
            <Left>Mini Project</Left>
            <div>Copyright © {year}</div>
            <Right>
                <h4 style={{ fontWeight: '600' }}>© Firdaus-Iqbal</h4>
                <Contact>
                    <p>Linkedin</p>
                    <a href="https://www.linkedin.com/in/mfirdausiqbalr/" style={{ color: '#fff' }}><i className="fa-brands fa-linkedin"></i></a>
                </Contact>
                <Contact>
                    <p>Github</p>
                    <a href="https://github.com/FirdausIqbal" style={{ color: '#fff' }}><i className="fa-brands fa-github"></i></a>
                </Contact>
            </Right>
        </Container>
    </BodyFooter>
  )
}

export default Footer
