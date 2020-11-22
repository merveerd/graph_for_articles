import React, { ButtonHTMLAttributes }  from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    buttonType?: JSX.IntrinsicElements['button']['type'] //not necessarily here
    handleClick?: () => void;
    href?: string;
    invertColors?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    text: string;
    variant?: 'dark' | 'light';
  }
const Button = ({ text, ...otherProps }: ButtonProps) => (
  <button style = {styles.buttonStyles} {...otherProps}>
    { text }
  </button>
);


const  styles = {
    buttonStyles : {
        cursor: 'pointer',
        padding: '10px',
        height :'80%',
        border: "2px solid #3f51b5",
    }
}

export default Button;