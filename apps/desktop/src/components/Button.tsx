import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ className, ...props }:ButtonProps) {
    return (
        <button class='' {...props}>
            
        </button>
    )
}
