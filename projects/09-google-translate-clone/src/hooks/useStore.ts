import { useReducer } from 'react'
import type { Action, FromLanguage, Language, State } from '../types'

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

export function useStore() {
  // 3. Use the useReducer hook to manage state
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  // También vamos a devolver todas las formas de actualizar el estado.
  // IMPORTANTE: Nunca vamos a querer devolver el dispatch directamente,
  // porque estamos atando los componentes a utilizar el reducer de React
  // Si es día de mañana, en lugar de useReducer usamos Redux, o Zustand, tendríamos que cambiar
  // todos los componentes que usan el dispatch.

  const swapLanguages = () => {
    dispatch({ type: 'SWAP_LANGUAGES' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }
  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    // actions
    swapLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}