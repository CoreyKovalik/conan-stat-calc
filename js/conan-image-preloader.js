// better image preloading @ https://perishablepress.com/press/2009/12/28/3-ways-preload-images-css-javascript-ajax/
// pre-loaded for prettier rendering when transitioning between attribute teirs
function preloader() {
  if (document.images) {
    var img1 = new Image();
    var img2 = new Image();
    var img3 = new Image();
    var img4 = new Image();
    var img5 = new Image();

    var img6 = new Image();
    var img7 = new Image();
    var img8 = new Image();
    var img9 = new Image();
    var img10 = new Image();

    img1.src = "./images/teir1.png";
    img2.src = "./images/teir2.png";
    img3.src = "./images/teir3.png";
    img4.src = "./images/teir4.png";
    img5.src = "./images/teir5.png";

    img6.src = "./images/t1-glow.png";
    img7.src = "./images/t2-glow.png";
    img8.src = "./images/t3-glow.png";
    img9.src = "./images/t4-glow.png";
    img10.src = "./images/t5-glow.png";
  }
}
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}
addLoadEvent(preloader);