import React, {Component} from 'react';
// import Ink from 'react-ink';
import moment from 'moment';
// import {RippleButton} from 'react-ripple-effect';
// import Ripples from 'react-ripples';
import {notifyMe} from '../workers/notification';

const time = 1500000;
const docTitle = document.getElementsByTagName('title')[0];

export class TimerWidget extends Component {
  constructor() {
    super();
    this.state = {time, running: false, buttonName: 'START'};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (this.state.running) {
      this.reset();
    } else {
      this.interval = setInterval(this.changeTime.bind(this), 1000);
      this.start();
    }
  }
  reset() {
    docTitle.textContent = 'Tomatoes (pomodoro) work timer';
    clearInterval(this.interval);
    this.setState({animation: '', time, running: false, buttonName: 'START'});
  }
  start() {
    this.setState({animation: 'animation', running: true, buttonName: 'RESET'});
  }
  timer() {
    this.interval = setInterval(this.changeTime.bind(this), 1000);
  }
  changeTime() {
    const time = this.state.time - 1000;
    if (time === 0) {
      notifyMe();
      this.reset();
    } else {
      this.setState({time});
    }
  }
  render() {
    let {time, buttonName, running} = this.state;
    const duration = moment.duration(time);
    let durationSec = '';
    if (duration.seconds().toString().length < 2) {
      durationSec = `0${duration.seconds()}`;
    } else {
      durationSec = duration.seconds();
    }
    const resultTime = `${duration.minutes()}:${durationSec}`;
    if (running) {
      docTitle.textContent = resultTime;
    }
    const animation = this.state.animation;
    // TODO add <Ink/>
    return (
      <div id="container">
        <div className={animation} id="countdown">{resultTime}</div>
        <button className="button" autoFocus onClick={this.handleClick}>{buttonName}</button>
      </div>
    );
  }
}
// <button autoFocus onClick={this.handleClick}>{buttonName}</button>
// <RippleButton onClick={this.handleClick} className="button">{buttonName}</RippleButton>
