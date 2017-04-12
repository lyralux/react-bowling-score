import React, { Component } from 'react'


const checkStrike = (roll) => {
  return roll === 10 || roll === 'X'
}

class Frame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rolls: ['', ''],
      rollsDisplay: ['',''],
      isStrike: false,
      isSpare: false,
      score: '',
      error: false
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.roll = this.roll.bind(this)
    this.isSpare = this.isSpare.bind(this)
    this.isStrike = this.isStrike.bind(this)
    this.handleErrorClear = this.handleErrorClear.bind(this)
    this.clearError = this.clearError.bind(this)
    this.handleError = this.handleError.bind(this)
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.score !== this.state.score) {
      if(this.state.score > 10 && this.props.index !== 10) {
        console.log('not valid')
        console.log(this.state)

        this.handleError('Not Valid. Total must not exceed 10')
      } else {
        this.clearError()
      }
    }
    if(prevState.error && !this.state.error) {
      this.clearError()
    }
  }
  handleErrorClear() {
    this.setState((prevState) => {
      return {
        ...prevState,
        error: false
      }
    })
  }
  clearError() {
    const props = this.props
    props.clearError()
  }
  handleError(message) {
    console.log(this.props)
    const props = this.props
    this.setState((prevState) => {
      return {
        ...prevState,
        error: true
      }
    })
    props.onError(message)
  }

  isStrike(rolls) {

    return rolls[0] === 10 || rolls[0] === 'X'
  }
  isSpare(rolls) {

    return (rolls[0] !== 10) && (rolls[0] + rolls[1] === 10 || rolls[1] === '/');
  }
  roll(frameIndex, pins) {
    const { rolls } = this.state
    const { handleChange, index } = this.props

    let newRolls = [
      ...rolls
    ]
    let rollsDisplay = [ ...rolls ]
    let pinsDisplay = pins;


   if(pins.toUpperCase() === 'X') {
      pinsDisplay = 10
      rollsDisplay[frameIndex - 1] = 'X'
      newRolls[frameIndex - 1] = 10
      if(index !== 10) {
        rollsDisplay[1] = ''
        newRolls[1] = ''
      }
    } else if(pins === '/') {
      pinsDisplay = 10 - newRolls[0]
      rollsDisplay[frameIndex - 1] = '/'
      newRolls[frameIndex - 1] = pinsDisplay
    } else {
      rollsDisplay[frameIndex - 1] = pins
      newRolls[frameIndex - 1] = pins;
    }

    console.log(typeof frameIndex)
    console.log(typeof index)

    if(frameIndex === 2 && index !== 10 && (Number(newRolls[0]) + Number(pins) === 10)) {
      pinsDisplay = 10 - newRolls[0]
      rollsDisplay[1] = '/'
      newRolls[1] = pinsDisplay
    }

    this.setState((prevState) => {
      return {
        ...prevState,
        rolls: newRolls,
        rollsDisplay: rollsDisplay,
        isSpare: this.isSpare(newRolls),
        isStrike: this.isStrike(newRolls),
        score: newRolls.reduce((acc, val) => {
          return acc + Number(val)
        }, 0)
      }
    })


    handleChange(index, frameIndex, pinsDisplay)

  }
  validate(value, roll) {

    if((value <= 9 && value >= 0) || (value === '/' || value.toUpperCase() === 'X')) {
        this.handleErrorClear()
        return true
      } else {
        this.handleError(`Not Valid on Roll ${roll} of Frame ${this.props.index} for Player ${this.props.player}. Value must be between 0-9, X, or /`)
      }
  }
  handleOnChange(event) {

    const {
      target: {
        dataset: { roll },
        value
      }
    } = event


    if(!this.validate(value, roll)) {
      return
    }

    this.roll(parseInt(roll, 10), value);
  }
  render() {
    const { isStrike, rollsDisplay, error } = this.state

    const { index } = this.props

    const errorClass = error ? 'has-error' : '';

    const extraFrameVisible = index === 10;
    const extraFrameDisabled = index === 10 && checkStrike(rollsDisplay[0])  ? true : false;



    return(
      <div className={`player-col col-Frame frame-${index}`}>
        <div className={`form-group frame-inputs ${errorClass}`}>
          <input ref="roll1" data-roll="1" type="text" className="form-control" value={rollsDisplay[0]} onChange={this.handleOnChange} />
          <input ref="roll2" data-roll="2" disabled={isStrike && index !== 10 ? true : false} value={rollsDisplay[1]} onChange={this.handleOnChange} type="text" className={`form-control`}/>
          <input ref="roll3" data-roll="3" disabled={extraFrameDisabled ? false: true } onChange={this.handleOnChange} type="text" className={ extraFrameVisible ? 'form-control' : 'form-control hidden'}/>
        </div>
      </div>
    )
  }
}

export default Frame
