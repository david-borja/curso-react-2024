import { useQuestionsData } from '../hooks/useQuestionsData'

export function Header() {
  const { correct, incorrect, unanswered } = useQuestionsData()

  return (
    <header style={{ marginBottom: '1rem' }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❔ ${unanswered} sin responder`}</strong>
    </header>
  )
}