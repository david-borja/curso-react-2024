import { expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { translate } from './services/translate'

vi.mock('./services/translate.ts', () => ({
  translate: vi.fn()
}))

const mockedTranslate = vi.mocked(translate)

test('My App works as expected', async () => {
  const user = userEvent.setup()
  const app = render(<App />)
  const textareaFrom = app.getByPlaceholderText('Introducir texto')

  mockedTranslate.mockImplementation(() => Promise.resolve('Hello world'))

  await user.type(textareaFrom, 'Hola mundo')
  const result = await app.findByDisplayValue(/Hello world/i)
  expect(result).toBeTruthy()
})