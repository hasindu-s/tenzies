import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

function Modal(props) {
    const hideModal = () => props.show(false);

    useEffect(() => {
        const close = (event) => {
            if (event.key === 'Escape') {
                hideModal();
            }
        }
        window.addEventListener('keydown', close);
        return (() => window.removeEventListener('keydown', close));
    }, []);

    return ReactDOM.createPortal(
        <div className="modal-background">
            <div className="modal-container">
                <div className="modal-close-container">
                    <button className="modal-close" onClick={hideModal}> X </button>            
                </div>
                <h1 className="won-message">You Won!</h1>
                <div className="stats">
                    <h3 className="stats-text">Number of rolls: <span className="stats-value">{props.numOfRolls}</span></h3>
                    <h3 className="stats-text">Time: <span className="stats-value">{props.time.toFixed(1)} seconds</span></h3>
                    <div className="divider">
                        <hr/>
                    </div>
                    <h2 className="best-score">Best score</h2>
                    <h3 className="stats-text">Number of rolls: <span className="stats-value">{props.bestNumOfRolls}</span></h3>
                    <h3 className="stats-text">Time: <span className="stats-value">{props.bestTime.toFixed(1)} seconds</span></h3>
                </div>
                <div className="button-container">
                    <button className="modal-button" onClick={() => props.newGame()}>New game</button>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    );
}

export default Modal