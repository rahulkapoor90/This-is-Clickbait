var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-73159092-1']);
_gaq.push(['_trackPageview']);

(function () {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

const facebook_clickbait = function (node) {

  const images = [...node.getElementsByClassName('mbs _6m6 _2cnj _5s6c')];

  images.forEach(function (el) {
    var links = el.getElementsByTagName('a');
    var link = "";
    for (var i = 0; i < links.length; i++) {
      link = (links[i].innerHTML);
    }
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          var data = JSON.parse(request.responseText);
          var clickbait = data.clickbaitiness;
          var clickbait_banner = el.appendChild(document.createElement("div"));
          if (clickbait < 60) {
            clickbait_banner.style.textDecoration = "underline";
            clickbait_banner.style.color = "rgb(0, 128, 0)";
            clickbait_banner.style.textAlign = "right";
            clickbait_banner.textContent = "Not a Clickbait";

          } else if (clickbait > 90) {
            clickbait_banner.style.textDecoration = "underline";
            clickbait_banner.style.color = "rgb(128, 0, 0)";
            clickbait_banner.style.textAlign = "right";
            clickbait_banner.textContent = "This is a Clickbait";
          } else {
            clickbait_banner.style.textDecoration = "underline";
            clickbait_banner.style.color = "rgb(" + Number((clickbait) * 1.28).toFixed(0) + ", " + Number((100 - clickbait) * 1.28).toFixed(0) + ", 0)";
            console.log(clickbait_banner.style.color);
            clickbait_banner.style.textAlign = "right";
            clickbait_banner.textContent = clickbait + "% Clickbait";
          }
          console.log(clickbait_banner);
          console.log(el);
        }
      }
    };

    request.open("GET", "https://clickbait-detector.herokuapp.com/detect?headline=" + link, true);
    request.send();
  });

};

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    mutation.addedNodes.forEach(function (node) {
      if (node.nodeType === 1) { // ELEMENT_NODE
        facebook_clickbait(node);
      }
    });
  });
});

const config = {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true
};

observer.observe(document.body, config);

facebook_clickbait(document.body);