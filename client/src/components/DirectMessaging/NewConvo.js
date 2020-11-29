import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

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
            modal2: false,
            listFollowing: [{username:'bob'}, {username:'apple'}],
            private: false
        }
        this.modalOpen2 = this.modalOpen2.bind(this);
        this.modalClose2 = this.modalClose2.bind(this);
        this.handleNewDM = this.handleNewDM.bind(this);
        this.fetchNewConvoUsers = this.fetchNewConvoUsers.bind(this);
        this.fetchPrivacy = this.fetchPrivacy.bind(this);
    };

    fetchNewConvoUsers(isPrivate){
        const username = localStorage.getItem('username')

        // let isPrivate = this.state.private
        console.log('this.state.private', isPrivate);
        if (isPrivate){
            axios.get(`http://localhost:5000/api/v1/users/${username}/following`)
                .then(res => {
                    console.log('res', res.data.following);
                    const following = res.data.following.map(ele => ({username: ele}))
                

                    this.setState({listFollowing: following})
                }).catch(err => console.error(err))
        } else {
            axios.get(`http://localhost:5000/api/v1/users/${username}/getPublicUsers`)
                .then(res => {
                    console.log('res', res);
                    const following = res.data
                    this.setState({listFollowing: following})
                }).catch(err => console.error(err))
        }
    }

    async fetchPrivacy() {
        const username = localStorage.getItem('username')
        const res = await axios.get(`http://localhost:5000/api/v1/users/${username}/getPrivacy`)
        return res.data.private
    }

    async componentDidMount() {
        const isPrivate = await this.fetchPrivacy()
        this.fetchNewConvoUsers(isPrivate);
    }

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
                        <div key={index}>
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