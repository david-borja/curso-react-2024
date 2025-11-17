import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap'
import { useStore } from './hooks/useStore'
import './App.css'
import { AUTO_LANGUAGE } from './enums'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'

function App() {
  const {
    fromLanguage,
    toLanguage,
    swapLanguages,
    setFromLanguage,
    setToLanguage
  } = useStore()
  return (
    <Container fluid>
      <h1>Google Translate</h1>

      <Row>
        <Col>
          <LanguageSelector
            onChange={setFromLanguage}
            type='from'
            value={fromLanguage}
          />
          {fromLanguage}
        </Col>
        <Col>
          <Button
            onClick={swapLanguages}
            disabled={fromLanguage === AUTO_LANGUAGE}
            variant='link'
          >
            <ArrowsIcon />
          </Button>
          {/* Aquí irá el componente TextArea */}
        </Col>
        <Col>
          <LanguageSelector
            onChange={setToLanguage}
            type='to'
            value={toLanguage}
          />
          {toLanguage}
        </Col>
      </Row>
    </Container>
  )
}

export default App
