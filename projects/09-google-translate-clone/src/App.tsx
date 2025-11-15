import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from './hooks/useStore'
import './App.css'

function App() {
  const { setFromLanguage } = useStore()
  return (
    <div className='App'>
      <h1>Google Translate</h1>
      <button onClick={() => setFromLanguage('es')}>
        Cambiar a Español
      </button>
    </div>
  )
}

export default App
