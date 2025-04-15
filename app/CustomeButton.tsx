import Link from 'next/link';
import React, { ReactNode } from 'react';

interface CustomButtonProps {
    title: string;
    linkText?: string
    icon?: ReactNode;
    className?: string;
    color?: string;
    href?: string;
    newTab?: boolean;
}

function CustomButton({
    href,
    linkText,
    newTab,
    title,
    icon,
    className = '',
    color 
}: CustomButtonProps) {
    const baseClasses = `
    hover:text-black
    px-12 
    py-7
    rounded-2xl
    border-2
    transition-all 
    duration-300
    text-white
    flex
    items-center
    gap-2
    flex
    justify-center
  `;

    return (
        <button
            className={`
                ${baseClasses}
                ${className}
                hover:bg-transparent
        hover:text-[${color}] 
        hover:bg-transparent
        bg-[#ff4d30]
        bg-[${color}]
      `}
        >
            {href ? (
                <a href={href} target={newTab ? "_blank" : undefined} rel={newTab ? "noopener noreferrer" : undefined}>
                    {linkText}
                </a>
            ) : null}
            {icon && <span>{icon}</span>}
            {title}
        </button>
    );
}

export default CustomButton;
