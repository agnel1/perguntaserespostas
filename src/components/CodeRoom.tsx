import copyImg from '../assets/images/copy.svg';
import '../styles/roomCode.scss';

type CodigoRoomProps = {
    code: string;

}

export function CodeRoom(props: CodigoRoomProps){
    function copiarCodigo(){
        navigator.clipboard.writeText(props.code);
    }

    return(
        <button className="room-code" onClick={copiarCodigo}>
            <div>
                <img src={copyImg} alt="copiar codigo da sala" />
            </div>
            <span> sala: #{props.code} </span>
        </button>
    )
}