import React, { useState } from "react";
import "./App.css";
import { IQuestion } from "./models/IQuestion";
import Question from "./components/Question";
import { useAppDispatch, useAppSelector } from './store/hooks';
import { AnswerObject } from "./models/AnswerObject";
import { addUserAnswer, changeIndex ,resetUserAnswer} from "./store/triviaSlice";
import Buttons from "./components/Buttuons";
import Start from "./components/Start";
const TOTAL_QUESTIONS = 5;

function App() {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const questionNumber = useAppSelector((state) => state.trivia.index);
  const questions = useAppSelector((state) => state.trivia.items);
  const userAnswers = useAppSelector((state) => state.trivia.userAnwers);
  const dispatch = useAppDispatch();

  const emptyAnswer = {
    question: '',
    answer: '',
    correct: false,
    correctAnswer: ''
  };

  const start = async () => {
    setGameOver(false);
    setLoading(true);
    setLoading(false);
    setScore(0);
    dispatch(resetUserAnswer(emptyAnswer));
    dispatch(changeIndex(0));

  };

  const nextQuestion = () => {
    const nextQuestion = questionNumber + 1;
      dispatch(changeIndex(nextQuestion));

  };

  const prevQuestion = () => {
    const prevQuestion = questionNumber - 1;
    dispatch(changeIndex(prevQuestion));

  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[questionNumber].correct === answer;
      const answerObject = {
        question: questions[questionNumber].question,
        answer,
        correct,
        correctAnswer: questions[questionNumber].correct,
      };
      dispatch(addUserAnswer(answerObject));
      console.log(userAnswers);
    }
  };

  const endGame = () => {
    setGameOver(true);
    let newScore = 0;
    userAnswers.forEach(element => {
      if(element.answer === element.correctAnswer){
        newScore++;
      }
    });
    setScore(newScore);
  };

  return (
    <div className="App">
      <div className="trivia">
        <h1>Welcome to Trivia</h1>

        {gameOver  ? (
          <Start
          startGame={start}
          Score={score}/>
        ) : null}

        {loading && <p>Loading Questions...</p>}

        {!loading && !gameOver && (
          <Question
            questionNum={questionNumber + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[questionNumber].question}
            callback={checkAnswer}
            answer_1={questions[questionNumber].answer1}
            answer_2={questions[questionNumber].answer2}
            answer_3={questions[questionNumber].answer3}
            answer_4={questions[questionNumber].answer4}
            userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
            correctAns={questions[questionNumber].correct}
          />
        )}

      {!gameOver &&
        !loading &&
        questionNumber !== 0 ? (
        
            <button className="prev" onClick={prevQuestion}>
              Previous Question
            </button>

        ) : null}

        {!gameOver &&
        !loading &&
        questionNumber !== TOTAL_QUESTIONS - 1 ? (
            <button className="next" onClick={nextQuestion}>
              Next Question
            </button>
        ) : null}

      {!gameOver &&
        !loading &&
        userAnswers.length === questionNumber + 1 &&
        questionNumber === TOTAL_QUESTIONS - 1 ? (
         <button className="end" onClick={endGame}>
         End 
        </button>
        ) : null}


      
      </div>
    </div>
  );
}

export default App;



