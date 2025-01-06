'use client';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseStyles = 'rounded-full font-montserrat transition-all duration-300 inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-hover text-white',
    secondary: 'bg-secondary hover:bg-secondary-hover text-white',
    accent: 'bg-accent hover:bg-accent-hover text-white',
    outline: 'border-2 border-primary hover:bg-primary hover:text-white text-primary',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
