'use strict';

var renderer	= new THREE.WebGLRenderer({
    antialias	: true
});

renderer.setClearColor(new THREE.Color('lightgrey'), 1)
renderer.setSize( window.innerWidth, window.innerHeight );

var scene	= new THREE.Scene();
var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 2;
var controls = new THREE.OrbitControls(camera)

var geometry = new THREE.TorusKnotGeometry(0.5-0.12, 0.12);
var material = new THREE.MeshNormalMaterial();
var mesh	 = new THREE.Mesh( geometry, material );
scene.add( mesh );

mesh.rotation.z = 1.5708;

function init() {
    output = document.getElementById("output");
    document.body.appendChild( renderer.domElement );
    document.body.appendChild(output);
    render();
}


function render() {

    renderer.render( scene, camera );
    requestAnimationFrame(render);
}


window.addEventListener('resize', function(){
    renderer.setSize( window.innerWidth, window.innerHeight )
    camera.aspect	= window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}, false)



// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: false;};
var frame = {};
var previousFrame;
frame.hands = [];
frame.fingers = [];
frame.tools = [];
frame.gestures = [];
frame.pointables = [];

var output;


Leap.loop(controllerOptions, function(frame) {
  // Body of callback function
 // console.log("running");
    //console.log(frame);

//    output.innerHTML = frame.hands.length;
    if(frame.hands.length) {

        output.innerHTML = frame.hands[0].direction;

        //mesh.rotation.z = frame.hands[0].palmNormal[0];
        mesh.rotation.z = -frame.hands[0].palmNormal[1];
        //mesh.rotation.z = frame.hands[0].palmNormal[2];
    }


});



var frameString = "Frame ID: " + frame.id  + "<br />"
                + "Timestamp: " + frame.timestamp + " &micro;s<br />"
                + "Hands: " + frame.hands.length + "<br />"
                + "Fingers: " + frame.fingers.length + "<br />"
                + "Tools: " + frame.tools.length + "<br />"
                + "Gestures: " + frame.gestures.length + "<br />";

                // Frame motion factors
if (previousFrame) {
  var translation = frame.translation(previousFrame);
  frameString += "Translation: " + vectorToString(translation) + " mm <br />";

  var rotationAxis = frame.rotationAxis(previousFrame);
  var rotationAngle = frame.rotationAngle(previousFrame);
  frameString += "Rotation axis: " + vectorToString(rotationAxis, 2) + "<br />";
  frameString += "Rotation angle: " + rotationAngle.toFixed(2) + " radians<br />";

  var scaleFactor = frame.scaleFactor(previousFrame);
  frameString += "Scale factor: " + scaleFactor.toFixed(2) + "<br />";
}

// Display Hand object data
var handString = "";
if (frame.hands.length > 0) {
  for (var i = 0; i < frame.hands.length; i++) {
    var hand = frame.hands[i];

    handString += "Hand ID: " + hand.id + "<br />";
    handString += "Direction: " + vectorToString(hand.direction, 2) + "<br />";
    handString += "Palm normal: " + vectorToString(hand.palmNormal, 2) + "<br />";
    handString += "Palm position: " + vectorToString(hand.palmPosition) + " mm<br />";
    handString += "Palm velocity: " + vectorToString(hand.palmVelocity) + " mm/s<br />";
    handString += "Sphere center: " + vectorToString(hand.sphereCenter) + " mm<br />";
    handString += "Sphere radius: " + hand.sphereRadius.toFixed(1) + " mm<br />";

    // And so on...
  }
}
