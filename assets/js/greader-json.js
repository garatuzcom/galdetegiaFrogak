/*GURE JSON IRAKURGAILUA: JQUERY FUNTZIOA -> YAHOO PIPES-era deitzen du 2013-02-05*/ 
function initBerriak() {
  var url="http://pipes.yahoo.com/pipes/pipe.run?_id=926d26197a45689cfca6df867459a7fb&_render=json";    
  $.getJSON(url, function(data) {
    $.each(data.value.items, function(i, item){
      $('.grJSON').append('<li class="rssRow">' + '<h5>' + '<a href="' + item.link+ '">' + item.title + '</a>' + '</h5>' + '<div>' + item.pubDate + '</div><p>' + item.description + '</p>');
    });
    $('.grJSON').wrapInner('<ul data-role="listview" data-theme="a" class="ui-listview ui-lista"></ul>');
    $('#loading').hide();
  });         
}
