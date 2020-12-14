import React, {Component} from "react";
import firebase from "firebase";

import "./App.css";

var firebaseConfig = {
  apiKey: "AIzaSyBjonRNEb0SYCueDyQzRZ0JoInBz6AmXII",
  authDomain: "computational-game.firebaseapp.com",
  databaseURL: "https:computational-game-default-rtdb.firebaseio.com",
  projectId: "computational-game",
  storageBucket: "computational-game.appspot.com",
  messagingSenderId: "877910975145",
  appId: "1:877910975145:web:31b4151f82274c97abffb8",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      msg: "count start",
      count: 0,
      all: [],
      ans: 0,
    };
    this.doAction = this.doAction.bind(this);
    this.showAns = this.showAns.bind(this);
  }

  doAction(e) {
    this.state.count = 0;
    this.state.all.splice(0, this.state.all.length);
    document.getElementById("on_off").disabled = "true";
    this.intervalid = setInterval(() => {
      this.setState((state) => ({
        num: Math.floor(Math.random() * 90) + 10,
        msg: this.state.counter,
        count: this.state.count + 1,
        all: this.state.all.concat(this.state.num),
        ans: 0,
      }));
      if (this.state.count === 10) {
        clearInterval(this.intervalid);
        document.getElementById("on_off").disabled = "";
      }
    }, 500);
  }

  Cal_ans_num() {
    let arr = this.state.all;
    let sum = function (arr) {
      return arr.reduce(function (prev, current, i, arr) {
        return prev + current;
      });
    };
    return sum(arr);
  }

  showAns(e) {
    if (this.state.all.length > 0) {
      this.setState((state) => ({
        ans: this.Cal_ans_num(),
        num: 0,
      }));
    } else {
      this.setState((state) => ({ans: 0}));
    }
  }

  getFireData() {
    let db = firebase.database();
    let ref = db.ref("sample/");
    let self = this;
    ref
      .orderByKey()
      .limitToFirst(1)
      .on("value", (snapshot) => {
        self.setState({
          data: snapshot.val(),
        });
      });
    return this.state.data[0];
  }

  render() {
    return (
      <div className="First">
        <div className="App-header">
          <p className="Num_Display">{this.state.num}</p>
          <div className="Second">
            <div>
              <select className="Speed_Button" defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>
                  Choose game level
                </option>
                <option value="1">Lv.1</option>
                <option value="2">Lv.2</option>
                <option value="3">Lv.3</option>
              </select>
            </div>
          </div>

          <div className="Third">
            <button className="Click_Box" onClick={this.doAction} id="on_off">
              Game Start!!
            </button>
          </div>

          <div className="Fourth">
            <button className="ans_button" onClick={this.showAns}>
              SHOW ANSWER
            </button>
            <br />
          </div>

          <div className="Fifth">
            <table className="res">
              <tbody>
                <tr>
                  <td>{this.state.ans}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
