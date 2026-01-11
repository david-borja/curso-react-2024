import { useQuestionsData } from '../hooks/useQuestionsData'
import { useQuestionsStore } from '../store/questions'

export function Header() {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionsStore(state => state.reset)

  return (
    <header style={{ marginBottom: '1rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={reset}>Resetear juego</button>
      </div>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❔ ${unanswered} sin responder`}</strong>
    </header>
  )
}