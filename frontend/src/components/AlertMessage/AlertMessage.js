// src/components/AlertMessage.js
import React, { useState, useEffect } from 'react';

const AlertMessage = ({ type, message, onClose, timer }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        setShow(true); // Ensure alert is shown when props change
    }, [message]);

    useEffect(() => {
        if (timer && timer > 0) {
            const timerId = setTimeout(() => {
                setShow(false);
                if (onClose) onClose();
            }, timer);

            return () => clearTimeout(timerId); // Cleanup the timer on component unmount
        }
    }, [timer, onClose]);

    if (!show) return null;

    return (
        <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
            {message}
            <button type="button" className="btn-close" onClick={() => {
                setShow(false);
                if (onClose) onClose();
            }} aria-label="Close">
                
            </button>
        </div>
    );
};

export default AlertMessage;
