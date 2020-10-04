import React, { Component } from "react";
import { Button, Accordion, Card } from "react-bootstrap";
import styled from 'styled-components';

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
    `;

export default class FAQ extends Component {
    render() {
        return (
            <Styles>
            <form>
            <h3>Have Questions?</h3>
            <p style={{color:"#9FFFCB"}}>
                We may have some answers.
            </p>
            <Accordion defaultActiveKey="0">
                <Card style={{width: "50rem"}}>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            What is CreekIt?
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body style={{color:"black", fontSize:"16px", textAlign: "left"}}>
                            CreekIt is a social media platform that combines the best features and functionalities of popular
                            <br></br>
                            platforms such as Facebook, Reddit, and Twitter.
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card style={{width: "50rem"}}>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            What are some features used by CreekIt?
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body style={{color:"black", fontSize:"16px", textAlign: "left"}}>
                            On CreekIt, users can interact with other users arround the world through posting and
                            <br></br>
                            messaging, with or without revealing one's identity while using upvoting/downvoting  
                            <br></br>
                            to engage with topics and posts.
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card style={{width: "50rem"}}>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            Is there an age restriction on CreekIt?
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body style={{color:"black", fontSize:"16px", textAlign: "left"}}>
                            All users on CreekIt must be 13 years old or above.                                                                                
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="3">
                            How do "topics" work on CreekIt?
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body style={{color:"black", fontSize:"16px", textAlign: "left"}}>
                            Topics are a good way to connect with users on CreekIt. Posts that are tagged allow users
                            <br></br>
                            to grow their network by interacting with other users with similar interests. This is done
                            <br></br>
                            by allowing users following a specific topic to view all posts under that topic.
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="4">
                            Is CreekIt a safe site?
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="4">
                        <Card.Body style={{color:"black", fontSize:"16px", textAlign: "left"}}>
                            Possibly :)
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="5">
                            I still have some more questions.
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="5">
                        <Card.Body style={{color:"black", fontSize:"16px", textAlign: "left"}}>
                            Contact us at <a href='#'>email@email.com</a>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            </form>
            </Styles>
        );
    }
    
}
