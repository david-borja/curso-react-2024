import { create } from 'zustand'
import { type Question } from '../../types'
// import data from '../../public/data.json'

interface State {
  questions: Question[];
  currentQuestion: number;
  getQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPrevQuestion: () => void;
}

export const useQuestionsStore = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    getQuestions: async (limit: number) => {
      const res = await fetch('/data.json')
      const json = await res.json()
      const questions = json.sort(() => Math.random() - 0.5)
      const limitedQuestions = limit ? questions.slice(0, limit) : questions
      set({ questions: limitedQuestions })
    },
    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get()
      const newQuestions = structuredClone(questions)
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)
      const questionInfo = newQuestions[questionIndex]
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }

      set({ questions: newQuestions })
    },
    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion })
      }
    },
    goPrevQuestion: () => {
      const { currentQuestion } = get()
      const prevQuestion = currentQuestion - 1
      if (prevQuestion >= 0) {
        set({ currentQuestion: prevQuestion })
      }
    }
  }
})