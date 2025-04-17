import { InputProps } from '../types/types';

function Input({
  value,
  onChange,
  onFocus,
  placeholder = '',
  type = 'text',
  className = '',
}: InputProps) {
  return (
    <input
      required
      type={type}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      placeholder={placeholder}
      className={`border-b-2 border-blue-200 dark:border-gray-700 rounded-md text-base px-2 py-1 bg-blue-100 dark:bg-gray-900 text-gray-800 dark:text-blue-50 focus:bg-blue-50 dark:focus:bg-gray-700 focus:outline-blue-300 placeholder:text-blue-400 ${className}`}
    />
  );
}

export default Input;
