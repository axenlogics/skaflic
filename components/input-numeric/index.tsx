import React, { useRef, useState } from 'react';
import styles from './style.module.css';
import cx from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

const InputNumeric = ({ inputGroupClassName, fcClassName, prependTxtS, prependTxtL, prependClassName, spinClassName, ...props }: any) => {

  const _inputRef = useRef<any>('')

  const handleUp  = () => {
    _inputRef.current.stepUp()
  }

  const handleDown  = () => {
    _inputRef.current.stepDown()
  }
 
  return (
    <div className={cx(styles.input_group, inputGroupClassName)}>
        <div className={cx(styles.input_prepend, prependClassName)}>
          <span className={styles.ptxts}>{prependTxtS}</span>
          <span className={styles.ptxtl}>{prependTxtL}</span></div>
        <div className={styles.input_field}>
          <input
            className={cx(styles.form_control, fcClassName)}
            ref={_inputRef}
            {...props}
          />
          <div className={cx(styles.spin, spinClassName)}>
            <button type="button" className={styles.spin_btn} onClick={handleUp}>
              <FontAwesomeIcon icon={faCaretUp} className={styles.spin_icon} />
            </button>
            <button type="button" className={styles.spin_btn} onClick={handleDown}>
              <FontAwesomeIcon icon={faCaretDown} className={styles.spin_icon} />
            </button>
          </div>
        </div>  
        
        {/* {iconRight && <div className={`${styles.input_append},${appendStyle}`} onClick={onClickIconRight}>{iconRight}</div>} */}
    </div>
  )
}

export default InputNumeric