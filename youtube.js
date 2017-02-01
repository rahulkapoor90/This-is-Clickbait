var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-73159092-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

const youtube_clickbait = function() {

  const images = [...document.getElementsByClassName('watch-title')];

  images.forEach(function(el) {
    var link = el.innerHTML;
    console.log(link);
var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
      if (request.readyState === 4) {
          if (request.status === 200) {
              var data = JSON.parse(request.responseText);
              var clickbait = data.clickbaitiness;
              if(clickbait<60){
                let html = "<ul style='position:absolute;top:30px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:#2ecc71;color:#fff;border-radius:5px'>👍 Not a Clickbait</ul>";
                el.insertAdjacentHTML('afterend', html);
              }
              else if(clickbait > 90){
                let html = "<ul style='position:absolute;top:30px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:#F27935;color:#fff;border-radius:5px'>💁 This is Clickbait</ul>";
                el.insertAdjacentHTML('afterend', html);
              }
              else {
                let html = "<ul style='position:absolute;top:30px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:#e67e22;color:#fff;border-radius:5px'>👻 "+clickbait+"% clickbait</ul>";
                el.insertAdjacentHTML('afterend', html);
              }
          }
      }
  };

  request.open("GET", "https://clickbait-detector.herokuapp.com/detect?headline="+link , true);
  request.send();
  });

};


youtube_clickbait();

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        youtube_clickbait();
    });
});

const config = { attributes: true, childList: true, characterData: false }

observer.observe(document.body, config);

youtube_clickbait();
