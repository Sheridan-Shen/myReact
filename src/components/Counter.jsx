import React from "react";
import { useCounterStore } from "../stores/counterStore.js";

function Counter() {
  const { count, increment, decrement } = useCounterStore();
  return (
    <div>
      <h1>Counter</h1>
      <button onClick={increment}>Increment</button>
      <p>Count: {count}</p>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
export default Counter;
