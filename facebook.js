const show_facebook_cv_tags = function() {

  const images = [...document.getElementsByClassName('mbs _6m6 _2cnj _5s6c')];

  images.forEach(function(el) {
    var links = el.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
    var link = (links[i].innerHTML);
  }
var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
      if (request.readyState === 4) {
          if (request.status === 200) {
              var data = JSON.parse(request.responseText);
              let html = "<ul style='position:absolute;top:50px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:rgba(0,0,0,0.7);color:#fff;border-radius:5px'>"+data.clickbaitiness+"% clickbait</ul>";
              el.insertAdjacentHTML('afterend', html);
          }
      }
  };

  request.open("GET", "https://clickbait-detector.herokuapp.com/detect?headline="+link , true);
  request.send();
  });

};


show_facebook_cv_tags();

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        show_facebook_cv_tags();
    });
});

const config = { attributes: true, childList: true, characterData: false }

observer.observe(document.body, config);

show_facebook_cv_tags();
