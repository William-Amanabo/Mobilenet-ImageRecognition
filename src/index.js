//import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu'
import * as mobilenet from '@tensorflow-models/mobilenet';

//import './vendor/bootstrap/css/bootstrap.min.css'

//import 'bootstrap'

const imageSelector = document.querySelector("#image-selector");
const selectedImage = document.querySelector("#selected-image");
const predictionList = document.querySelector("#prediction-list");
const predictButton = document.querySelector("#predict-button");

imageSelector.onchange = () => {
  let reader = new FileReader();
  reader.onload = () => {
    let dataUrl = reader.result;
    selectedImage.setAttribute("src", dataUrl);
    predictionList.innerHTML = ''
  };
  let file = imageSelector.files[0];
  reader.readAsDataURL(file);
};

let model;
(async () =>{
  // Load the model.
  model = await mobilenet.load();
  console.log("%c Model loaded","color:green; font-size:24px");
})()

predictButton.onclick = async () => {

// Classify the image.
const predictions = await model.classify(selectedImage,5);

console.log('Predictions: ');
console.log(predictions);

predictionList.innerHTML = '';

predictions.forEach((p) =>{
  predictionList.append(
    `<li>${p.className}:${p.probability.toFixed(6)}</li>`
  );
})



  /* let top5 = Array.from(predictions)
    .map(function(p, i) {
      return {
        probability: p,
        className: IMAGENET_CLASSES[i],
      };
    })
    .sort((a, b) => {
      return b.probability - a.probability;
    })
    .slice(0, 5);

  predictionList.empty();
  top5.forEach((p) => {
    predictionList.append(
      `<li>${p.className}:${p.probability.toFixed(6)}</li>`
    );
  }); */
};
