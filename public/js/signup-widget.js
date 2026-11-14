// The canonical component is served from the module root.
// This public entry point lets partner sites use the documented /js path.
if (!customElements.get('alx-signup')) {
  const script = document.createElement('script');
  script.src = '/alx-signup.js';
  script.defer = true;
  document.head.appendChild(script);
}
