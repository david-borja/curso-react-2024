import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'
import type React from 'react'

// Para catálogos de componentes, vamos a querer que nuestros componentes sean muy extensibles. Por ejemplo un botón
// Pero, los componentes, cuanto más cerca están del negocio, menos extensibles tienen que ser. Y que se controle más desde dentro del componente

interface Props {
  type: SectionType
  loading?: boolean
  value: string
  onChange: (value: string) => void
}

const commonStyles = { border: 0, height: '200px', resize: 'none' as const }

const getPlaceHolder = (({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Introducir texto'
  if (loading === true) return 'Cargando...'
  return 'Traducción'
})

export function TextArea({
  type,
  loading,
  value,
  onChange
}: Props) {
  const styles = type === SectionType.To
    ? { ...commonStyles, backgroundColor: '#f5f5f5' }
    : { ...commonStyles, border: '1px solid #ccc' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      disabled={type === SectionType.To}
      as='textarea'
      placeholder={getPlaceHolder({ type, loading })}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  )
}