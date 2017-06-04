var pointsArray = document.getElementsByClassName('point');

//Assignment 8 revealPoint function:
var revealPoint = function(point) {
    point.style.opacity = 1;
    point.style.transform = "scaleX(1) translateY(0)";
    point.style.msTransform = "scaleX(1) translateY(0)";
    point.style.WebkitTransform = "scaleX(1) translateY(0)";
}

var animatePoints = function(points) {
    // Located in utilities.js file:
    forEach(points, revealPoint);
};

window.onload = function() {
    // Automatically animate the points on a tall screen where scrolling can't trigger the animation:
    if(window.innerHeight > 950) {
        animatePoints(pointsArray);
    }

    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

    window.addEventListener('scroll', function(event) {
        if(document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
            animatePoints(pointsArray);
        }
    });
};
