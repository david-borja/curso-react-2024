import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../enums'
import type { FromLanguage, Language } from '../types'
import type React from 'react'

// Esto está bien, pero las props van a ser de un tipo u otro en función de si es el selector del idioma de origen o del idioma destino
// interface Props {
//   onChange: (language: Language) => void
// }

type Props =
  | { type: 'from', value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: 'to', value: Language, onChange: (language: Language) => void }

export function LanguageSelector({ onChange, type, value }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <Form.Select aria-label='Selecciona el idioma' onChange={handleChange} value={value}>
      {type === 'from' && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </Form.Select>)
}