var points = document.getElementsByClassName('point');
var revealPoint = function(index) {
            points[index].style.opacity = 1;
            points[index].style.transform = "scaleX(1) translate Y(0)";
            points[index].style.msTransform = "scaleX(1) translateY(0)";
            points[index].style.webkitTransform = "scaleX(1) translateY(0)";
        };
var animatePoints = function () {
    for (i = 0; i < points.length; i++) {
revealPoint(i);
};
};
window.onload = function () {
  if (window.innerHeight > 950) {
      animatePoints(points);
  } else {
      animatePoints(points);
  };
};