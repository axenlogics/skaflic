import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styles from './style.module.css';
import cx from "classnames";

const InputPhone = ({ label,isDropdownDisable }: any) => {

  const [phone, setPhone] = useState('');
  console.log(isDropdownDisable,'isDropdownDisable')
  return (
    <>
    <div className="mb-5">
        {label && <label className="text-34345b font-medium inline-block mb-1.5 leading-normal">{label}</label>}
        <PhoneInput
        country={'us'}
        // onlyCountries={['tr']}
        alwaysDefaultMask
        disableDropdown={isDropdownDisable!=undefined?isDropdownDisable:true}
        value={phone}
        containerClass={styles.tel_input}
        inputClass={styles.form_control}
        buttonClass={styles.dropBtn}
        onChange={phone => setPhone(phone)}
      />
    </div>
    <style>
      {libStyle}
    </style>
    </>
    
  )
}

const libStyle = `
.react-tel-input .selected-flag:hover, .react-tel-input .selected-flag:focus,
.react-tel-input .flag-dropdown.open,
.react-tel-input .flag-dropdown.open .selected-flag{
  background:none;
}

.react-tel-input .selected-flag{
  padding-left: 10px;
}
.react-tel-input .country-list{
  margin:0;
}
`

export default InputPhone