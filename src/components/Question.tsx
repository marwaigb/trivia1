import React from "react";
import { AnswerObject } from "../models/AnswerObject";
import './Question.css';

type Props = {
  question: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  answer_4: string;
  correctAns: string;
  questionNum: number;
  totalQuestions: number;
  userAnswer: AnswerObject | undefined;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Question: React.FC<Props> = ({
  question,
  questionNum,
  totalQuestions,
  correctAns,
  answer_1,
  answer_2,
  answer_3,
  answer_4,
  userAnswer,
  callback,
}) => (
  <div className='question'>
    <p className="number">
      Question: {questionNum} / {totalQuestions}
    </p>
    <p>{question}</p>
    <div><button className="answer" value={answer_1} onClick={callback}>{answer_1}</button></div>
    <div><button className="answer" value={answer_2} onClick={callback}>{answer_2}</button></div>
    <div><button className="answer" value={answer_3} onClick={callback}>{answer_3}</button></div>
    <div><button className="answer" value={answer_4} onClick={callback}>{answer_4}</button></div>
  </div>
);

export default Question;
