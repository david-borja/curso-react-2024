import type { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from './enums'

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage // en el fromLanguage tenemos la posibilidad de detectar el idioma

export interface State {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
  result: string
  loading: boolean
}

export type Action = 
  | {type: 'SWAP_LANGUAGES'}
  | {type: 'SET_FROM_LANGUAGE', payload: FromLanguage}
  | {type: 'SET_TO_LANGUAGE', payload: Language}
  | {type: 'SET_FROM_TEXT', payload: string}
  | {type: 'SET_RESULT', payload: string}