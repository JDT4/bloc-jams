//Animating the points
var pointsArray = document.getElementsByClassName('point');

var revealPoint = function(point) {
	point.style.opacity = 1;
	point.style.transform = "scaleX(1) translate Y(0)";
	point.style.msTransform = "scaleX(1) translateY(0)";
	point.style.webkitTransform = "scaleX(1) translateY(0)";
};

//Reveal points 
var animatePoints = function(points) {
cycleEach(points,revealPoint);
};
console.log(animatePoints);

//animatePoints(pointsArray);

//Run on scroll
/*window.onload = function() {
	     if (window.innerHeight > 950) {
         animatePoints(pointsArray);
     }
     var sellingPoints = document.getElementsByClassName('selling-points')[0];
     var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

     window.addEventListener("scroll", function(event) {
         if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
             animatePoints(revealPoint);   
         }
     });
 };*/
window.onload = function () {
	if (window.innerHeight > 950) {
         animatePoints(pointsArray);
     }
	window.addEventListener("scroll", function(event) {
		if (pointsArray[0].getBoundingClientRect().top <= 500){
			animatePoints(pointsArray);
		}
	});
};