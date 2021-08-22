import React from 'react';
import './App.css';

function App() {
  const [count, setCount] = React.useState(0);
  const [error, setError] = React.useState(false);

  return (
      <div data-test="component-app" className="App">
        <h1 data-test="counter-display">
          The counter is currently&nbsp;
          <span data-test="count">{count}</span>
        </h1>
        {error && <h4 data-test="error">Counter can't go below 0</h4>}
        <button
            data-test="increment-button"
            onClick={() => {
              if (count === 0 && error){
                setError(false)
              }
              setCount(count + 1)
            }}
        >
          Increment counter
        </button>
        <button data-test="decrement-button" onClick={() => {
          const c = count - 1;
          if (c >=0){
          setCount(c)
          }else {
            setError(true)
          }
        }}>
          Decrement counter
        </button>
      </div>
  );
}

export default App;