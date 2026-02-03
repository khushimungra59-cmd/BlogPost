import React, { useContext } from 'react';
import './Footer.css';
import { ModeContext } from '../Context/ModeContext';

 export const Footer = () => {
  const currentYear = new Date().getFullYear();
           const ctx= useContext(ModeContext);
  

  return (
    <>
   <div className={`copyright-container ${ctx.mode}`}>
  <div className="copyright-content" >
    <p>© {currentYear} <span className="brand-name">BlogPost.com</span>. All rights reserved.</p>
  </div>
</div>

    </>
  );
};


