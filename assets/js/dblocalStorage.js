//garatuz.com phonegap.com eko errefentziaz HTML5eko localStorage objetua erabiliz 

/* FROGA NOLA ERABILI setBalioa eta getBalioa 

setBalioa("berria","haunirebalioa");
var unekobalioa = getBalioa("berria");
console.log(unekobalioa); */

// Datuak SARTU localStorage erabiliz  > insert eta update onartzen ditu ;) 
// getBalioa , datubasean balioak ezartzeko funtzioa.| ERABILERA: getBalioa(aldagaiizena,aldagaiarenbalioa). 
function setBalioa(aldagaia, balioa) {

	window.localStorage.setItem(aldagaia, balioa);

}
// Datuak IRAKURRI localStorage erabiliz      
//getBalioa , datubaseko balioak errekuperatzeko funtzioa.| ERABILERA: getBalioa(hemen errekuperatu nahi den aldagaiaren izena). 
function getBalioa(aldagaia) {

	var balioa = window.localStorage.getItem(aldagaia);
	return balioa;

}

// Datuak GARBITU localStorage erabiliz    
//datubaseko balioak ezabatzeko funtzioa deitzen du. | ERABILERA: garbituDB() 

function garbituDB() {

	window.localStorage.clear();

}