class LikeButton extends React.Component {
    state = {
        likes: 0
    };

    addLike = () => {
        let newCount = this.state.likes + 1;
        this.setState({
            likes: newCount
        });
    };
    render() {
        
          return <button>Likes: {this.state.likes} </button>
      }
}
