import React from 'react'


const cols = [
  'Player',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'Total Score'
]

const ScoreBoardHeader = (props) => {
  return (
    <div className="row score-board-header">
      { cols.map((col, idx) => {
        const className = col.replace(' ', '');
        return <div key={`header-${idx}`} className={`header-col col-${className}`}>{col}</div>
      })
      }
    </div>
  )
}

export default ScoreBoardHeader
