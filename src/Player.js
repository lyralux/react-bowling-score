import React, { Component } from 'react'
import Frame from './Frame'

const PlayerName = ({playerNumber}) => {
  return <div className="player-col col-Player">Player {playerNumber}</div>
}
const PlayerScore = ({score}) => {
  return <div className="player-col col-PlayerScore">{score}</div>
}

const initFrame = (index) => {
  return [null, null]
}

const initFrames = () => {
  let frames = []
  for(let i = 0; i < 10; i++) {
    frames.push(initFrame(i))
  }
  return frames
}

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // frames: { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [] }
      frames: initFrames(),
      score: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.score = this.score.bind(this)
    this._isSpare = this._isSpare.bind(this)
    this._isStrike = this._isStrike.bind(this)
  }

  score() {
    const { frames } = this.state
    let total = 0;
    let _this = this;

     frames.push([0])
     frames.forEach(function(frame, idx) {
       frame.forEach(function(score) { total += score; });
       if (idx >= 9) { return; }
       if (_this._isSpare(frame)) { total += frames[idx+1][0]; }
       if (_this._isStrike(frame)) {
         total += frames[idx+1][0]
         if (frames[idx+1].length >= 2) { total += frames[idx+1][1]; }
         if (_this._isStrike(frames[idx+1])) { total += frames[idx+2][0]; }
       }
     })
     this.setState((prevState) => {
       return {
         ...prevState,
         score: total
       }
     })
  }
  _isSpare(frame) {
    return (frame[0] !== 10) && (frame[0] + frame[1] === 10);
  }
  _isStrike(frame) {
    return (frame[0] === 10);
  }
  handleChange(index, roll, pins) {
    const { frames } = this.state

    let newFrames = [...frames]

    newFrames[index - 1][roll - 1] = parseInt(pins, 10)

    let newState = {
      frames: newFrames
    }
    this.setState((prevState) => {
      return newState
    })

    this.score()
  }
  renderFrames() {

  }
  render(){
    const { score, frames } = this.state
    const { index, handleError, clearError } = this.props
    return (
      <div className="player-row row">
        <PlayerName playerNumber={index} />
        { frames.map((frame, idx) => {
          return <Frame key={`frame-${idx}`} player={index} index={idx + 1} onError={handleError} clearError={clearError} handleChange={this.handleChange} />
        })}
        <PlayerScore score={score} />
      </div>
    )
  }
}

export default Player
