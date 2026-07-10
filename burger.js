/* ============================================================
   burger.js — Menu burger mobile/tablette
   Injecte un bouton burger et un drawer latéral pour les écrans ≤ 860px
   ============================================================ */
(function() {
  'use strict';

  // Crée l'overlay sombre
  var overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  // Crée le drawer
  var drawer = document.createElement('aside');
  drawer.className = 'nav-drawer';
  drawer.setAttribute('aria-label', 'Menu di navigazione');
  drawer.setAttribute('aria-hidden', 'true');
  drawer.setAttribute('role', 'navigation');
  document.body.appendChild(drawer);

  // Récupère les liens depuis la nav existante
  var navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    var links = navLinks.querySelectorAll('a');
    links.forEach(function(link) {
      var clone = link.cloneNode(true);
      clone.className = 'nav-drawer-link';
      drawer.appendChild(clone);
    });
  }

  // Récupère le CTA (bouton "Commencer")
  var navCta = document.querySelector('.nav-cta');
  if (navCta) {
    var ctaClone = navCta.cloneNode(true);
    ctaClone.className = 'nav-drawer-cta';
    drawer.appendChild(ctaClone);
  }

  // Crée le bouton burger
  var burger = document.createElement('button');
  burger.className = 'menu-toggle';
  burger.setAttribute('type', 'button');
  burger.setAttribute('aria-label', 'Apri il menu');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-controls', 'navDrawer');
  burger.innerHTML = '<span class="menu-toggle-bar"></span>' +
                    '<span class="menu-toggle-bar"></span>' +
                    '<span class="menu-toggle-bar"></span>';
  drawer.id = 'navDrawer';

  // Insère le burger dans la navbar (après le theme-toggle)
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    var themeToggle = navbar.querySelector('.theme-toggle');
    if (themeToggle && themeToggle.parentNode === navbar) {
      themeToggle.parentNode.insertBefore(burger, themeToggle.nextSibling);
    } else {
      navbar.appendChild(burger);
    }
  } else {
    document.body.appendChild(burger);
  }

  // Fonctions d'ouverture/fermeture
  function openMenu() {
    burger.classList.add('is-open');
    drawer.classList.add('is-open');
    overlay.classList.add('is-visible');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Chiudi il menu');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burger.classList.remove('is-open');
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Apri il menu');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (drawer.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Événements
  burger.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
  });

  overlay.addEventListener('click', closeMenu);

  // Ferme avec Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Ferme après clic sur un lien
  drawer.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
      closeMenu();
    }
  });

  // Ferme si resize au-dessus de 860px
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 860 && drawer.classList.contains('is-open')) {
        closeMenu();
      }
    }, 150);
  });

})();
