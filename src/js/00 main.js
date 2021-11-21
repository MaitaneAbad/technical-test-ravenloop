'use strict';
const username = document.querySelector('.js-inputUser');
const password = document.querySelector('.js-inputPassword');
const button = document.querySelector('.js-button');
const container = document.querySelector('.js-container');

let login = [];
// let info = [];
let results = [];
let html = '';

//funcion para loguearme
function loginCredentials() {
  if (username.value === login.username && password.value === login.password) {
    for (const malware of results) {
      html += `<ul ">`;
      html += `<li id=${malware.id} class="js-list">`;
      html += `<h4>${malware.fileName}</h4>`;
      html += `<p>${malware.hashmd5}</p>`;
      html += `<p>${malware.insertionDate}</p>`;
      html += `<p>${malware.lastUpdate}</p>`;
      html += `<p>${malware.systemConcerned}</p>`;
      html += `</li><li></li></ul>`;
    }
  } else if (
    username.value !== login.username ||
    password.value !== login.password
  ) {
    html += `<div> Usuario o contraseña incorrecta </div>`;
  }
  container.innerHTML = html;
  listenList();
}

// Eventos para al clicar en un malware que me quite el listado y me aparezca solo los datos del clicado
function handleList(ev) {
  const selected = ev.currentTarget.id;
  const infoSelected = results[selected - 1];
  html = ' ';
  html += '<div> Información ';
  html += `<p> Nombre completo: ${infoSelected.fileNameComplete} </p>`;
  html += `<p>Extensión: ${infoSelected.fileExtension} </p>`;
  html += `<p> Tamañaño: ${infoSelected.fileSize} </p>`;
  html += `<ul> <li> Hash md5: ${infoSelected.hash.md5}<li> `;
  html += `<li> Hash sha256: ${infoSelected.hash.sha256}</li> `;
  html += `<li> Hash sha-1: ${infoSelected.hash.sha1}</li></ul> `;
  html += `<p> Dirección <span>ip</span> a las que se ha conectado: ${infoSelected.ip} </p>
  `;
  html += `<p> Puntuación obtenida tras el análisis: ${infoSelected.scoreAnalysis}</p>`;
  html += `<ul> Listado de ficheros generados: <li>${infoSelected.fileList.fileOne}</li>`;
  html += ` <li>${infoSelected.fileList.fileTwo}</li>`;
  html += ` <li>${infoSelected.fileList.fileThree}</li></ul>`;
  html += `<ul> Listado de antivirus: <li>Avast: ${infoSelected.antivirusList.avast}</li>`;
  html += `<ul> Listado de antivirus: <li>McAfree: ${infoSelected.antivirusList.mcafree}</li>`;
  html += `<ul> Listado de antivirus: <li>BitDefender: ${infoSelected.antivirusList.bitdefender}</li>`;
  html += `<ul> Listado de antivirus: <li>Panda: ${infoSelected.antivirusList.panda}</li></ul>`;
  container.innerHTML = html;
}

function listenList() {
  const listMalware = document.querySelectorAll('.js-list');
  for (const listClick of listMalware) {
    listClick.addEventListener('click', handleList);
  }
}

// Llamo a la API
function api() {
  fetch(
    'https://maitaneabad.github.io/api-technical-test-ravenloop/api/data.json'
  )
    .then((response) => response.json())
    .then((data) => {
      (login = data.login), (results = data.results);
      // (info = data.info);
      console.log(login);
      console.log(results);
      // console.log(info);
    });
}
api();

// funcion para el botón y loguearme
function handlerButton() {
  loginCredentials();
}

button.addEventListener('click', handlerButton);
