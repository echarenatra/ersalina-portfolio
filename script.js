(function () {

  // ── Dark Mode ──────────────────────────────────────────────
  var html = document.documentElement;
  var toggleBtn = document.getElementById('themeToggle');

  function getTheme() {
    var stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      var current = getTheme();
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Sync if system preference changes and user hasn't manually set
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });


  // ── Scroll Reveal ──────────────────────────────────────────
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Fallback — show everything if IntersectionObserver not supported
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }


  // ── Drag-to-scroll — project track ────────────────────────
  var wrap = document.getElementById('projectsTrack');
  if (wrap) {
    var isDown = false;
    var startX, scrollLeft;
    var hasDragged = false;

    wrap.addEventListener('mousedown', function (e) {
      isDown = true;
      hasDragged = false;
      wrap.classList.add('dragging');
      startX = e.pageX - wrap.offsetLeft;
      scrollLeft = wrap.scrollLeft;
    });

    wrap.addEventListener('mouseleave', function () {
      isDown = false;
      wrap.classList.remove('dragging');
    });

    wrap.addEventListener('mouseup', function () {
      isDown = false;
      wrap.classList.remove('dragging');
    });

    wrap.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      hasDragged = true;
      var x = e.pageX - wrap.offsetLeft;
      var walk = (x - startX) * 1.2;
      wrap.scrollLeft = scrollLeft - walk;
    });

    // Prevent card click when dragging
    wrap.addEventListener('click', function (e) {
      if (hasDragged) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  }


  // ── Web3Forms — contact form ───────────────────────────────
  var form = document.getElementById('contactForm');
  var feedback = document.getElementById('formFeedback');
  var submitBtn = document.getElementById('submitBtn');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      var name = form.querySelector('[name="name"]').value.trim();
      var email = form.querySelector('[name="email"]').value.trim();
      var message = form.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) {
        showFeedback('Please fill in all fields.', 'error');
        return;
      }

      // Disable button during submission
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      clearFeedback();

      var data = new FormData(form);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            showFeedback('Message sent. I\'ll get back to you soon.', 'success');
            form.reset();
          } else {
            showFeedback('Something went wrong. Please try again.', 'error');
          }
        })
        .catch(function () {
          showFeedback('Network error. Please try again.', 'error');
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        });
    });
  }

  function showFeedback(msg, type) {
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.className = 'form-feedback ' + type;
  }

  function clearFeedback() {
    if (!feedback) return;
    feedback.textContent = '';
    feedback.className = 'form-feedback';
  }


  // ── Nav scroll behaviour — subtle shadow on scroll ─────────
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        nav.style.borderBottomColor = 'var(--rule)';
      } else {
        nav.style.borderBottomColor = 'var(--rule-thin)';
      }
    }, { passive: true });
  }

})();
