import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useReducer } from 'react'
import type { Action, State } from './types'

// 1. Create a initial state
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

// 2. Create a reducer
function reducer(
  state: State,
  action: Action
  // state: typeof initialState // también funcionaría
) {
  const { type } = action

  if (type === 'SWAP_LANGUAGES') {
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      fromLanguage: action.payload
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: action.payload
    }
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: ''
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }

  return state
}

function App() {
  // 3. Use the useReducer hook to manage state
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  return (
    <div className='App'>
      <h1>Google Translate</h1>
      <button onClick={() => {
        dispatch({ type: 'SET_FROM_LANGUAGE', payload: 'es' })
      }}>
        Cambiar a Español
      </button>
    </div>
  )
}

export default App
