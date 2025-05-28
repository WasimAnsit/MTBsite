const footerStyles = `
  footer {
    background-color: #fff;
    color: #000000;
    padding: 30px 20px;
    font-family: Arial, sans-serif;
    border-top: 1px solid #ddd;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    gap: 250px; /* Space between sections */
  }

  .footer-contact, .footer-middle, .footer-links {
    flex: 1;
    min-width: 200px;
    margin: 0; /* Remove individual margins to use gap for spacing */
  }

  .footer-middle {
    text-align: center;
  }

  .footer-contact h3, .footer-middle h3, .footer-links h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 15px;
    color: #000000;
  }

  .footer-contact p, .footer-middle p, .footer-links a {
    font-size: 0.95rem;
    color: #000000;
    text-decoration: none;
    margin: 8px 0; /* Space between lines within sections */
  }

  .footer-contact .contact-icon {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .footer-contact i {
    color: #000000;;
  }

  .footer-links ul {
    list-style: none;
    padding: 0;
  }

  .footer-links ul li {
    margin: 8px 0;
  }

  .footer-links a:hover {
    text-decoration: underline;
  }

  .footer-social {
    text-align: center;
    margin: 30px 0; /* Space above and below social icons */
  }

  .footer-social a {
    margin: 0 15px; /* Space between social icons */
    font-size: 1.5rem;
    color: #000000;
    text-decoration: none;
  }

  .footer-social a:hover {
    color:rgb(76, 39, 241);
  }

  .footer-bottom {
    text-align: center;
    font-size: 0.9rem;
    margin-top: 20px; /* Space above bottom links */
  }

  .footer-bottom a {
    color: #000000;
    text-decoration: none;
    margin: 0 15px; /* Space between bottom links */
  }

  .footer-bottom a:hover {
    text-decoration: underline;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 25px; /* Reduced gap for smaller screens */
      padding: 0 15px;
    }

    .footer-contact, .footer-middle, .footer-links {
      margin: 0;
    }

    .footer-social {
      margin: 25px 0;
    }

    .footer-bottom a {
      display: inline-block;
      margin: 5px 10px;
    }
  }

  @media (max-width: 480px) {
    footer {
      padding: 20px 10px;
    }

    .footer-content {
      gap: 20px;
      padding: 0 10px;
    }

    .footer-contact h3, .footer-middle h3, .footer-links h3 {
      font-size: 1.1rem;
      margin-bottom: 10px;
    }

    .footer-contact p, .footer-middle p, .footer-links a {
      font-size: 0.9rem;
      margin: 6px 0;
    }

    .footer-social {
      margin: 20px 0;
    }

    .footer-social a {
      font-size: 1.3rem;
      margin: 0 10px;
    }

    .footer-bottom {
      font-size: 0.85rem;
      margin-top: 15px;
    }

    .footer-bottom a {
      margin: 5px 8px;
    }
  }
`;

function createFooter() {
  // Add Font Awesome for icons
  const fontAwesome = document.createElement('link');
  fontAwesome.rel = 'stylesheet';
  fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
  document.head.appendChild(fontAwesome);

  const styleElement = document.createElement('style');
  styleElement.textContent = footerStyles;
  document.head.appendChild(styleElement);

  const footerContainer = document.getElementById('footer-container');
  
  footerContainer.innerHTML = `
    <footer>
      <div class="footer-content">
        <div class="footer-contact">
          <h3>CONTACT</h3>
             
          <p class="contact-icon"><i class="fas fa-map-marker-alt"></i> C-116 GF, OfficeOn <br/>Sector 2, Noida <br/>Uttar Pradesh - 201301</p>
     <p class="contact-icon">
  <i class="fas fa-phone"></i>
  <a href="https://api.whatsapp.com/send?phone=917303062845" target="_blank" aria-label="Chat on WhatsApp">+91 7303062845</a>
</p>

<p class="contact-icon">
  <i class="fa-brands fa-whatsapp"></i>
  <a href="https://api.whatsapp.com/send?phone=919718361550" target="_blank" aria-label="Chat on WhatsApp">+91 9718361550</a>
</p>


          <p class="contact-icon"><i class="fas fa-envelope"></i> info@mtestates.com</p>
        </div>
        <div class="footer-middle">
          <h3>MT Estates</h3>
          <p>As a Real Estate Land Developer Company, we aim to be proactive for the purpose of efficient project management and adaptable for the benefit of our clients.</p>
        </div>
        <div class="footer-links">
          <h3>QUICK LINKS</h3>
          <ul>
            <li><a href="index.html">HOME</a></li>
            <li><a href="about.html">ABOUT</a></li>
            <li><a href="project.html">PROJECTS</a></li>
            <li><a href="contact.html">CONTACT</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-social">
        <a><i class="fa-brands fa-youtube"></i></a>
        <a href="#"><i class="fab fa-facebook-f"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
      </div>
      <div class="footer-bottom">
        <a href="https://dncrproperty.com/faq.html" target=_blank>FAQ</a>
        <a href="https://dncrproperty.com/terms_conditions.html" target=_blank >Terms and Conditions</a>
        <a href="https://dncrproperty.com/privacy_policy.html" target=_blank>Privacy Policy</a>
      </div>
    </footer>
  `;
}

document.addEventListener('DOMContentLoaded', createFooter);