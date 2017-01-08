import React, {Component} from 'react';
import {Timer} from '../components/pomodoro.jsx';
import {connect} from 'react-redux';

export class Home extends Component {
  render() {
    const {color} = this.props;
    return (
      <section id="home" className="main" style={{backgroundColor: color}}>
        {/*
        <button
          onClick={
            function () {
              document.getElementById('app').webkitRequestFullScreen();
            }
          }
          >
          FullScreen
        </button>
        */}
        <Timer/>
      </section>
    );
  }
}

Home.propTypes = {color: React.PropTypes.string.isRequired};

const mapStateToProps = store => {
  const {color} = store.representationReducer;
  return {color};
};

export const HomeCmp = connect(mapStateToProps)(Home);