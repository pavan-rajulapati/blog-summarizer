
interface ButtonProps {
    children : React.ReactNode;
    onClick?: () => void;
    className?: string
}

const Button = ({children, onClick, className} : ButtonProps) => {
  return (
    <button onClick={onClick} className={`px-3 py-2 border rounded-3xl bg-blue-500 hover:bg-blue-400 text-white cursor-pointer ${className}`}>
        {children}
    </button>
  )
}

export default Button