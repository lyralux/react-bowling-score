import React, { Component } from 'react'
import Player from './Player'
import ScoreBoardHeader from './ScoreBoardHeader'
import Messages from './Messages'


class BowlingGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerCount: 5,
      players: [],
      messages: []
    }
    this.handleError = this.handleError.bind(this)
    this.clearError = this.clearError.bind(this)
  }
  clearError() {
    this.setState((prevState) => {
      return {
        ...prevState,
        messages: []
      }
    })
  }
  handleError(message) {
    this.setState((prevState) => {
      return {
        ...prevState,
        messages: { error: [ {msg: message} ] }
      }
    })
  }
  render() {
    const { messages } = this.state
    return (
      <div className="bowling-game container">
        <Messages messages={ messages }/>
        <ScoreBoardHeader />
        <Player handleError={this.handleError} clearError={this.clearError} index={1} />
        <Player handleError={this.handleError} clearError={this.clearError} index={2} />
        <Player handleError={this.handleError} clearError={this.clearError} index={3} />
        <Player handleError={this.handleError} clearError={this.clearError} index={4} />
        <Player handleError={this.handleError} clearError={this.clearError} index={5} />
      </div>
    )
  }
}

export default BowlingGame
