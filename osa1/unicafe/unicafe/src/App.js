import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={good + neutral + bad} />
        <StatisticsLine
          text="average"
          value={(good * 1 + bad * -1) / (good + neutral + bad)}
        />
        <StatisticsLine
          text="positive"
          value={(good / (good + bad + neutral)) * 100 + " %"}
        />
      </tbody>
    </table>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClicks = () => {
    setGood(good + 1);
  };

  const handleNeutralClicks = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClicks = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGoodClicks} />
      <Button text="neutral" handleClick={handleNeutralClicks} />
      <Button text="bad" handleClick={handleBadClicks} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
