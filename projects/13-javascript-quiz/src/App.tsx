import './App.css'
import { Start } from './components/Start'
import { useQuestionsStore } from './store/questions'

function App() {
  const questions = useQuestionsStore(state => state.questions)

  return (
    <>
      <h1>JavaScript Quiz</h1>

      {questions.length === 0 && <Start />}
      {questions.length > 0 && <h1>Juego</h1>}
    </>
  )
}

export default App
