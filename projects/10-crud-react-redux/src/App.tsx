import './App.css'
import { Toaster } from 'sonner'
import { CreateNewUser } from './components/CreateNewUser'
import { ListOfUsers } from './components/ListOfUsers'

function App() {

  return (
    <>
      <h1>Nuestro proyecto con Redux</h1>
      <ListOfUsers />
      <CreateNewUser />
      <Toaster richColors />
    </>
  )
}

export default App
