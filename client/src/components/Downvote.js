import React from 'react';

class Downvote extends React.Component {
    state = {
        down: 0
    };

    addDownvoteHandler = () => {
        let newCount = this.state.down + 1;
        this.setState({
            down: newCount
        });
    };
    render() {
        
        return <button style={{marginLeft: '10px'}} onClick={this.addDownvoteHandler}>Down {this.state.down} </button>
      }
}

export default Downvote;