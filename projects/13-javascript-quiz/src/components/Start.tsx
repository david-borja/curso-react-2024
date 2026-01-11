import { useQuestionsStore } from '../store/questions'

const LIMIT_QUESTIONS = 0

export function Start() {
  const getQuestions = useQuestionsStore(state => state.getQuestions)

  const handleClick = () => {
    getQuestions(LIMIT_QUESTIONS)
  }

  return (
    <button onClick={handleClick}>¡Empezar!</button>
  )
}