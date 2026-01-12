import { useState } from "react";



const Counter = () => {
    const [count, setCount] = useState<number>(0);

    function increment(){ 
        setCount(count +1);
    }


    return (
        <div  className="flex justify-center items-center flex-col p-5 divide-y divide-primary/20">
            <p className="w-50 h-40 text-primary">Compteur: {count}</p>
            <button 
                className="btn btn-primary btn-soft"
                onClick={increment}
            >
                Incrémenter
            </button>
        </div>
    );
}

export default Counter;