import { useQuestionsStore } from '../store/questions'

export function Start() {
  const getQuestions = useQuestionsStore(state => state.getQuestions)

  const handleClick = () => {
    getQuestions(5)
  }

  return (
    <button onClick={handleClick}>¡Empezar!</button>
  )
}