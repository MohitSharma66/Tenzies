import React from 'react';
import './Center.css';
import Bottom from './Bottom.js';

export default function Center() {

    return (
        <div className='Center-body'>
            <h1 className='Center-heading'>Tenzies</h1>
            <p className='Center-para'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <Bottom />
        </div>
    );
}
