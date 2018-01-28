import React, { Component } from 'react';
import './App.css';
const request = require('superagent');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shirt: ""
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
      prediction = "Shirt"
    } else {
      prediction = "Not Shirt"
    }
    this.setState({
      shirt: prediction
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
            <div className="container">
              <div className="btn btn--camera">
                <h3 className="title-text">
                  <img src="https://png.icons8.com/small/50/000000/t-shirt.png"/><br/>OR NOT<br/><img src="https://png.icons8.com/small/50/000000/t-shirt.png"/>
                </h3>
              </div>
            </div>
          </label>
        {
          this.state.shirt
        }
        </div>
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
