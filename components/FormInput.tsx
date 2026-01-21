import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  label: string;
  error?: string;
  as?: 'input' | 'textarea' | 'select';
  options?: string[];
}

export const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  error, 
  as = 'input', 
  options,
  className = '', 
  ...props 
}) => {
  // Dark mode styles: Darker background (neutral-950), light text, subtle border
  const baseInputStyles = `w-full px-4 py-3 rounded-lg border ${error ? 'border-red-500 focus:ring-red-900' : 'border-neutral-800 focus:ring-green-900 focus:border-green-600'} bg-neutral-950 focus:bg-neutral-900 focus:outline-none focus:ring-2 transition-all duration-200 text-white placeholder-neutral-500`;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-neutral-300 mb-1.5 ml-1">
        {label}
      </label>
      
      {as === 'textarea' ? (
        <textarea 
          className={`${baseInputStyles} min-h-[120px] resize-none ${className}`}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : as === 'select' ? (
        <div className="relative">
            <select
             className={`${baseInputStyles} appearance-none cursor-pointer ${className}`}
             {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
            >
                {options?.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
      ) : (
        <input 
          className={`${baseInputStyles} ${className}`}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      
      {error && (
        <p className="mt-1 text-xs text-red-400 ml-1 font-medium flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {error}
        </p>
      )}
    </div>
  );
};