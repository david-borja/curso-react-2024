import confetti from 'canvas-confetti'
import type { Question as QuestionType } from '../../types'
import { useQuestionsStore } from '../store/questions'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const getBackgroundColor = (info: QuestionType, index: number) => {
  const DEFAULT_COLOR = '#222'
  const { userSelectedAnswer, correctAnswer } = info
  // el usuario no ha seleccionado nada todavía
  if (userSelectedAnswer == null) return DEFAULT_COLOR
  // el usuario ha seleccionado pero la respuesta es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer) return DEFAULT_COLOR
  // si es la solución correcta
  if (index === correctAnswer) return 'green'
  // si la respuesta seleccionada es incorrecta
  if (index === userSelectedAnswer) return 'red'

  return DEFAULT_COLOR
}

export function Question({ info }: { info: QuestionType }) {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
    if (answerIndex === info.correctAnswer) confetti()
  }

  return (
    <div style={{ textAlign: 'left', backgroundColor: '#333', color: 'white', padding: '1rem', borderRadius: '1rem' }}>
      <h5>{info.question}</h5>
      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0' }}>
        {info.answers.map((choice, index) => (
          <li key={index} style={{ listStyleType: 'none' }}>
            <button disabled={info.userSelectedAnswer != null} style={{ width: '100%', backgroundColor: getBackgroundColor(info, index) }} onClick={createHandleClick(index)}>
              {choice}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}