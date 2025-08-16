import React from 'react'
import Landing from '../../components/Landing/Landing'
import Services from '../../components/Services/Services'
import About from '../../components/About/About'
import Projects from '../../components/Projects/Projects'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div>
        <Landing />
        <Services />
        <About  />
        <Projects />
        <Footer/>
    </div>
  )
}

export default Home