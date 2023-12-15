import { useEffect, useState } from "react";
import "./App.css";
import Trivia from "./components/trivia";
import Timer from "./components/timer";
function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState(0);
  const moneypyramid = [
    { id: 1, amount: "$ 100" },
    { id: 2, amount: "$ 200" },
    { id: 3, amount: "$ 300" },
    { id: 4, amount: "$ 500" },
    { id: 5, amount: "$ 1000" },
    { id: 6, amount: "$ 2000" },
    { id: 7, amount: "$ 4000" },
    { id: 8, amount: "$ 8000" },
    { id: 9, amount: "$ 16000" },
    { id: 10, amount: "$ 32000" },
    { id: 11, amount: "$ 64000" },
    { id: 12, amount: "$ 125000" },
    { id: 13, amount: "$ 250000" },
    { id: 14, amount: "$ 500000" },
    { id: 15, amount: "$ 1000000" },
  ].reverse();


  useEffect(() => {
    questionNumber >1 && setEarned(moneypyramid?.find((item)=>item?.id === questionNumber-1).amount)
  }, [questionNumber,moneypyramid])
  
  return (
    <>
      <div className="row g-0 app">
        <div className="col-8  main">
          {stop ? (
            <h1 className="endText">you earned : {earned}</h1>
          ) : (
            <>
              <div className="top">
                <div className="timer"><Timer setStop={setStop} questionNumber={questionNumber}/></div>
              </div>
              <div className="bottom">
                <Trivia
                  setstop={setStop}
                  setQuestionNumber={setQuestionNumber}
                  questionNumber={questionNumber}
                />
              </div>
            </>
          )}
        </div>
        <div className="col-4 pyramid">
          <div className="moneylist">
            {moneypyramid.map((item) => (
              <>
                <li
                  className={
                    questionNumber === item?.id
                      ? "moneylistItem active"
                      : "moneylistItem"
                  }
                >
                  <span className="moneylistItemnumber">{item?.id}</span>
                  <span className="moneylistItemamount">{item?.amount}</span>
                </li>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
