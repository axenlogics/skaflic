import React from 'react'
import styles from './style.module.css'
import cx from "classnames";

const Card = ({ className, children}: any) => {
  return <div className={cx(styles.card, className)}>{children}</div>
}

const CardHeader = ({ className, children }: any) => {
  return <div className={cx(styles.card_header, className)}>{children}</div>
}

const CardTitle = ({ icon, className, children }: any) => {
  return <h6 className={cx(styles.card_title, className)}><span>{icon}</span>{children}</h6>
}

const CardBody = ({ className, children }: any) => {
  return <div className={cx(styles.card_body, className)}>{children}</div>
}

const CardText = ({ className, children }: any) => {
  return <div className={cx(styles.card_text, className)}>{children}</div>
}

const CardFooter = ({ className, children }: any) => {
  return <div className={cx(styles.card_footer, className)}>{children}</div>
}

export { Card, CardHeader, CardTitle, CardBody, CardText, CardFooter }