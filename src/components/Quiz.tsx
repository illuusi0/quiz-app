import React, { useState } from "react";
import "../styles/Quiz.css";

interface QuestionData {
    "test-id": number;
    question: string;
    variants: string[];
}

const questions: QuestionData[] = [
    { "test-id": 1, question: "Вопрос 1", variants: ["а", "б", "в", "г"] },
    { "test-id": 2, question: "Вопрос 2", variants: ["а", "б", "в", "г"] },
    { "test-id": 3, question: "Вопрос 3", variants: ["а", "б", "в", "г"] },
    { "test-id": 4, question: "Вопрос 4", variants: ["а", "б", "в", "г"] },
    { "test-id": 5, question: "Вопрос 5", variants: ["а", "б", "в", "г"] },
];

const correctAnswers = [
    { "test-id": 1, answer: 1 },
    { "test-id": 2, answer: 0 },
    { "test-id": 3, answer: 3 },
    { "test-id": 4, answer: 0 },
    { "test-id": 5, answer: 2 },
];

export const Quiz: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [quizFinished, setQuizFinished] = useState(false);

    const isAnswerCorrect = (
        questionIndex: number,
        selectedAnswerIndex: number
    ) => {
        const correctAnswerIndex = correctAnswers.find(
            (answer) =>
                answer["test-id"] === questions[questionIndex]["test-id"]
        )?.answer;
        return selectedAnswerIndex === correctAnswerIndex;
    };

    const handleAnswer = (answerIndex: number) => {
        setSelectedAnswers((prev) => [...prev, answerIndex]);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const calculateResults = () => {
        let correctCount = selectedAnswers.reduce(
            (total, selectedAnswer, index) => {
                const correctAnswer = correctAnswers.find(
                    (answer) =>
                        answer["test-id"] === questions[index]["test-id"]
                )?.answer;
                return total + (selectedAnswer === correctAnswer ? 1 : 0);
            },
            0
        );
        return correctCount;
    };

    return (
        <div className="quiz-container">
            {!quizFinished ? (
                <>
                    <h2 className="question">
                        {questions[currentQuestionIndex].question}
                    </h2>
                    <div className="answer-list">
                        {questions[currentQuestionIndex].variants.map(
                            (variant, index) => (
                                <button
                                    key={index}
                                    className="answer-item"
                                    onClick={() => handleAnswer(index)}>
                                    {variant}
                                </button>
                            )
                        )}
                    </div>
                </>
            ) : (
                <>
                    <h2>Ваши ответы:</h2>
                    <div>
                        {selectedAnswers.map((answer, index) => (
                            <li
                                key={index}
                                className={`answer-item selected-answer ${
                                    isAnswerCorrect(index, answer)
                                        ? ""
                                        : "incorrect-answer"
                                }`}>
                                {index + 1}. {questions[index].variants[answer]}
                            </li>
                        ))}
                    </div>

                    <div className="results">
                        Верных ответов: {calculateResults()} из{" "}
                        {questions.length}
                    </div>
                </>
            )}
        </div>
    );
};
