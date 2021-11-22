'use strict';
const username = document.querySelector('.js-inputUser');
const password = document.querySelector('.js-inputPassword');
const button = document.querySelector('.js-button');
const container = document.querySelector('.js-container');
const closeSection = document.getElementById('sectionClose');

let login = [];
// let info = [];
let results = [];
let html = '';

function list() {
  for (const malware of results) {
    html += `<li id=${malware.id} class="page__main--sectionFile__sectionList--list hidden js-list">`;
    html += `<h4 class="page__main--sectionFile__sectionList--list__name">Fichero: ${malware.fileName}</h4>`;
    html += `<p class="page__main--sectionFile__sectionList--list__hash">Md5: ${malware.hashmd5}</p>`;
    html += `<p class="page__main--sectionFile__sectionList--list__insertion">Fecha de inserción: ${malware.insertionDate}</p>`;
    html += `<p class="page__main--sectionFile__sectionList--list__lastUpdate">Última actualización: ${malware.lastUpdate}</p>`;
    html += `<p class="page__main--sectionFile__sectionList--list__systemConcerned">Sistema operativo: ${malware.systemConcerned}</p>`;
    html += `</li>`;
  }
  container.innerHTML = html;

  listenList();
}

//funcion para loguearme
function loginCredentials() {
  if (username.value === login.username && password.value === login.password) {
    html = '';

    list();
    closeSection.classList.add('hidden');
    username.value = '';
    password.value = '';
  } else {
    username.value = '';
    password.value = '';
    html = '';
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
  html += `<p class="page__main--sectionFile__sectionInfo--info__extension">Extensión: ${
    infoSelected.fileExtension === 'PDF'
      ? 'PDF <i class="fas fa-file-pdf"></i>'
      : ''
  } </p>`;
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
  html += `<ul class="page__main--sectionFile__sectionInfo--info__list"> Listado de antivirus: <li class="page__main--sectionFile__sectionInfo--info__list--antivirus">Avast: ${
    infoSelected.antivirusList.avast === 'clean'
      ? 'Limpio <i class="fas fa-check"></i>'
      : 'Peligroso <i class="fas fa-exclamation-triangle"></i></i>'
  }</li>`;
  html += `<li class="page__main--sectionFile__sectionInfo--info__list--antivirus">McAfree: ${
    infoSelected.antivirusList.mcafree === 'clean'
      ? 'Limpio <i class="fas fa-check"></i>'
      : 'Peligroso <i class="fas fa-exclamation-triangle"></i></i>'
  }</li>`;
  html += `<li class="page__main--sectionFile__sectionInfo--info__list--antivirus">BitDefender: ${
    infoSelected.antivirusList.bitdefender === 'clean'
      ? 'Limpio <i class="fas fa-check"></i>'
      : 'Peligroso <i class="fas fa-exclamation-triangle"></i></i>'
  }</li>`;
  html += `<li class="page__main--sectionFile__sectionInfo--info__list--antivirus">Panda: ${
    infoSelected.antivirusList.panda === 'clean'
      ? 'Limpio <i class="fas fa-check"></i>'
      : 'Peligroso <i class="fas fa-exclamation-triangle"></i></i>'
  }</li>`;
  html += ` </ul><form><input
  class="js-buttonBack"
  type="button"
  value="Atrás"
/></form></article>`;
  container.innerHTML = html;
  back();
}
function handlerBack() {
  html = '';
  list();
}

function back() {
  const buttonBack = document.querySelectorAll('.js-buttonBack');
  for (const back of buttonBack) {
    back.addEventListener('click', handlerBack);
  }
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
