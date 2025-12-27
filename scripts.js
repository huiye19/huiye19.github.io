// Global variables
let allPublications = [];
let showingSelected = true;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Load publications data
  loadPublications();

  // Initialize animation delays for sections
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.1}s`;
  });

  // Add event listener for toggle button
  const toggleButton = document.getElementById('toggle-publications');
  if (toggleButton) {
    toggleButton.addEventListener('click', togglePublications);
  }

  // Initialize tab switching
  initializeTabs();

  // Set last updated date
  setLastUpdatedDate();
});

// Set the last updated date in footer
function setLastUpdatedDate() {
  const lastUpdated = document.getElementById('last-updated');
  if (lastUpdated) {
    const now = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    lastUpdated.textContent = `${month} ${year}`;
  }
}

// Load publications from JSON file
function loadPublications() {
  fetch('publications.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Publications loaded successfully:", data);
      allPublications = data.publications;
      renderPublications(true);
      renderAllPublications();
    })
    .catch(error => {
      console.error('Error loading publications:', error);
      // Create fallback publications display if JSON loading fails
      displayFallbackPublications();
    });
}

// Fallback if JSON loading fails
function displayFallbackPublications() {
  const container = document.getElementById('publications-container');
  container.innerHTML = `Error loading publications.`;
}

// Toggle between showing all or selected publications
function togglePublications() {
  showingSelected = !showingSelected;
  renderPublications(showingSelected);
  
  // Update button text
  const toggleButton = document.getElementById('toggle-publications');
  toggleButton.textContent = showingSelected ? 'Show All' : 'Show Selected';
  const toggleHeader = document.getElementById('toggle-header');
  toggleHeader.textContent = showingSelected ? 'Selected Publications' : 'All Publications';
}

// Render publications based on selection state
function renderPublications(selectedOnly) {
  const publicationsContainer = document.getElementById('publications-container');
  publicationsContainer.innerHTML = '';

  const pubsToShow = selectedOnly ?
    allPublications.filter(pub => pub.selected === 1) :
    allPublications;

  pubsToShow.forEach(publication => {
    const pubElement = createPublicationElement(publication);
    publicationsContainer.appendChild(pubElement);
  });
}

// Render all publications in the Publications tab
function renderAllPublications() {
  const allPubsContainer = document.getElementById('all-publications-container');
  if (!allPubsContainer) return;

  allPubsContainer.innerHTML = '';

  allPublications.forEach(publication => {
    const pubElement = createPublicationElement(publication);
    allPubsContainer.appendChild(pubElement);
  });
}

// Create HTML element for a publication
function createPublicationElement(publication) {
  const pubItem = document.createElement('div');
  pubItem.className = 'publication-item';
  
  // Create thumbnail
  const thumbnail = document.createElement('div');
  thumbnail.className = 'pub-thumbnail';
  thumbnail.onclick = () => openModal(publication.thumbnail);
  
  const thumbnailImg = document.createElement('img');
  thumbnailImg.src = publication.thumbnail;
  thumbnailImg.alt = `${publication.title} thumbnail`;
  thumbnail.appendChild(thumbnailImg);
  
  // Create content container
  const content = document.createElement('div');
  content.className = 'pub-content';
  
  // Add title
  const title = document.createElement('div');
  title.className = 'pub-title';
  title.textContent = publication.title;
  content.appendChild(title);
  
  // Add authors with highlight
  const authors = document.createElement('div');
  authors.className = 'pub-authors';
  
  // Format authors with highlighting
  let authorsHTML = '';
  publication.authors.forEach((author, index) => {
    if (author.includes('Hui Ye')) {
      authorsHTML += `<span class="highlight-name">${author}</span>`;
    } else {
      authorsHTML += author;
    }

    if (index < publication.authors.length - 1) {
      authorsHTML += ', ';
    }
  });
  
  authors.innerHTML = authorsHTML;
  content.appendChild(authors);
  
  // Add venue with award if present
  const venueContainer = document.createElement('div');
  venueContainer.className = 'pub-venue-container';
  
  const venue = document.createElement('div');
  venue.className = 'pub-venue';
  venue.textContent = publication.venue;
  venueContainer.appendChild(venue);
  
  // Add award if it exists
  if (publication.award && publication.award.length > 0) {
    const award = document.createElement('div');
    award.className = 'pub-award';
    award.textContent = publication.award;
    venueContainer.appendChild(award);
  }
  
  content.appendChild(venueContainer);
  
  // Add links if they exist
  if (publication.links) {
    const links = document.createElement('div');
    links.className = 'pub-links';

    if (publication.links.pdf) {
      const pdfLink = document.createElement('a');
      pdfLink.href = publication.links.pdf;
      pdfLink.textContent = '[PDF]';
      links.appendChild(pdfLink);
    }

    if (publication.links.video) {
      const videoLink = document.createElement('a');
      videoLink.href = publication.links.video;
      videoLink.textContent = '[Video]';
      links.appendChild(videoLink);
    }

    if (publication.links.preview) {
      const previewLink = document.createElement('a');
      previewLink.href = publication.links.preview;
      previewLink.textContent = '[Preview]';
      links.appendChild(previewLink);
    }

    if (publication.links.supplemental) {
      const supplementalLink = document.createElement('a');
      supplementalLink.href = publication.links.supplemental;
      supplementalLink.textContent = '[Supplemental]';
      links.appendChild(supplementalLink);
    }

    if (publication.links.code) {
      const codeLink = document.createElement('a');
      codeLink.href = publication.links.code;
      codeLink.textContent = '[Code]';
      links.appendChild(codeLink);
    }

    if (publication.links.project) {
      const projectLink = document.createElement('a');
      projectLink.href = publication.links.project;
      projectLink.textContent = '[Project Page]';
      links.appendChild(projectLink);
    }

    content.appendChild(links);
  }
  
  // Assemble the publication item
  pubItem.appendChild(thumbnail);
  pubItem.appendChild(content);
  
  return pubItem;
}

// Modal functionality for viewing original images
function openModal(imageSrc) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modal.style.display = "block";
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
  modalImg.src = imageSrc;
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

// Close modal when clicking outside the image
window.onclick = function(event) {
  const modal = document.getElementById('imageModal');
  if (event.target == modal) {
    closeModal();
  }
}

// Tab switching functionality
function initializeTabs() {
  const tabLinks = document.querySelectorAll('.tab-link');

  tabLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetTab = this.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Also handle inline tab links
  const inlineTabLinks = document.querySelectorAll('.tab-link-inline');
  inlineTabLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetTab = this.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

function switchTab(tabName) {
  // Hide all tab contents
  const allTabContents = document.querySelectorAll('.tab-content');
  allTabContents.forEach(content => {
    content.classList.remove('active');
  });

  // Remove active class from all tab links
  const allTabLinks = document.querySelectorAll('.tab-link');
  allTabLinks.forEach(link => {
    link.classList.remove('active');
  });

  // Show the selected tab content
  const targetContent = document.getElementById(tabName + '-tab');
  if (targetContent) {
    targetContent.classList.add('active');
  }

  // Add active class to clicked tab link
  const activeLink = document.querySelector(`.tab-link[data-tab="${tabName}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  // Scroll to top smoothly
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
