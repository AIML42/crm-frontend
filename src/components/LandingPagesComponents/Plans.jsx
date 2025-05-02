import React from 'react'
import './PlansStyle.css'
import checkIcon from '../../assets/check_icon.png'
const Plans = () => {

    const planOnePoints = ["Unlimited Users", "GMB Messaging", "Reputation Management", "GMB Call Tracking", "24/7 Award Winning Support"];
    const planTwoPoints = ["Pipeline Management", "Marketing Automation Campaigns", "Live Call Transfer", "GMB Messaging", "Embed-able Form Builder", "Reputation Management","24/7 Award Winning Support"];

    return (
        <div className='plans'>
            <h1>We have plans for everyone!</h1>
            <p>We started with a strong foundation, then simply built all of the sales and <br /> marketing tools ALL businesses need under one platform.</p>

            <div className="planDetails">
                <div className="planOne">
                    <h2>STARTER</h2>
                    <p>Best for local businesses needing to improve their online <br />reputation.</p>
                    <div className="price">
                        <h1>$199</h1>
                        <h4>/monthly</h4>
                    </div>
            
                    <h4>What's included</h4>
                    <div className='planOneDetails'>
                        
                        {planOnePoints.map((point, index) => (
                            <div className="planPoints">
                            <img src={checkIcon} alt="" />
                            <h4>{point}</h4>
                        </div>
                        ))}
                        
                    </div>
                    <button style={{marginTop:"100px"}}>SIGN UP FOR STARTER</button>
                </div>
                <div className="planTwo">
                    <h2>GROW</h2>
                    <p>Best for all businesses that want to take full control of their <br /> marketing automation and track their leads, click to close.  .</p>
                    <div className="price">
                        <h1>$399</h1>
                        <h4>/monthly</h4>
                    </div>
                    <h4>What's included</h4>
                    <div className='planTwoDetails'>

                    {planTwoPoints.map((point, index) => (
                            <div className="planPoints">
                            <img src={checkIcon} alt="" />
                            <h4>{point}</h4>
                        </div>
                        ))}

                    </div>
                    <button>SIGN UP FOR STARTER</button>
                </div>
            </div>
        </div>
    )
}

export default Plans