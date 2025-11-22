import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Container,
  Row,
  Col,
  Button,
  Stack
} from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './enums'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

function App() {
  const {
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    setFromText,
    setResult,
    swapLanguages,
    setFromLanguage,
    setToLanguage
  } = useStore()
  const debouncedFromText = useDebounce(fromText)

  useEffect(() => {
    if (debouncedFromText === '') return
    const text = fromText === result ? fromText : debouncedFromText
    translate({ fromLanguage, toLanguage, text })
      .then(result => {
        if (result == null) return // esta validación con == en JS no se usa mucho, pero en TS tiene bastante sentido
        setResult(result)
      })
      .catch(() => { setResult('Error en la traducción') })
  }, [debouncedFromText, fromLanguage, toLanguage])

  return (
    <Container fluid>
      <h2>Google Translate</h2>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              onChange={setFromLanguage}
              type={SectionType.From}
              value={fromLanguage}
            />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>
        <Col xs='auto'>
          <Button
            onClick={swapLanguages}
            disabled={fromLanguage === AUTO_LANGUAGE}
            variant='link'
          >
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              onChange={setToLanguage}
              type={SectionType.To}
              value={toLanguage}
            />
            <TextArea
              type={SectionType.To}
              value={result}
              onChange={setResult}
              loading={loading}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
