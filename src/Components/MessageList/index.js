import React, {useEffect, useState} from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';


import './MessageList.css';
import PopUp from '../PopUps/PopUp';

const MY_USER_ID = 'apple';
document.addEventListener("DOMContentLoaded",() => {
  const the_button = document.querySelector(".js-btn")
  // the_button.addEventListener("click", handleClick)
})



export default function MessageList(props) {
  const [messages, setMessages] = useState([])


  useEffect(() => {
    getMessages();
  },[])

  
  const getMessages = () => {
     var tempMessages = [
        {
          id: 1,
          author: 'apple',
          message: 'Hey, is this listing still available?',
          timestamp: new Date().getTime()
        },
        {
          id: 2,
          author: 'orange',
          message: 'Oh yes it is.',
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
          message: 'Yes, I liked the location of the property',
          timestamp: new Date().getTime()
        },
        {
          id: 5,
          author: 'apple',
          message: 'When can I expect to visit?',
          timestamp: new Date().getTime()
        },
        // {
        //   id: 7,
        //   author: 'orange',
        //   timestamp: new Date().getTime()
        // },
        // {
        //   id: 8,
        //   author: 'orange',
        //  timestamp: new Date().getTime()
        // },
        // {
        //   id: 9,
        //   author: 'apple',
        //   timestamp: new Date().getTime()
        // },
        // {
        //   id: 10,
        //   author: 'orange',
        //   timestamp: new Date().getTime()
        // },
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
        <Toolbar
          title="fName lName"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            
          ]}
        />
              
        

       

        <div className="message-list-container">{renderMessages()}</div>
          
        <Compose rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]}/>
      </div>
      
    );
}