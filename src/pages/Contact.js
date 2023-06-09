import React from 'react';
import './Contact.css'
import instagramIcon from '../images/Instagram.jpg';
import facebookIcon from '../images/Facebook.jpg';
import twitterIcon from '../images/Twitter.jpg';

const ContactUsPage = () => {
  return (
    <div className="container">
      <div className="contact-container">
      <h2>Address</h2>
      <p>123 Main St<br />Denver, CO 80202</p>
      <form className="contact-form">
        <input type="text" id="name" name="name" placeholder="Your name..." required className='small-input' />

        <input type="email" id="email" name="email" placeholder="Your email..." required className='small-input' />

        <textarea id="message" name="message" placeholder="Your message..." required className='large-input'></textarea>

        <button type="submit">Send</button>
      </form>
      </div>

      <div className="contact-text-container">
        <h3>Get in touch</h3>
        <p>Questions, Comments, Concerns? <br /> 
         Please fill out the form and we'll get back to you as soon as possible.</p>
      </div>
    
      <div className="contact-social-container">
        <img src={instagramIcon} alt="Instagram"/>
        <img src={facebookIcon} alt="Facebook"/>
        <img src={twitterIcon} alt="Twitter"/>
      </div>
    </div>
  );
};
export default ContactUsPage;