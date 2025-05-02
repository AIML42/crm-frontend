import { Link } from 'react-router-dom'
import './LandingStyle.css'
import Navbar from '../../components/Navbar/Navbar'
import landingPageOne from '../../assets/landing_page1.png';
import { Icon } from "@iconify/react";
import Features from '../../components/LandingPagesComponents/Features';
import Plans from '../../components/LandingPagesComponents/Plans';
import Footer from '../../components/Footer/Footer';

const Landing = () => {

    const companiesNames = [
        'Adobe',
        'Elastic',
        'Opendoor',
        'Airtable',
        'Framer'
    ];

    const companiesIcons = ["mage:adobe", "cib:elastic", "akar-icons:door", "lineicons:airtable", "lineicons:framer"]

    return (
        <>
            <div className="part-one">
                <Navbar />
                <div className='main-page'>
                    <div className='main-text'>
                        <h1>Grow Your Business Faster with Hubly CRM</h1>
                        <p>Manage leads, automate workflows, and close deals effortlessly—all in one powerful platform.</p>
                        <div className="button-group">
                            <button className='getStartedButton'>Get Started <Icon icon="maki:arrow"></Icon> </button>
                            <button className='watchVideoButton'><Icon icon="garden:play-26"></Icon> Watch Video  </button>
                        </div>
                    </div>
                    <img src={landingPageOne} alt="" />
                </div>


                <div className="companiesIcons">
                    {companiesNames.map((name, index) => (
                        <div key={index}>
                            <Icon icon={companiesIcons[index]}></Icon>
                            <h2>{name}</h2>
                        </div>
                    ))}
                </div>

            </div>
            <Features/>
            <Plans/>
            <Footer/>
        </>
    )
}

export default Landing