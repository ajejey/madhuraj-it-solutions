'use client';

import Link from 'next/link';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-montserrat transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary hover:bg-primary-hover text-white',
        secondary: 'bg-secondary hover:bg-secondary-hover text-white',
        accent: 'bg-accent hover:bg-accent-hover text-white',
        outline: 'border-2 bg-transparent hover:bg-white/10',
        ghost: 'hover:bg-slate-100 hover:text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3',
        lg: 'h-12 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = ({
  className,
  variant,
  size,
  href,
  children,
  ...props
}) => {
  if (href) {
    return (
      <Link
        href={href}
        className={buttonVariants({ variant, size, className })}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
