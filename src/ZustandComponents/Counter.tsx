/* eslint-disable @typescript-eslint/no-explicit-any */
import useCounterStore from "@/stores/useCounterStore";

const Counter = () => {
  const count = useCounterStore((state: any) => state.count);
  const increment = useCounterStore((state: any) => state.increment);
  const decrement = useCounterStore((state: any) => state.decrement);
  return (
    <div>
      <div className="">Counter: {count}</div>
      <div className="">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </div>
  );
};

export default Counter;
