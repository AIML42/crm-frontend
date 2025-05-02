import React from 'react'
import './FeaturesStyle.css'
import landingPageTwo from '../../assets/landing_page2.png';

const Features = () => {
  return (
    <div className='features'>
        <h1>At its core, Hubly is a robust CRM <br />solution.</h1>
        <p>Hubly helps businesses streamline customer interactions, track leads, and automate tasks—<br />saving you time and maximizing revenue. Whether you’re a startup or an enterprise, Hubly <br />adapts to your needs, giving you the tools to scale efficiently.</p>

        <div className="featuresDetails">
            <div className="text">
                <h2>MULTIPLE PLATFORMS TOGETHER!</h2>
                <p>Email communication is a breeze with our fully integrated, drag & drop <br /> email builder.</p>

                <h2>CLOSE</h2>
                <p>Capture leads using our landing pages, surveys, forms, calendars, inbound phone <br />system & more!</p>

                <h2>NURTURE</h2>
                <p>Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!   </p>
            </div>

            <div className="image">
                <img src={landingPageTwo} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Features