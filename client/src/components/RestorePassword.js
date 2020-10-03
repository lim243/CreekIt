import React, { Component } from "react";
import styled from 'styled-components';

const CODE_LENGTH = new Array(6).fill(0);

const Styles = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;

  .wrap {
    border: 1px solid rgba(0, 0, 0, 0.2);
    display: inline-block;
    position: relative;
    display: flex;
  }
  
  .input {
    position: absolute;
    border: none;
    font-size: 32px;
    text-align: center;
    background-color: transparent;
    outline: none;
  }
  .display {
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    width: 48px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    position: relative;
    background-color: white;
    color: black;
  }
  .display:last-child {
    border-right: none;
  }
  
  .shadows {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    box-shadow: 0 0 0 4px rgba(58, 151, 212, 0.28);
  }
  `;

class RestorePassword extends Component {
  input = React.createRef();
  state = {
    value: "",
    focused: false,
  };

  handleClick = () => {
    this.input.current.focus();
  };
  handleFocus = () => {
    this.setState({ focused: true });
  };
  handleBlur = () => {
    this.setState({
      focused: false,
    });
  };
  handleKeyUp = e => {
    if (e.key === "Backspace") {
      this.setState(state => {
        return {
          value: state.value.slice(0, state.value.length - 1),
        };
      });
    }
  };
  handleChange = e => {
    const value = e.target.value;

    this.setState(state => {
      if (state.value.length >= CODE_LENGTH.length) return null;
      return {
        value: (state.value + value).slice(0, CODE_LENGTH.length),
      };
    });
  };
  render() {
    const { value, focused } = this.state;

    const values = value.split("");
    
    const selectedIndex =
      values.length < CODE_LENGTH.length ? values.length : CODE_LENGTH.length - 1;

    const hideInput = !(values.length < CODE_LENGTH.length);

    return (
        <Styles>
            <div>
            <p style={{color:"#9FFFCB", fontSize:"15px"}}>
                A verification code was sent to your email.
                <br></br>
                Please enter the verification below.
            </p>
            <br></br>
        </div>
        <div className="wrap" onClick={this.handleClick}>
          <input
            value=""
            ref={this.input}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            className="input"
            style={{
              width: "32px",
              top: "0px",
              bottom: "0px",
              left: `${selectedIndex * 32}px`,
              opacity: hideInput ? 0 : 1,
            }}
          />
          {CODE_LENGTH.map((v, index) => {
            const selected = values.length === index;
            const filled = values.length === CODE_LENGTH.length && index === CODE_LENGTH.length - 1;

            return (
              <div className="display">
                {values[index]}
                {(selected || filled) && focused && <div className="shadows" />}
              </div>
            );
          })}
        </div>
        </Styles>
    );
  }
}

export default RestorePassword;
