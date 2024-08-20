import Header from "../components/Header";
import Tasks from "../components/Tasks";
import Footer from "../components/Footer";

import React from 'react'

const Home = ({data}) => {

  return (
    <div>
      <Header data={data}/>
      <Tasks />
      <Footer />
    </div>
  )
}

export default Home
