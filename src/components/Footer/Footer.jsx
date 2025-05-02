import React from 'react'
import './FooterStyle.css'
import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <div className='footer'>
      <div className="logo">
        <Icon fontSize={50} icon="bi:cloud-haze2" />
        <h1>Hubly</h1>
      </div>

      <div className="footer-grid">

        <div className="footer-column">
          <h3>Product</h3>
          <ul>
            <li>Universal checkout</li>
            <li>Payment workflows</li>
            <li>Observability</li>
            <li>UpliftAI</li>
            <li>Apps & Integrations</li>
          </ul>
        </div>

    
        <div className="footer-column">
          <h3>Why Hubly</h3>
          <ul>
            <li>Expand to new markets</li>
            <li>Boost payment success</li>
            <li>Improve conversion rates</li>
            <li>Reduce payments fraud</li>
            <li>Recover revenue</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Developers</h3>
          <ul>
            <li>Hubly Docs</li>
            <li>API Reference</li>
            <li>Payment methods guide</li>
            <li>Service status</li>
            <li>Community</li>
          </ul>
        </div>

    
        <div className="footer-column">
          <h3>Resources</h3>
          <ul>
            <li>Blog</li>
            <li>Success stories</li>
            <li>News room</li>
            <li>Terms</li>
            <li>Privacy</li>
          </ul>
        </div>


        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li>Careers</li>
          </ul>
        </div>

        <div className="footer-icon">
            <Icon icon='lets-icons:message-light'></Icon>
            <Icon icon='basil:linkedin-outline'></Icon>
            <Icon icon='si:twitter-line'></Icon>
            <Icon icon='line-md:youtube'></Icon>
            <Icon icon='line-md:discord'></Icon>
            <Icon icon='solar:figma-linear'></Icon>
            <Icon icon='hugeicons:instagram'></Icon>
        </div>

      </div>
    </div>
  )
}

export default Footer