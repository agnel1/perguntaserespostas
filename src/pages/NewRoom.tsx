import { Link } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

export function NewRoom() {
  const {user} = useAuth()
  
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Pergunte e tenha suas respostas" />
        <strong>Crie salas de Q &amp; A ao-vivo</strong>
        <p>Tire duvidas da sua audiência em tempo-real</p>
      </aside>
      <main>

        <div className="main-content">
          <img src={logoImg} alt="Pergunte-me" />
          <h2>Criar uma nova Sala</h2>
          <form action="">
            <input type="text"
              placeholder="Nome da sala" />
            <Button type="submit">
              Criar Sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente?
            <Link to="/"> clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}