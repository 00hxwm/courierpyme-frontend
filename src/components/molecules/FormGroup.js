import React from 'react';
import Input from '../atoms/Input';

function FormGroup({ label, type, placeholder, value, onChange, name, required }) {
  return (
    <div className="mb-3">
      <label className="form-label" style={{ color: 'black'}}>{label}</label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
      />
    </div>
  );
}

export default FormGroup;