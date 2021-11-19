'use strict';
const username = document.querySelector('.js-inputUser');
const password = document.querySelector('.js-inputPassword');
const button = document.querySelector('.js-button');
const link = document.querySelector('.js-linkButton');
console.log(link);
console.log(username.value);
let login = [];
let info = [];
let results = [];
function loginCredentials() {
  const link = document.getElementById('js-linkButton');
  console.log(login.username);
  console.log(login.password);
  if (username.value === login.username && password.value === login.password) {
    console.log('Tenemos que renderizar la página y entrar dentro del perfil');
    link.setAttribute('href', './mainPortal.html');
    console.log(link);
  }
}

function api() {
  fetch(
    'https://maitaneabad.github.io/api-technical-test-ravenloop/api/data.json'
  )
    .then((response) => response.json())
    .then((data) => {
      (login = data.login), (results = data.results), (info = data.info);
      console.log(login);
      console.log(results);
      console.log(info);
      loginCredentials();
    });
}
api();

function handlerButton(ev) {
  ev.preventDefault();
  loginCredentials();
}

button.addEventListener('click', handlerButton);
