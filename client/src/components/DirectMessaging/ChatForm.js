import React from 'react';

import './ChatForm.css';

function ChatForm() {
    return (
        <div id="chat-form">
            {/* <img src={require("../../images/icons/attachment-logo.svg")} alt="Add Attachment" /> */}
            <textarea type="text"  placeholder="type a message" />
            <div id="send-button">
            <button >
              Send
            </button>
          </div>
        </div>
        
    );
}

export default ChatForm;