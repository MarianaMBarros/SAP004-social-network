import routes from './routes.js';

const container = document.querySelector('#root');

const init = () => window.addEventListener('hashchange', renderPage);
const validateHash = (hash) => (hash === '' ? 'login' : hash.replace('#', ''));

const renderPage = () => {

  const page = validateHash(window.location.hash);
  container.innerHTML = '';
  container.appendChild(routes[page]());
};

window.addEventListener('load', () => {
  renderPage();
  init();
});

// export const isLogin = () => {
//   firebase.auth().onAuthStateChanged(function (user) {
//     if (!user && window.location.hash !== "#register") {
//       window.location.hash = '#';
//       window.location.reload();
//     }
//     renderPage()
//   });
// };
