"use strict";const username=document.querySelector(".js-inputUser"),password=document.querySelector(".js-inputPassword"),button=document.querySelector(".js-button"),container=document.querySelector(".js-container"),closeSection=document.getElementById("sectionClose"),logout=document.querySelector(".js-logout"),numberPages=document.querySelector(".js-containerPages");let login=[],results=[],html="",buttons="",resultSub=[],currentPage=0,numberElem=5;function loginCredentials(){const n=md5(password.value);username.value===login.username&&n===login.password?(html="",subArray(),callButtons(),list(),logout.classList.remove("hidden"),closeSection.classList.add("hidden"),username.value="",password.value=""):(username.value="",password.value="",html="",html+='<div class="page__main--sectionFile__error"> Usuario o contraseña incorrecta, comprueba las mayúsculas </div>'),container.innerHTML=html}function list(){for(const n of resultSub[currentPage])html+=`<li id=${n.id} class="page__main--sectionFile__sectionList--list hidden js-list">\n     <h4 class="page__main--sectionFile__sectionList--list__name">Fichero: <span class="page__main--sectionFile__sectionList--list__name--span"> ${n.fileName}${"0"===n.scoreAnalysis?'<i class="page__main--sectionFile__sectionList--list__name--span__iconClean fas fa-circle"></i>':'<i class="page__main--sectionFile__sectionList--list__name--span__iconDanger fas fa-circle"></i>'}</span></h4>\n    <p class="page__main--sectionFile__sectionList--list__name">Md5:\n     <span class="page__main--sectionFile__sectionList--list__name--span">${n.hashmd5}</span></p>\n <p class="page__main--sectionFile__sectionList--list__name">Fecha de inserción: <span class="page__main--sectionFile__sectionList--list__name--span">${n.insertionDate}</span></p><p class="page__main--sectionFile__sectionList--list__name">Última actualización: <span class="page__main--sectionFile__sectionList--list__name--span">${n.lastUpdate}</span> </p>\n    <p class="page__main--sectionFile__sectionList--list__name">Sistema operativo: <span class="page__main--sectionFile__sectionList--list__name--span"> ${n.systemConcerned}</span></p></li>`;container.innerHTML=html,listenList(),listenButtons()}function handleList(n){const i=n.currentTarget.id,s=results[i-1];numberPages.classList.add("hidden"),html=" ",html+=`<article class="page__main--sectionFile__sectionInfo--info"> <h3 class="page__main--sectionFile__sectionInfo--info__title">Información </h3>\n <p class="page__main--sectionFile__sectionInfo--info__name"> Nombre completo: <span class="page__main--sectionFile__sectionInfo--info__name--span">${s.fileNameComplete}</span> </p>\n  <p class="page__main--sectionFile__sectionInfo--info__name">Extensión: <span class="page__main--sectionFile__sectionInfo--info__name--span">${"PDF"===s.fileExtension?'PDF <i class="fas fa-file-pdf page__main--sectionFile__sectionInfo--info__name--span__icon"></i>':""} </span></p>\n  <p class="page__main--sectionFile__sectionInfo--info__name"> Tamaño: <span class="page__main--sectionFile__sectionInfo--info__name--span">${s.fileSize} </span></p>\n  <ul class="page__main--sectionFile__sectionInfo--info__list"> <li class="page__main--sectionFile__sectionInfo--info__list--hash"> Hash md5: <span class="page__main--sectionFile__sectionInfo--info__list--hash__span">${s.hash.md5}</span></li> \n  <li class="page__main--sectionFile__sectionInfo--info__list--hash"> Hash sha-1: <span class="page__main--sectionFile__sectionInfo--info__list--hash__span">${s.hash.sha1}</span></li> \n  <li class="page__main--sectionFile__sectionInfo--info__list--hash"> Hash sha256: <span class="page__main--sectionFile__sectionInfo--info__list--hash__span">${s.hash.sha256}</span></li></ul> \n  <p class="page__main--sectionFile__sectionInfo--info__ip"> Dirección <span class="page__main--sectionFile__sectionInfo--info__ip--span">ip</span> a las que se ha conectado: <span class="page__main--sectionFile__sectionInfo--info__ip--span__span">${s.ip}</span></p>\n  <p class="page__main--sectionFile__sectionInfo--info__name"> Puntuación obtenida tras el análisis: <span  class="page__main--sectionFile__sectionInfo--info__name--span">${s.scoreAnalysis}</span></p>\n   <ul class="page__main--sectionFile__sectionInfo--info__list"> <p class="page__main--sectionFile__sectionInfo--info__list--name">Listado de ficheros generados:</p> <li class="page__main--sectionFile__sectionInfo--info__list--file">${s.fileList.fileOne}</li>\n   <li class="page__main--sectionFile__sectionInfo--info__list--file">${s.fileList.fileTwo}</li>\n   <li class="page__main--sectionFile__sectionInfo--info__list--file">${s.fileList.fileThree}</li></ul>\n  <ul class="page__main--sectionFile__sectionInfo--info__list"> <p class="page__main--sectionFile__sectionInfo--info__list--name">Listado de antivirus:<p> <li class="page__main--sectionFile__sectionInfo--info__list--antivirus">Avast <i class="fas fa-long-arrow-alt-right"></i> <span class="page__main--sectionFile__sectionInfo--info__list--antivirus__span">${"clean"===s.antivirusList.avast?'Limpio <i class="fas fa-check page__main--sectionFile__sectionInfo--info__list--antivirus__span--iconClean"></i>':'Peligroso <i class="fas fa-exclamation-triangle page__main--sectionFile__sectionInfo--info__list--antivirus__span--iconMalicious"></span></i>'}</span></li>\n  <li class="page__main--sectionFile__sectionInfo--info__list--antivirus">McAfree <i class="fas fa-long-arrow-alt-right"></i> <span class="page__main--sectionFile__sectionInfo--info__list--antivirus__span">${"clean"===s.antivirusList.mcafree?'Limpio <i class="fas fa-check page__main--sectionFile__sectionInfo--info__list--antivirus__span--iconClean"></i>':'Peligroso <i class="fas fa-exclamation-triangle page__main--sectionFile__sectionInfo--info__list--antivirus__span--iconMalicious"></span></i>'}</li>\n  <li class="page__main--sectionFile__sectionInfo--info__list--antivirus">BitDefender <i class="fas fa-long-arrow-alt-right"></i> <span class="page__main--sectionFile__sectionInfo--info__list--antivirus__span">${"clean"===s.antivirusList.bitdefender?'Limpio <i class="fas fa-check page__main--sectionFile__sectionInfo--info__list--antivirus__span--iconClean"></i>':'Peligroso <i class="fas fa-exclamation-triangle page__main--sectionFile__sectionInfo--info__list--antivirus__span--iconMalicious"></span></i>'}</li>\n <li                          class="page__main--sectionFile__sectionInfo--info__list--antivirus">Panda <i class="fas fa-long-arrow-alt-right"></i> <span class="page__main--sectionFile__sectionInfo--info__list--antivirus__span">${"clean"===s.antivirusList.panda?'Limpio <i class="fas fa-check page__main--sectionFile__sectionInfo--info__list--antivirus__span--iconClean"></i>':'Peligroso <i class="fas fa-exclamation-triangle page__main--sectionFile__sectionInfo--info__list--antivirus__span--iconMalicious"></span></i>'}</li>\n   </ul><form class="page__main--sectionFile__sectionInfo--info__form"><input\n  class="page__main--sectionFile__sectionInfo--info__form--button js-buttonBack"\n  type="button"\n  value="Volver"\n/></form></article>`,container.innerHTML=html,back()}function handlerBack(){numberPages.classList.remove("hidden"),html="",list()}function back(){document.querySelector(".js-buttonBack").addEventListener("click",handlerBack)}function listenList(){const n=document.querySelectorAll(".js-list");for(const i of n)i.addEventListener("click",handleList)}function api(){fetch("https://maitaneabad.github.io/api-technical-test-ravenloop/api/data.json").then(n=>n.json()).then(n=>{login=n.login,results=n.results})}function subArray(){const n=Math.floor(results.length/numberElem+1);for(let i=0;i<n;i++){let s=0;s=i===n-1?i*numberElem+results.length%numberElem:(i+1)*numberElem,resultSub.push(results.slice(i*numberElem,s))}}function callButtons(){const n=Math.floor(results.length/numberElem+1);for(let i=0;i<n;i++){buttons+=`<button class="page__main--sectionFile__page--buttons  js-buttonPages" id=${i}>${i+1}</button>`}numberPages.innerHTML=buttons,listenButtons()}function listenButtons(){const n=document.querySelectorAll(".js-buttonPages");for(const i of n)i.addEventListener("click",handlerButtons)}function handlerButtons(n){html="",currentPage=n.currentTarget.id,list(),container.innerHTML=html,listenList()}function handlerButton(){loginCredentials(),listenList(),listenButtons()}function handlerLogout(){location.reload()}api(),button.addEventListener("click",handlerButton),logout.addEventListener("click",handlerLogout);