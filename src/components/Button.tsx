import { ButtonProps } from '../types/types';

function Button({
  children,
  className,
  variant,
  size,
  onlyIcon,
  onClick,
}: ButtonProps) {
  return (
    <>
      <button
        className={`w-auto ${onlyIcon ? 'px-2' : 'px-4'} py-1 gap-2 ${
          variant === 'primary'
            ? 'bg-blue-200  border-blue-50  '
            : 'bg-transparent border-blue-200 dark:border-gray-700 dark:hover:shadow-blue-500 '
        } border-2   rounded-full text-blue-500 font-medium flex items-center ${
          size === 'big' ? 'text-lg' : 'text-base'
        } justify-center cursor-pointer hover:scale-[1.01] hover:shadow-md hover:shadow-blue-300/80  transition-all duration-300 font-montserrat ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
