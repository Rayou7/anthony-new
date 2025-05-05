document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const menuToggle = document.getElementById("menu-toggle")
    const sidebar = document.querySelector(".sidebar")
    const mainContent = document.querySelector(".main-content")
  
    if (menuToggle && sidebar) {
      menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active")
      })
    }
  
    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (event) => {
      if (
        window.innerWidth <= 768 &&
        sidebar &&
        sidebar.classList.contains("active") &&
        !sidebar.contains(event.target) &&
        event.target !== menuToggle
      ) {
        sidebar.classList.remove("active")
      }
    })
  
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll(".sidebar-nav a")
  
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        // Only if it's an anchor link
        if (this.getAttribute("href").startsWith("#")) {
          e.preventDefault()
  
          const targetId = this.getAttribute("href")
          const targetSection = document.querySelector(targetId)
  
          if (targetSection) {
            // Close mobile menu if open
            if (window.innerWidth <= 768 && sidebar.classList.contains("active")) {
              sidebar.classList.remove("active")
            }
  
            // Add transition effect
            targetSection.classList.add("section-transition")
            setTimeout(() => {
              targetSection.classList.remove("section-transition")
            }, 800)
  
            // Smooth scroll to section
            window.scrollTo({
              top: targetSection.offsetTop,
              behavior: "smooth",
            })
  
            // Update active link
            navLinks.forEach((navLink) => {
              navLink.classList.remove("active")
            })
            this.classList.add("active")
          }
        }
      })
    })
  
    // Highlight active section on scroll
    const sections = document.querySelectorAll(".section")
    let currentSection = null
  
    function highlightActiveSection() {
      const scrollPosition = window.scrollY
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Add transition effect when changing sections
          if (currentSection !== section) {
            section.classList.add("section-transition")
            setTimeout(() => {
              section.classList.remove("section-transition")
            }, 800)
            currentSection = section
          }
  
          // Remove active class from all links
          navLinks.forEach((link) => {
            link.classList.remove("active")
          })
  
          // Add active class to corresponding link
          const activeLink = document.querySelector(`.sidebar-nav a[href="#${sectionId}"]`)
          if (activeLink) {
            activeLink.classList.add("active")
          }
        }
      })
    }
  
    window.addEventListener("scroll", highlightActiveSection)
  
    // Back to top button
    const backToTopButton = document.getElementById("back-to-top")
  
    function toggleBackToTopButton() {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("visible")
      } else {
        backToTopButton.classList.remove("visible")
      }
    }
  
    window.addEventListener("scroll", toggleBackToTopButton)
  
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    // Amélioration de l'animation de la timeline
    function animateTimelineItems() {
      const timelineItems = document.querySelectorAll(".timeline-item")
  
      timelineItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (itemTop < windowHeight * 0.85) {
          setTimeout(() => {
            item.classList.add("animated")
          }, 150 * index)
        }
      })
    }
  
    // Animate sections on scroll
    function animateSections() {
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (sectionTop < windowHeight * 0.75) {
          section.classList.add("active")
        }
      })
    }
  
    window.addEventListener("scroll", animateSections)
    window.addEventListener("scroll", animateTimelineItems)
    window.addEventListener("load", animateSections)
    window.addEventListener("load", animateTimelineItems)
  
    // Initial call to set active section and animate elements
    highlightActiveSection()
    animateSections()
    animateTimelineItems()
  })
  