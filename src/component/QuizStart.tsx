import React, { useEffect, useState } from 'react';
import { getQuizDetail } from '../services/quiz_service';
import { QuestionType } from '../Types/quiz_types';
import QuestionCard from './QuestionCard';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function QuizStart() {

    let [quiz, setQuiz] = useState<QuestionType[]>([])
    let [currentStep, setCurrentStep] = useState(0)
    let [Score, setScore] = useState(0)
    let [ShowResult, setShowResult] = useState(false)
    let [TotalQuestion, setTotalQuestion] = useState(5)





    useEffect(() => {
        async function fetchData() {
            const questions: QuestionType[] = await getQuizDetail(TotalQuestion, 'easy')
            setQuiz(questions)
        }
        fetchData()
    }, [])

    if (!quiz.length) {
        return (
            <div>
                <Box sx={{ display: 'flex' , justifyContent : 'center'}}>
                    <CircularProgress />
                </Box>
            </div>
        )
    }

    const handlesubmit = (e: React.FormEvent<EventTarget>, userans: string) => {

        e.preventDefault();

        const correctQuestion: QuestionType = quiz[currentStep]

        if (userans === correctQuestion.answer) {

            setScore(++Score)
        }

        if (currentStep !== quiz.length - 1) {
            setCurrentStep(++currentStep)
        } else {
            setShowResult(true)
        }

    }
    if (ShowResult) {
        return (
            <div className = "Result">
                <h1>your score is {Score}  out of  {quiz.length}</h1>
            </div>
        )
    }

    if (!quiz.length)
        return (
            <div>
                <h1>Loading ...</h1>
            </div>
        )


    return (
        <div className="App">
            <div>


                <QuestionCard
                    options={quiz[currentStep].option}
                    question={quiz[currentStep].question}
                    callBack={handlesubmit}
                    currentstate={currentStep}
                    quizLength={quiz.length}
                />


            </div>


        </div>
    );
}

export default QuizStart;
