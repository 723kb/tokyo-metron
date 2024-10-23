export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={`inline-flex items-center px-4 py-2 border rounded-md font-semibold text-xs uppercase tracking-widest shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 
            ${disabled && 'opacity-25'}
            ${className || 'bg-gray-200 border-gray-300 text-gray-700 hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400 focus:ring-gray-500'}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}