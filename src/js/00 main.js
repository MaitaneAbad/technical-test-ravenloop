'use strict';
const username = document.querySelector('.js-inputUser');
const password = document.querySelector('.js-inputPassword');
const button = document.querySelector('.js-button');
const container = document.querySelector('.js-container');

const closeSection = document.getElementById('sectionClose');
const logout = document.querySelector('.js-logout');

let login = [];
let results = [];
let html = '';

function list() {
  for (const malware of results) {
    html += `<li id=${malware.id} class="page__main--sectionFile__sectionList--list hidden js-list">`;
    html += `<h4 class="page__main--sectionFile__sectionList--list__name">Fichero: <span class="page__main--sectionFile__sectionList--list__name--span"> ${
      malware.fileName
    }${
      malware.scoreAnalysis <= '50'
        ? '<i class="page__main--sectionFile__sectionList--list__name--span__iconClean fas fa-circle"></i>'
        : '<i class="page__main--sectionFile__sectionList--list__name--span__iconDanger fas fa-circle"></i>'
    }</span></h4>`;
    html += `<p class="page__main--sectionFile__sectionList--list__name">Md5:
     <span class="page__main--sectionFile__sectionList--list__name--span">${malware.hashmd5}</span></p>`;
    html += `<p class="page__main--sectionFile__sectionList--list__name">Fecha de inserción: <span class="page__main--sectionFile__sectionList--list__name--span">${malware.insertionDate}</span></p>`;
    html += `<p class="page__main--sectionFile__sectionList--list__name">Última actualización: <span class="page__main--sectionFile__sectionList--list__name--span">${malware.lastUpdate}</span> </p>`;
    html += `<p class="page__main--sectionFile__sectionList--list__name">Sistema operativo: <span class="page__main--sectionFile__sectionList--list__name--span"> ${malware.systemConcerned}</span></p></li>`;
  }

  container.innerHTML = html;

  listenList();
}

//funcion para loguearme
function loginCredentials() {
  const md5hash = md5(password.value);
  console.log(md5hash);
  if (username.value === login.username && md5hash === login.password) {
    html = '';
    html += `<label for="page">Página:
    <select class="js-page" id="page" name="page">
      <option value="1">1</option>
      <option value="2">2</option>
    </select></label>`;
    list();
    logout.classList.remove('hidden');
    closeSection.classList.add('hidden');
    username.value = '';
    password.value = '';
  } else {
    username.value = '';
    password.value = '';
    html = '';
    html += `<div> Usuario o contraseña incorrecta, comprueba las mayúsculas </div>`;
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
  html += `<p class="page__main--sectionFile__sectionInfo--info__name"> Nombre completo: <span class="page__main--sectionFile__sectionInfo--info__name--span">${infoSelected.fileNameComplete}</span> </p>`;
  html += `<p class="page__main--sectionFile__sectionInfo--info__name">Extensión: <span class="page__main--sectionFile__sectionInfo--info__name--span">${
    infoSelected.fileExtension === 'PDF'
      ? 'PDF <i class="fas fa-file-pdf page__main--sectionFile__sectionInfo--info__name--span__icon"></i>'
      : ''
  } </span></p>`;
  html += `<p class="page__main--sectionFile__sectionInfo--info__name"> Tamaño: <span class="page__main--sectionFile__sectionInfo--info__name--span">${infoSelected.fileSize} </span></p>`;
  html += `<ul class="page__main--sectionFile__sectionInfo--info__list"> <li class="page__main--sectionFile__sectionInfo--info__list--hash"> Hash md5: <span class="page__main--sectionFile__sectionInfo--info__list--hash__span">${infoSelected.hash.md5}</span></li> `;
  html += `<li class="page__main--sectionFile__sectionInfo--info__list--hash"> Hash sha-1: <span class="page__main--sectionFile__sectionInfo--info__list--hash__span">${infoSelected.hash.sha1}</span></li> `;
  html += `<li class="page__main--sectionFile__sectionInfo--info__list--hash"> Hash sha256: <span class="page__main--sectionFile__sectionInfo--info__list--hash__span">${infoSelected.hash.sha256}</span></li></ul> `;

  html += `<p class="page__main--sectionFile__sectionInfo--info__ip"> Dirección <span class="page__main--sectionFile__sectionInfo--info__ip--span">ip</span> a las que se ha conectado: <span class="page__main--sectionFile__sectionInfo--info__ip--span__span">${infoSelected.ip}</span> </p>
  `;
  html += `<p class="page__main--sectionFile__sectionInfo--info__name"> Puntuación obtenida tras el análisis: <span class="page__main--sectionFile__sectionInfo--info__name--span">${infoSelected.scoreAnalysis}</span></p>`;
  html += `<ul class="page__main--sectionFile__sectionInfo--info__list"> <p class="page__main--sectionFile__sectionInfo--info__list--name">Listado de ficheros generados:</p> <li class="page__main--sectionFile__sectionInfo--info__list--file">${infoSelected.fileList.fileOne}</li>`;
  html += ` <li class="page__main--sectionFile__sectionInfo--info__list--file">${infoSelected.fileList.fileTwo}</li>`;
  html += ` <li class="page__main--sectionFile__sectionInfo--info__list--file">${infoSelected.fileList.fileThree}</li></ul>`;
  html += `<ul class="page__main--sectionFile__sectionInfo--info__list"> <p class="page__main--sectionFile__sectionInfo--info__list--name">Listado de antivirus:<p> <li class="page__main--sectionFile__sectionInfo--info__list--antivirus">Avast <i class="fas fa-long-arrow-alt-right"></i> <span class="page__main--sectionFile__sectionInfo--info__list--antivirus__span">${
    infoSelected.antivirusList.avast === 'clean'
      ? 'Limpio <i class="fas fa-check page__main--sectionFile__sectionInfo--info__list--antivirus__span--iconClean"></i>'
      : 'Peligroso <i class="fas fa-exclamation-triangle page__main--sectionFile__sectionInfo--info__list--antivirus__span--iconMalicious"></span></i>'
  }</span></li>`;
  html += `<li class="page__main--sectionFile__sectionInfo--info__list--antivirus">McAfree <i class="fas fa-long-arrow-alt-right"></i> <span class="page__main--sectionFile__sectionInfo--info__list--antivirus__span">${
    infoSelected.antivirusList.mcafree === 'clean'
      ? 'Limpio <i class="fas fa-check page__main--sectionFile__sectionInfo--info__list--antivirus__span--iconClean"></i>'
      : 'Peligroso <i class="fas fa-exclamation-triangle page__main--sectionFile__sectionInfo--info__list--antivirus__span--iconMalicious"></span></i>'
  }</li>`;
  html += `<li class="page__main--sectionFile__sectionInfo--info__list--antivirus">BitDefender <i class="fas fa-long-arrow-alt-right"></i> <span class="page__main--sectionFile__sectionInfo--info__list--antivirus__span">${
    infoSelected.antivirusList.bitdefender === 'clean'
      ? 'Limpio <i class="fas fa-check page__main--sectionFile__sectionInfo--info__list--antivirus__span--iconClean"></i>'
      : 'Peligroso <i class="fas fa-exclamation-triangle page__main--sectionFile__sectionInfo--info__list--antivirus__span--iconMalicious"></span></i>'
  }</li>`;
  html += `<li class="page__main--sectionFile__sectionInfo--info__list--antivirus">Panda <i class="fas fa-long-arrow-alt-right"></i> <span class="page__main--sectionFile__sectionInfo--info__list--antivirus__span">${
    infoSelected.antivirusList.panda === 'clean'
      ? 'Limpio <i class="fas fa-check page__main--sectionFile__sectionInfo--info__list--antivirus__span--iconClean"></i>'
      : 'Peligroso <i class="fas fa-exclamation-triangle page__main--sectionFile__sectionInfo--info__list--antivirus__span--iconMalicious"></span></i>'
  }</li>`;
  html += ` </ul><form class="page__main--sectionFile__sectionInfo--info__form"><input
  class="page__main--sectionFile__sectionInfo--info__form--button js-buttonBack"
  type="button"
  value="Volver"
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
      login = data.login;
      results = data.results;
    });
}
api();
// funcion para el botón y loguearme
function handlerButton() {
  loginCredentials();
}
function handlerLogout() {
  location.reload();
}

button.addEventListener('click', handlerButton);
logout.addEventListener('click', handlerLogout);
