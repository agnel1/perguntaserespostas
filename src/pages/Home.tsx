
import { useHistory } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'

import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'

export function Home() {
  const history = useHistory();

  //codigo da sala
  const [codeRoom, setCodeRoom] = useState('');

  const {signInWithGoogle, user} = useAuth();
  //navegação
  async function handleCreateRoom() {
    if(!user){
     await signInWithGoogle()
    }
    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent ) {
    event.preventDefault()
    if(codeRoom.trim()===''){
      return;
    }
    const roomRef = await database.ref(`rooms/${codeRoom}`).get();
    if(!roomRef.exists()){
      alert('essa sala não existe')
      return;
    }
    history.push(`/rooms/${codeRoom}`)
  }

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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separador">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input type="text"
              placeholder="Digite o código da sala" 
              onChange={event => setCodeRoom(event.target.value)}
              value={codeRoom}
              />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}