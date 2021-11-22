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
  html +=
    '<article class="page__main--sectionFile__sectionInfo--info"> <h3 class="page__main--sectionFile__sectionInfo--info__title">Información </h3>';
  html += `<p class="page__main--sectionFile__sectionInfo--info__name"> Nombre completo: ${infoSelected.fileNameComplete} </p>`;
  html += `<p class="page__main--sectionFile__sectionInfo--info__extension">Extensión: ${infoSelected.fileExtension} </p>`;
  html += `<p class="page__main--sectionFile__sectionInfo--info__size"> Tamañaño: ${infoSelected.fileSize} </p>`;
  html += `<ul class="page__main--sectionFile__sectionInfo--info__list"> <li class="page__main--sectionFile__sectionInfo--info__list--hash"> Hash md5: ${infoSelected.hash.md5}<li> `;
  html += `<li class="page__main--sectionFile__sectionInfo--info__list--hash"> Hash sha256: ${infoSelected.hash.sha256}</li> `;
  html += `<li class="page__main--sectionFile__sectionInfo--info__list--hash"> Hash sha-1: ${infoSelected.hash.sha1}</li></ul> `;
  html += `<p class="page__main--sectionFile__sectionInfo--info__ip"> Dirección <span class="page__main--sectionFile__sectionInfo--info__ip--span">ip</span> a las que se ha conectado: ${infoSelected.ip} </p>
  `;
  html += `<p class="page__main--sectionFile__sectionInfo--info__score"> Puntuación obtenida tras el análisis: ${infoSelected.scoreAnalysis}</p>`;
  html += `<ul class="page__main--sectionFile__sectionInfo--info__list"> Listado de ficheros generados: <li class="page__main--sectionFile__sectionInfo--info__list--file">${infoSelected.fileList.fileOne}</li>`;
  html += ` <li class="page__main--sectionFile__sectionInfo--info__list--file">${infoSelected.fileList.fileTwo}</li>`;
  html += ` <li class="page__main--sectionFile__sectionInfo--info__list--file">${infoSelected.fileList.fileThree}</li></ul>`;
  html += `<ul class="page__main--sectionFile__sectionInfo--info__list"> Listado de antivirus: <li class="page__main--sectionFile__sectionInfo--info__list--antivirus">Avast: ${infoSelected.antivirusList.avast}</li>`;
  html += `<li class="page__main--sectionFile__sectionInfo--info__list--antivirus">McAfree: ${infoSelected.antivirusList.mcafree}</li>`;
  html += `<li class="page__main--sectionFile__sectionInfo--info__list--antivirus">BitDefender: ${infoSelected.antivirusList.bitdefender}</li>`;
  html += `<li class="page__main--sectionFile__sectionInfo--info__list--antivirus">Panda: ${infoSelected.antivirusList.panda}</li></ul></article>`;
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
