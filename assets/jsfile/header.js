const cssStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 30px;
    background-color:#EAEFFA;
    color:black;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(5, 5, 5, 0.1);
    transition: transform 0.3s ease;
  }

  header.hidden {
    transform: translateY(-100%);
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo img {
    width: 150px;
    height: 100px;
    margin-right:10px;
    object-fit:Cover;
  }

  .logo span {
    font-size: 1.5rem;
    font-weight: bold;
    color: #f4d19b;
  }

  .nav-links {
    display: flex;
    list-style: none;
    color:black;
  }

  .nav-links li {
    margin-left: 30px;
    color:blue;
  }

  .nav-links a {
    color: black;
    text-decoration: none;
    font-size: 1.1rem;
    transition: color 0.3s ease;
  }

  .nav-links a:hover {
    color:rgb(0, 55, 104);
    background-color:rgba(201, 143, 42, 0.8);
    border: 1px solid #003564;
    border-radius:5px;
    padding:4px 5px;
   
  }

  .hamburger {
    display: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #fff;
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    left: -250px;
    width: 250px;
    height: 100%;
    background-color: #2a4d7a;
    padding-top: 60px;
    transition: left 0.3s ease;
    z-index: 999;
  }

  .mobile-menu.active {
    left: 0;
  }

  .mobile-menu ul {
    list-style: none;
  }

  .mobile-menu li {
    margin: 20px 0;
  }

  .mobile-menu a {
    color: #fff;
    text-decoration: none;
    font-size: 1.2rem;
    padding: 10px 20px;
    display: block;
  }

  .mobile-menu a:hover {
    background-color: #f4d19b;
    color: #1a3c5e;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    z-index: 998;
  }

  .overlay.active {
    display: block;
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }

    .hamburger {
      display: block;
    }
  }

  @media (min-width: 769px) {
    .mobile-menu {
      display: none;
    }
  }
`;

function createHeader() {
  const styleElement = document.createElement('style');
  styleElement.textContent = cssStyles;
  document.head.appendChild(styleElement);

  const headerContainer = document.getElementById('header-container');
  
  headerContainer.innerHTML = `
    <header>
      <div class="logo">
        <img src="assets/Images/Mt estates logo-01.png" alt="MT Estates Logo" onerror="this.src='https://via.placeholder.com/80?text=Logo+Error';">
      </div>
      <ul class="nav-links">
        <li><a href="NewHome.html">Home</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="project.html">Our Projects</a></li>
        <li><a href="contact.html">Contact Us</a></li>
      </ul>
      <div class="hamburger">
        <i class="fa-solid fa-bars"></i>
      </div>
    </header>
    <div class="mobile-menu">
      <ul>
        <li><a href="NewHome.html">Home</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="project.html">Our Projects</a></li>
        <li><a href="contact.html">Contact Us</a></li>
      </ul>
    </div>
    <div class="overlay"></div>
  `;

  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.overlay');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
  });

  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
    });
  });

  let lastScrollTop = 0;
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

document.addEventListener('DOMContentLoaded', createHeader);