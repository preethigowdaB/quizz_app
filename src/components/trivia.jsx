import React, { useEffect, useState } from "react";
import { data } from "./data";
import useSound from "use-sound";
import play from "../assets/play.mp3";
import correctanswer from "../assets/correct.mp3";
import wronganswer from "../assets/wrong.mp3";
const Trivia = ({ questionNumber, setQuestionNumber, setstop }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [classname, setClassname] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correctanswer);
  const [wrongAnswer] = useSound(wronganswer);
//play sound
  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  //set the questions
  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (e) => {
    setSelectedAnswer(e);
    setClassname("answer active");
    delay(3000, () =>
      setClassname(e.correct ? "answer correct " : "answer  wrong")
    );
    delay(5000, () => {
      if (e.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setstop(true);
        });
      }
    });
  };
  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers?.map((item) => (
          <>
            <div
              className={selectedAnswer === item ? classname : "answer"}
              onClick={() => handleClick(item)}
            >
              {item?.text}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
