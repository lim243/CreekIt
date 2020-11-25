import React from 'react';
import Modal from 'react-modal';

import './NewConvo.css';

const customStyle = {
    content: {
        //position: "fixed",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    }, 
};

class NewConvo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal2: "",
            listFollowing: [{username:'bob'}, {username:'apple'}]
        }
        this.modalOpen2 = this.modalOpen2.bind(this);
        this.modalClose2 = this.modalClose2.bind(this);
        this.handleNewDM = this.handleNewDM.bind(this);
    };

    handleNewDM(event) {
        // Handle adding to conversation
        this.modalClose2();
    }

    modalOpen2 = () => {
        this.setState({ modal2: true });
        console.log("CLICKED");
        console.log(this.state.modal2);
    };
    
    modalClose2 = () => {
        this.setState({ modal2: false });
    };

    render() {
        return (
            <div id="new-message-container">
                <div >
                    <button onClick={(e) => this.modalOpen2(e)}>+</button>
                </div>
                <Modal style={customStyle}
                    isOpen={this.state.modal2}
                    onRequestClose={this.modalClose2}>
                    <button id="close" onClick={this.modalClose2}>close</button>
                    <br></br>
                    <br></br>
                    <br></br>
                    {this.state.listFollowing.map((item, index) => (
                        <div>
                            <button id="dm" onClick={this.handleNewDM} >{item.username}</button>
                            <br></br>
                        </div>
                    ))}
                </Modal>    
            </div>
        );
    }
    
}

export default NewConvo;