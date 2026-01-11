import { useQuestionsStore } from '../store/questions'
import { Question } from './Question'

export function Game() {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPrevQuestion = useQuestionsStore(state => state.goPrevQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={goPrevQuestion} disabled={currentQuestion === 0}>Anterior</button>
        <span style={{ margin: '0 1rem' }}>Pregunta {currentQuestion + 1} de {questions.length}</span>
        <button onClick={goNextQuestion} disabled={currentQuestion === questions.length - 1}>Siguiente</button>
      </div>
      <Question info={questionInfo} />
    </>
  )
}