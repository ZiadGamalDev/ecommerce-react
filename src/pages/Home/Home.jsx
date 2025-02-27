import React from 'react'
import Slider from '../../components/HomeComponents/Slider/Slider'
import FeaturesSection from '../../components/HomeComponents/Features/Features'

const Home = () => {
  return (
    <React.Fragment>
      <Slider />

      <div className="my-5 mx-auto">
        <FeaturesSection />
      </div>
    </React.Fragment>
  )
}

export default Home
