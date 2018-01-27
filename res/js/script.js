function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);
}
if (hasGetUserMedia()) {
  console.log("working");
} else {
  alert('getUserMedia() is not supported in your browser');
}
const camera = document.getElementById("camera");

camera.addEventListener('load', function() {
    console.log("camera element id works");
});

function displayAsImage(file) {
  var imgURL = URL.createObjectURL(file),
      img = document.createElement('img');

  img.onload = function() {
    URL.revokeObjectURL(imgURL);
  };

  img.src = imgURL;
  document.body.appendChild(img);
}
