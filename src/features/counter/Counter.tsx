/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount, reset } from "./CounterSlice";
import { useState } from "react";

const Counter = () => {
  const count = useSelector((state: any) => state.counter.count);
  const dispatch = useDispatch();

  const [incrementAmt, setIncrementAmt] = useState(0);

  const resetAll = () => {
    setIncrementAmt(0);
    dispatch(reset());
  };

  const addValue = Number(incrementAmt) | 0;

  return (
    <div className=" w-full flex flex-col items-center justify-center min-h-screen">
      <div className="text-3xl mb-4">{count}</div>
      <div className="flex gap-8 ">
        <button
          className="text-3xl p-4 border border-green-300 rounded-lg"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          className="text-3xl border border-red-300 rounded-lg p-4"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="p-3 border border-blue-200 mt-3 rounded-lg"
          value={incrementAmt}
          onChange={(e: any) => setIncrementAmt(e.target.value)}
        />
        <button
          className="bg-blue-100 px-2 rounded-3xl cursor-pointer"
          onClick={() => {
            dispatch(incrementByAmount(addValue));
            setIncrementAmt(0);
          }}
        >
          Add {incrementAmt}
        </button>
      </div>

      <div className="mt-3 bg-red-400 p-3 rounded-lg">
        <button onClick={resetAll}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;
