import React, { useId, forwardRef } from 'react';
import '../Input/Input.css';

const Input = forwardRef(
  ({ label, type = 'text', className = '', ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="custom-label">
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          ref={ref}     
          {...props}
          className={`custom-input ${className}`}
        />
      </div>
    );
  }
);

export default Input;
