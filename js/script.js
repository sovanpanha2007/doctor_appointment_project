// Doctor data
const doctorsData = [
  {
    id: 1,
    name: 'Dr. John Fortnite',
    fullName: 'John Michael Fortnite',
    age: 45,
    nationality: 'American',
    studies: 'MD from Harvard Medical School, Fellowship in Cardiology',
    specialization: 'Cardiologist',
    image: 'image/doctor-john.jpg'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    fullName: 'Michael Chen Liu',
    age: 38,
    nationality: 'Canadian',
    studies: 'MD from University of Toronto, Pediatrics Residency',
    specialization: 'Pediatrician',
    image: 'image/doctor-michael.jpg'
  },
  {
    id: 3,
    name: 'Dr. Emily Williams',
    fullName: 'Emily Sarah Williams',
    age: 42,
    nationality: 'British',
    studies: 'BDS from University of London, DDS Dental Surgery',
    specialization: 'Dentist',
    image: 'image/doctor-emily.jpg'
  }
];

// Page navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize doctors grid
  initializeDoctors();

  // Get all navigation links and buttons
  const navLinks = document.querySelectorAll('nav a');
  const signInBtn = document.getElementById('signInBtn');
  const bookFirstAppointmentBtn = document.getElementById('bookFirstAppointmentBtn');
  const signinForm = document.getElementById('signinForm');

  // Function to update active navigation link
  function updateActiveNavLink(pageId) {
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    const pageName = pageId.replace('-page', '');
    const activeLink = document.querySelector(`nav a[data-page="${pageName}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  // Function to show a specific page and hide others
  function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      page.style.display = 'none';
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.style.display = 'block';
      updateActiveNavLink(pageId);
      // Scroll to top
      window.scrollTo(0, 0);
    }
  }

  // Initialize doctor cards dynamically
  function initializeDoctors() {
    const doctorGrid = document.getElementById('doctor-grid');
    doctorGrid.innerHTML = '';

    doctorsData.forEach(doctor => {
      const cardContainer = document.createElement('div');
      cardContainer.className = 'doctor-card-container';
      
      cardContainer.innerHTML = `
        <div class="doctor-card">
          <!-- Front of card -->
          <div class="doctor-card-front">
            <img src="${doctor.image}" alt="${doctor.name}">
            <h4>${doctor.name}</h4>
            <p>${doctor.specialization}</p>
            <div class="button-group">
              <button class="btn-about">About Me</button>
              <button class="book-appointment-btn">Book</button>
            </div>
          </div>
          
          <!-- Back of card -->
          <div class="doctor-card-back">
            <h4>${doctor.fullName}</h4>
            <p><strong>Age:</strong> ${doctor.age} years</p>
            <p><strong>Nationality:</strong> ${doctor.nationality}</p>
            <p><strong>Specialization:</strong> ${doctor.specialization}</p>
            <p><strong>Education:</strong> ${doctor.studies}</p>
            <div class="button-group">
              <button class="btn-about" style="background: white; color: #2563eb;">Back</button>
              <button class="book-appointment-btn">Book Now</button>
            </div>
          </div>
        </div>
      `;

      doctorGrid.appendChild(cardContainer);

      // Add flip functionality
      const doctorCard = cardContainer.querySelector('.doctor-card');
      const aboutBtn = cardContainer.querySelector('.btn-about');
      const bookBtns = cardContainer.querySelectorAll('.book-appointment-btn');
      const backBtn = cardContainer.querySelector('.doctor-card-back .btn-about');

      aboutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        doctorCard.classList.toggle('flipped');
      });

      backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        doctorCard.classList.toggle('flipped');
      });

      bookBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          showPage('signin-page');
        });
      });
    });
  }

  // Navigation links click handler
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const pageId = this.getAttribute('data-page') + '-page';
      showPage(pageId);
    });
  });

  // Sign In button in navbar
  signInBtn.addEventListener('click', function(e) {
    e.preventDefault();
    showPage('signin-page');
  });

  // Book First Appointment button
  bookFirstAppointmentBtn.addEventListener('click', function(e) {
    e.preventDefault();
    showPage('signin-page');
  });

  // Sign In form submission
  signinForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation (in real app, you'd send to backend)
    if (email && password) {
      alert(`Welcome! You've signed in as ${email}`);
      // Clear form
      signinForm.reset();
      // Optionally redirect to home or doctors page
      showPage('home-page');
    }
  });

  // Initialize - show home page by default
  showPage('home-page');
});
