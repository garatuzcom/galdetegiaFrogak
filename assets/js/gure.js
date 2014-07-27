/*GARATUZ.COM GALDETEGI SINPLEAREN FROGA || 3 GALDERA MOTA ORAINDIK ONDO MAKETATU GABE*/
/* GALDERAK galderak.xml funtzioan daude, eta aplikazioak funtzioatzeko logika berriz gure.js fitxategian*/
/* Itxura index.html eta gure.css fitxategietan definitzen da eta jokuaren momentuko balioak gordetzeko html5 eko balio-> kateak
*/
/* galdetegiak futzionatzeko funtzioak */

/***********************************Atzera botoia ibili dadin eta orrialde nagusitik irten ******ez dabilll*******************/
 function onDeviceReady(){
    document.addEventListener(
    	"backbutton", function(e){
       if($.mobile.activePage.is('#Nagusia')){
           e.preventDefault();
           navigator.app.exitApp();
       }
       else {
           navigator.app.backHistory()
       }
    }, false);
}
/***************************** Aplikazioa exekutatzean mugikorretan jquery-ren ralentizazio eragina "kentzeko" *****************/

$(document).bind("pageinit", function(event) {

		$.mobile.defaultHashTransition = "none";
		$.mobile.defaultPageTransition = "none";
		$.mobile.transitionFallbacks.slideout = "none";
		$.mobile.defaultDialogTransition = "none";

	});






/************************** Leiho berrian zabaldu daitezen URL ak... phonegap ekin	******************************/

/*function nabigatzailea(url){
	var ref = window.open(url, '_blank', 'location=yes');

}*/



/**************************gaurko eguna eta momentuko ordua emateko funtzioak ***********************************/

function eguna(){
 var f = new Date();
 var niredata = f.getFullYear() + "/" + (f.getMonth() +1) + "/" + f.getDate();
 return niredata;
}
function ordua() {
    var f = new Date();
    var nireordua = f.getHours() + ":" + f.getMinutes();
    return nireordua;
}


/***************************dokumentua kargatzen denean exekutatzen dena > XML irakurketa ***********************/
$(document).ready(function () {
	hasieratu();
	
    $.ajax({
        type: "GET",
        url: "./assets/galderak.xml",
        dataType: "xml",
        success: erakutsi
    });
});
/********************** hasieraketa funtzioa init() **************hobetu daiteke***************aldagaien hasieratzea*/
function hasieratu(){
	
	/* html5 bidezko kate->balio aldagaiak hasieratu */
	
	setBalioa("galderaZenb", 1);
	setBalioa("asmatu",0);
	setBalioa("puntuak",0);
	setBalioa("denbora",0);
    setBalioa("erantzundakoak",1);
    setBalioa("asmatutakoak",0);
}


/* galderak erakusteaz arduratzen den funtzio nagusia. galdera bat bistaratzeko, galdetegia eta galdera zenbakia pasatu behar zaizkio. Kasu honetan galdetegi bat bakarrik dugu */

function erakutsiGaldera($galdetegia,$galderaZenb){

	 //console.log("barruandago");
	//BALIO ZAHARRAK HUSTU
		$("#galdera").html("");	
		/*$("#egitarauEguna").html("");*/
	
	// xml FITXATEGIA JASO...										
		$.ajax({
        type: "GET",
        url: "./assets/galderak.xml",
        dataType: "xml",
        success: function(xml){
    		
					
								//dagokion eguna topatu
						   	$(xml).find("galdetegia").each(function () {
			
									var galdetegia = $(this).attr("izena");
									
										//console.log("galdetegia=" + galdetegia + "Funtzioari pasatua:" ); 									
			
										if (galdetegia == $galdetegia ) {
											//console.log("berdina da");
												/*$("#egitarauEguna").html(xmlEguna);*/
												
												$(this).find("galdera").each(function(){
													/*dagokion galdera idatzi*/
													if ($galderaZenb == $(this).attr("id")){													
														
															/* galdera inprimatu galderaBlokea DIV a honetarako */						
															$("#galdera").append( "<div id='galderaBlokea'>" + $(this).find("galderabera").text() + "</div></br></br>");
													
															/*erantzunak idatzi */
														  	$aukerakont = 0;
														
															/*Galdera mota 1 // galderaren erantzun posibleak */
															/*begiratu galdera mota honen arabera maketatzeko!! */
                                                        /*galdera mota 1*/ 
                                                        if ($(this).attr("mota")==1){
															$(this).find("aukera").each(function(){
																					
																	$aukerakont= $aukerakont  + 1;
																	$("#galdera").append( "<input type='button' value ='" + $(this).text() + "' name='" + $(this).text() + "' onclick='erantzun(" + $(this).attr('au') + ");'></br>");
															
																	/* erantzun zuzena markatuta dagoenez, zein den gorde asmatu aldagaian */
																	if ($(this).attr("erantzuna")== "ok"){
																 			//console.log("hau da erantzuna!!!");
																			 setBalioa("asmatu", $aukerakont);
	
																	}
																	/**/
																	console.log("erantzunAukera:" + $aukerakont + $(this).text());
															});
                                                            
												        }
                                                        /*galdera mota 2 1irudi*/
                                                        if ($(this).attr("mota")==2){
                                                            var irudipath =$(this).attr("src");
                                                            //console.log(irudipath);
                                                            $("#galdera").append("<div id='irudia1'> <img src='" + irudipath + "'></div>");
                                                            $(this).find("aukera").each(function(){
																					
																	$aukerakont= $aukerakont  + 1;
																	$("#galdera").append( "<input type='button' value ='" + $(this).text() + "' name='" + $(this).text() + "' onclick='erantzun(" + $(this).attr('au') + ");'></br>");
															
																	/* erantzun zuzena markatuta dagoenez, zein den gorde asmatu aldagaian */
																	if ($(this).attr("erantzuna")== "ok"){
																 			//console.log("hau da erantzuna!!!");
																			 setBalioa("asmatu", $aukerakont);
	
																	}
																	/**/
																	//console.log("erantzunAukera:" + $aukerakont + $(this).text());
															});
                                                        
                                                        }
                                                        /*galdera mota 3 4irudi*/
                                                        if ($(this).attr("mota")==3){
                                                            
                                                                                                                    
                                                            $(this).find("aukera").each(function(){
																	var irudipath =$(this).attr("src");				
																$("#galdera").append("<div id='" + $(this).text() + "'> <img src='" + irudipath + "'></div>");	
                                                                $aukerakont= $aukerakont  + 1;
                                                            
                                                            });
                                                            $aukerakont = 0;
                                                            $(this).find("aukera").each(function(){
																					
																	$aukerakont= $aukerakont  + 1;
																	$("#galdera").append( "<input type='button' value ='" + $(this).text() + "' name='" + $(this).text() + "' onclick='erantzun(" + $(this).attr('au') + ");'></br>");
															
																	/* erantzun zuzena markatuta dagoenez, zein den gorde asmatu aldagaian */
																	if ($(this).attr("erantzuna")== "ok"){
																 			//console.log("hau da erantzuna!!!");
																			 setBalioa("asmatu", $aukerakont);
	
																	}
																	/**/
																	//console.log("erantzunAukera:" + $aukerakont + $(this).text());
															});
                                                        
                                                        }/* 4.galdera mota*/
                                                              if ($(this).attr("mota")==4){
                                                                var soinupath =$(this).attr("src");	
                                                                $("#galdera").append("<div id='" + $(this).text() + "'><audio controls><source src='" + soinupath + "' type='audio/ogg'></audio></div>");	                                            
                                                           
                                                            $aukerakont = 0;
                                                            $(this).find("aukera").each(function(){
																					
																	$aukerakont= $aukerakont  + 1;
																	$("#galdera").append( "<input type='button' value ='" + $(this).text() + "' name='" + $(this).text() + "' onclick='erantzun(" + $(this).attr('au') + ");'></br>");
															
																	/* erantzun zuzena markatuta dagoenez, zein den gorde asmatu aldagaian */
																	if ($(this).attr("erantzuna")== "ok"){
																 			//console.log("hau da erantzuna!!!");
																			 setBalioa("asmatu", $aukerakont);
	
																	}
																	/**/
																	//console.log("erantzunAukera:" + $aukerakont + $(this).text());
															});
                                                        
                                                        }
                                                        
                                                    }    
												});
										}				
								
								});
			}
		
			});		
} 


/* etorkizunean ordua / data erakusteko erabili daiteken funtzioa */

function erakutsiEguna(){}


/* aplikazioa ixteko funtzioak , irtetzeko */

function itxi() {

window.close()
}  


/* ADI! "kontroladoretxoa" erantzun funtzioa. Hau arduratzen da emaitza zuzena den edo ez begiratzeaz, eta datuak berrizteaz */

function erantzun(jasotakobalioa){

 var balioa = parseInt(jasotakobalioa);
 var puntuak = parseInt(getBalioa("puntuak"));
//	parseInt($("#puntuak").html("")) + 5;
	
	var erantzuna = parseInt(getBalioa("asmatu"));
	   //console.log(erantzuna + " " + balioa );
		if (erantzuna == balioa){
		   puntuak = puntuak + 5;
            var as = parseInt(getBalioa("asmatutakoak"));
            as = as + 1;
            setBalioa("asmatutakoak",as);
		}else{
			puntuak = puntuak - 2;
		}
		
		
     erantzunkop = parseInt(getBalioa("erantzundakoak"));
    console.log(erantzunkop);
   
        setBalioa("puntuak",puntuak);
        $("#marka").html(puntuak);
     if (erantzunkop == 31){
        emaitzakErakutsi();
    }else{
		  galderaAurrera();
        
		//console.log(puntuak);
    //2-0rako idea>galdera erantzun duela markatu array batean gero nabigatzen ez uzteko
         erantzunkop = erantzunkop + 1;    
         setBalioa("erantzundakoak",erantzunkop);
       
    }

}

/* jokoaren amaieran jokalariaren datuak erakutsi */

function emaitzakErakutsi(){
    //console.log("emaitzak erakusten");
	var puntuak = parseInt(getBalioa("puntuak"));
    var asmatutakoak = parseInt(getBalioa("asmatutakoak"));
    var emandakodenbora = "0";
    $("#galdera").html("");
    $("#galdera").html(" Egindako puntuak=" + puntuak);
    $("#galdera").append("<br>asmatutakoak=" + asmatutakoak);
    //if puntuak,mezu bat edo beste adierazi
    $("#galdera").append("<br><input type='button' name='hasierara' value='hasierara' onclick='hasiBerriro()'>");
    $("#galdera").append("<br><input type='button' name='bukatu' value='bukatu' onclick='eskerMezua()'>");
}

/*jokoa berriro hasieratu beharko balitz ;)  */


function hasiBerriro(){
    hasieratu();
     erakutsiGaldera('Arrasate',1);

}

/* bukaeran propaganda, esker mezu bat gure logotipoaz */

function eskerMezua(){
    alert('eskerrik asko jokua frogatzeagatik ;');
}

/* momentuz ez da behar, baina iada inplementatuta, galderaAtzera joateko */

function galderaAtzera(){
	//alert("galdera atzera");
	
		 var galderaZkia = parseInt(getBalioa("galderaZenb"));

	    //console.log("atzera sakatu du " + galderaZkia);

	if (galderaZkia > 1){
			galderaZkia = galderaZkia - 1;
			setBalioa("galderaZenb",galderaZkia);
			erakutsiGaldera("Arrasate",galderaZkia);	
			$("#gaze").html(galderaZkia);
	}
}

/*galdera Aurrera funtzioa, galdera bat erantzuten den bakoitzean exekutatzen da GARRANTZITSUA,erantzun ek erabiltzen du*/


function galderaAurrera(){
	//alert("galdera aurrera");

	 var galderaZkia = parseInt(getBalioa("galderaZenb"));

	//console.log("aurrera sakatu du " + galderaZkia);
	
	if (galderaZkia < 31){
		galderaZkia = 1 + galderaZkia ;
		setBalioa("galderaZenb",galderaZkia);
		erakutsiGaldera("Arrasate", galderaZkia);
		$("#gaze").html(galderaZkia);	
	}
}

/*********Santamassap etik pillauta css klasiak aldatzeko, hemen > Egunaren arabera egitaraua orrialdeko elementuaren itxura aldatu > aukeratuaren itxura  **********/

/* $(window).on('hashchange', function(event, data) {
	
				if(window.location.hash == '#Egitaraua') {
					
					var bat = eguna();
					var ord = ordua();

					//egunaren arabera botoiaren itxura aldatuko da, gaurko eguna beltzez.

					//bat = "2013/12/14";
					
					if ( bat == "2013/12/14" ) {
						$('#ab14').removeClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c').addClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-a').attr('data-theme', 'a');
					}
					if ( bat == "2013/12/15" ) {
						$('#ab15').removeClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c').addClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-a').attr('data-theme', 'a');
					}
					
					if ( bat == "2013/12/18" ) {
						$('#ab18').removeClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c').addClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-a').attr('data-theme', 'a');
					}
					if ( bat == "2013/12/20" ) {
						$('#ab20').removeClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c').addClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-a').attr('data-theme', 'a');
					}
					if ( bat == "2013/11/21" ) {
						$('#ab21').removeClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c').addClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-a').attr('data-theme', 'a');
					}
					if ( bat == "2013/12/22" ) {
						$('#ab22').removeClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c').addClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-a').attr('data-theme', 'a');
					}
					if ( bat == "2013/12/23" ) {
						$('#ab23').removeClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c').addClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-a').attr('data-theme', 'a');
					}
					if ( bat == "2013/12/24" ) {
						$('#ab24').removeClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c').addClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-a').attr('data-theme', 'a');
					}
					
					if ( bat == "2013/12/28" ) {
						$('#ab28').removeClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c').addClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-a').attr('data-theme', 'a');
					}
					if ( bat == "2013/12/31" ) {
						$('#ab31').removeClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c').addClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-a').attr('data-theme', 'a');
					}

			}
});*/
