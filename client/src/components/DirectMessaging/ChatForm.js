import React, {useState} from 'react';
import './ChatForm.css';

const ChatForm = ({ onMessageSubmitted }) => {
  const [textMessage, setTextMessage] = useState('');
  const handleChange = (e) => {
      // console.log(e.target.value);
      setTextMessage(e.target.value);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      
      onMessageSubmitted(textMessage);
      setTextMessage('');
  };
    return (
        <form id="chat-form" onSubmit={handleSubmit}>
            {/* <img src={require("../../images/icons/attachment-logo.svg")} alt="Add Attachment" /> */}
            <textarea type="text" 
                placeholder="type a message" 
                value={textMessage}
                onChange={handleChange} />
            <div id="send-button">
            <button type="submit">Send</button>
          </div>
        </form>
        
    );
}

export default ChatForm;