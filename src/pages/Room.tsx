import {useParams} from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { CodeRoom } from '../components/CodeRoom'
import '../styles/room.scss'

type RoomParams = {
    id: string;
}

export function Room(){
    const params = useParams<RoomParams>()

    return(
        <div id="page-room">
            <header>
                <div className="header-content">
                    <img src={logoImg} alt="pergunte-me"/>
                    <CodeRoom code={params.id}/>
                </div>
            </header>
            <main className="main-content">
                <div className="room-title">
                    <h1>sala </h1>
                    <span>n de perguntas</span>
                </div>

                <form >
                    <textarea 
                        placeholder="qual a sua pergunta?"
                    />
                    <div className="form-footer">
                        <span>para enviar uma pergunta, <button>faça seu login </button></span>
                        <Button type="submit">Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}