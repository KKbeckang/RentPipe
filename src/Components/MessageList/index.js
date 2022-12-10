import React, {useEffect, useState} from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import { db } from "../../firebase";
import Message from '../Message';
import moment from 'moment';
import { IoIosInformationCircle } from "react-icons/io";
import { getAuth } from "firebase/auth";
import './MessageList.css';
import styled from 'styled-components';
import { Stack } from 'react-bootstrap';
import PopUp from '../PopUps/PopUp';
import Modal from 'react-bootstrap/Modal';
import Listingitem from '../Listingitem/Listingitem';
import useUser from '../../hooks/useUser';
import timeAgo from 'epoch-timeago';
import bed from "../../Assets/bed.png"
import bathroom from "../../Assets/bathroom.png"
import Image from 'react-bootstrap/Image'
import Card from "react-bootstrap/Card"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import rent from "../../Assets/rent.png"
import sale from "../../Assets/sale.png"
import Slider from "../Listing/slider";
import Button from "react-bootstrap/Button"
import Badge from "react-bootstrap/Badge"
import { useNavigate } from "react-router-dom";



const MY_USER_ID = 'apple';

export default function MessageList(props) {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    getMessages();
  },[])

  const theme = {
    blue: {
      default: "#343a40",
      hover: "#b0b8c0"
    },
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 3px 3px;
  border-radius: 100px;
  outline: 0;
  margin: 0px 0px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;


function sayHello() {
  alert('You clicked me!');
}

Button.defaultProps = {
  theme: "blue"
};

const [rentListings, setRentListings] = useState(null);

  const getMessages = () => {
     var tempMessages = [
        {
          id: 1,
          author: 'apple',
          message: 'Hello, Is this property available?',
         timestamp: new Date().getTime()
        },
        {
          id: 2,
          author: 'orange',
          message: 'Yes, it is available',
          timestamp: new Date().getTime()
        },
        {
          id: 3,
          author: 'orange',
          message: 'Would you like to visit it?',
         timestamp: new Date().getTime()
        },
        {
          id: 4,
          author: 'apple',
          message: 'Yes, I would love to take a look',
         timestamp: new Date().getTime()
        },
        {
          id: 5,
          author: 'apple',
          message: 'When can I visit the earliest',
          timestamp: new Date().getTime()
        },
        {
          id: 6,
          author: 'apple',
          message: 'I am mostly free on the weekends',
         timestamp: new Date().getTime()
        },
        {
          id: 7,
          author: 'orange',
          message: 'Weekends sound great.',
          timestamp: new Date().getTime()
        },
        {
          id: 8,
          author: 'orange',
          message: 'How about next weekend?',
         timestamp: new Date().getTime()
        },
        {
          id: 9,
          author: 'apple',
          message: 'Yes, that sounds perfect',
          timestamp: new Date().getTime()
        },
        {
          id: 10,
          author: 'orange',
          message: 'Awesome, I will seee you then.',
          timestamp: new Date().getTime()
        },
      ]
      setMessages([...messages, ...tempMessages])
  }

  

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

  
    return(
      <div className="message-list">
        
       <Stack>
        <Toolbar
          title="John Smith"
          subtitle="52 Cambridge Ave - Rent"
          rightItems={[       
          <Button onClick={handleShow}>
            <IoIosInformationCircle size={30}/>
          </Button> 
          ]}
        />
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Property Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
        <div>
        <p className="ptag">52 Cambridge Ave<Badge pill bg="success">Discounted Price</Badge>
        </p>
        
          <Slider img={["https://firebasestorage.googleapis.com/v0/b/rentpipe-d4b1c.appspot.com/o/ELliDGPYACMiiSeWaMsEaerI1mb2-066f1d01acaa436239154cd89c018d52-cc_ft_768.webp-492e4d5b-c7b2-4d84-aac6-e2be84337e64?alt=media&token=7f021ae4-5452-488c-bd8e-28f99255c1e7","https://firebasestorage.googleapis.com/v0/b/rentpipe-d4b1c.appspot.com/o/ELliDGPYACMiiSeWaMsEaerI1mb2-f23e90c99a646d23ba9cef4a255a136e-cc_ft_768.webp-571da05c-30d7-40b9-8792-d3af2c2e31c0?alt=media&token=97c03401-302f-474d-9a7e-ecb61f74a23c","https://firebasestorage.googleapis.com/v0/b/rentpipe-d4b1c.appspot.com/o/ELliDGPYACMiiSeWaMsEaerI1mb2-6d0272ffe043eb5bbbe3a1120db2c29e-cc_ft_768.webp-1cb17f2b-aae2-4092-8fce-a865e73ae8de?alt=media&token=340c9caf-9f23-4223-9837-c75b4d894850","https://firebasestorage.googleapis.com/v0/b/rentpipe-d4b1c.appspot.com/o/ELliDGPYACMiiSeWaMsEaerI1mb2-ef8f961e586be6bda5fd5e4b83b02d81-cc_ft_1536.webp-25210523-7e44-4341-a277-dd45a529bef6?alt=media&token=457192a5-2ee2-4dbd-ba9e-fc2beadf6e5c","https://firebasestorage.googleapis.com/v0/b/rentpipe-d4b1c.appspot.com/o/ELliDGPYACMiiSeWaMsEaerI1mb2-b07ea3d7d9520f76522605261d6feae5-cc_ft_768.webp-f243896b-6f46-4d7e-abad-ffea2363341d?alt=media&token=fc03bc1a-13be-4c1b-aa50-d42600710f06"]}/>
         <br/>
        
          <Container>
          <Row>
            <Col><p >Address: 52 Cambridge Ave, Jersey City, NJ 07307</p>
            </Col>
            <Col><a  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("52 Cambridge Ave, Jersey City, NJ 07307")}`} target="_blank">Open in Google maps</a>
            </Col>
          </Row>
          <Row>
            <Col><p className="ptag">posted 2 days ago</p>
            </Col>
            <Col><Button 
                onClick={() => {navigate("/rent/yIgDrAAoIyrjv9JaQ3Ex")}}
              >
                Show more
              </Button>
            </Col>
          </Row>
          </Container>
         
              
         
        
              
        </div>
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

        <div className="message-list-container">{renderMessages()}</div>

        <Compose rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]}/>


        </Stack>
      </div>
    );
}