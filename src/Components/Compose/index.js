import React from 'react';
import './Compose.css';

export default function Compose(props) {
    return (
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type your message here"
        />

        {
          props.rightItems
        }
      </div>
    );
}