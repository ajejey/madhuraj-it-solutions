const Card = ({ 
  children, 
  className = '',
  hover = true,
}) => {
  const baseStyles = 'bg-white rounded-2xl p-6 shadow-sm';
  const hoverStyles = hover ? 'transition-all duration-300 hover:shadow-md hover:-translate-y-1' : '';
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
