import { useState } from 'react'

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  
  return (
  
    <table>
      <tbody>
        <tr><td><StatisticLine text = "good" /></td><td><StatisticLine value = {props.good} /></td></tr>
        <tr><td><StatisticLine text = "neutral" /></td><td><StatisticLine value = {props.neutral} /></td></tr>
        <tr><td><StatisticLine text = "bad" /></td><td><StatisticLine value = {props.bad} /></td></tr>
        <tr><td><StatisticLine text = "all" /></td><td><StatisticLine value = {props.all} /></td></tr>
        <tr><td><StatisticLine text = "average" /></td><td><StatisticLine value = {props.avg.toFixed(1)} /></td></tr>
        <tr><td><StatisticLine text = "positive" /></td><td><StatisticLine value = {props.pos.toFixed(1)} /> %</td></tr>
        </tbody>
    </table>
  )
}

const StatisticLine = (props) => { return <>{props.text} {props.value}</> }
const Button = (props) => (<button onClick={props.handleClick}>{props.text}</button>)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad
  let avg = ((good * 1) + (bad * -1)) / all
  let pos = good / all * 100

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all} avg = {avg} pos = {pos} />
    </div>
  )
}

export default App
