import React, { Component } from 'react';
import './App.css';
const request = require('superagent');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    }
    this.onImage = this.onImage.bind(this);
    this.getPrediction = this.getPrediction.bind(this);
  }
  async getPrediction(file) {
    const req = request
      .post('https://southcentralus.api.cognitive.microsoft.com/customvision/v1.1/Prediction/faec218d-a294-4b22-9e35-4dd925c0ba7c/image')
      .set('Prediction-Key', '143515aaa0e343e1918dce96217a6d34')
      .set("Accept", "application/json")
      .set("Content-type", "multipart/form-data");
    const res = await req.send(file);
    const response = JSON.parse(res.text);
    let prediction;
    if ((response.Predictions[0].Probability > response.Predictions[1].Probability) && (response.Predictions[0].Probability > 0.5)) {
      prediction = "Shirt!"
    } else {
      prediction = "Not Shirt!"
    }
    this.setState({
      text: prediction
    });
  }
  onImage(event) {
    event.preventDefault();
    const input = event.currentTarget;
    let file = input.files[0];
    this.getPrediction(file);
  }
  render() {
    return (
      <div>
        <div>
          <label htmlFor={"camera"}>
            <div class="container">
              <div className="btn btn--camera"></div>
            </div>
          </label>
        </div>
        {
          this.state.text
        }
        <input onChange={this.onImage}
               className="hidden"
               id="camera"
               type="file"
               accept="image/*"
               capture
               ref="fileInput"/>
      </div>
    );
  }
}
