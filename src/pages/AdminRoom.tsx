//import { FormEvent, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import { Button } from '../components/Button'
import { CodeRoom } from '../components/CodeRoom'
import { Question } from '../components/Questions'
//import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'

import '../styles/room.scss'
import { database } from '../services/firebase'

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  //sessão do usuario
 // const { user } = useAuth();
  const history = useHistory()
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const {questions, title} = useRoom(roomId)

  async function handleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })
    history.push('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm("Realmente quer excluir sua pergunta?")){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="header-content">
          <img src={logoImg} alt="pergunte-me" />
         <div>
          <CodeRoom code={roomId} />
          <Button isOutlined onClick={handleEndRoom}>Encerrar a Sala</Button>
         </div>
        </div>
      </header>
      <main className="main-content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 &&
          <span>{questions.length} de pergunta(s)</span>}
        </div>
        <div className="question-list">
        {questions.map(question => {
          return(
            <Question 
              key={question.id}
              content ={question.content}
              author = {question.author}
            >
              <button 
              type="button"
              onClick={() =>handleDeleteQuestion(question.id)}>

              <img src={deleteImg} alt="remover pergunta"/>
              </button>
            </Question>
          )
        })}
        </div>
      </main>
    </div>
  );
}