import { create } from 'zustand'
import { type Question } from '../../types'
// import data from '../../public/data.json'

interface State {
  questions: Question[];
  currentQuestion: number;
  getQuestions: (limit: number) => Promise<void>;
}

export const useQuestionsStore = create<State>((set) => {
  return {
    questions: [],
    currentQuestion: 0,
    getQuestions: async (limit: number) => {
      const res = await fetch('/data.json')
      const json = await res.json()
      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions})
    }
  }
})