import { useState} from "react";
import './Counter.css';

const Counter = () => {
    const [count, setCount] = useState (0);

    const increment = () => {
        setCount(count + 1)
    }
    const decrement = () => {
        setCount (count - 1)
    }
    const reset = () => {
        setCount(0)
    }
    return (
        <div>
            <h1>Contador React</h1>
            <div>
                <span> {count} </span>
            </div>
            <div>
             <button onClick={increment}>➕</button>
             <button onClick={reset}>♻️</button>
             <button onClick={decrement}>➖</button>

            </div>
        </div>
    )
}