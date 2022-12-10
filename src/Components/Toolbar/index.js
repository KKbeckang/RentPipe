import React from 'react';
import './Toolbar.css';

export default function Toolbar(props) {
    const { title, leftItems, rightItems ,subtitle} = props;
    return (
      <div className="toolbar">
        <div className="left-items">{ leftItems }</div>
        <div>
        <h1 className="toolbar-title">{ title }</h1>
        <h1 className="toolbar-title" >{subtitle}</h1>
        </div>
        
        <div className="right-items">{ rightItems }</div>
      </div>
    );
}