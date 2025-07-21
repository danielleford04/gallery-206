interface ButtonProps {
    children: React.ReactNode;
    ariaLabel: string;
    onClick: ()=>void;
}

const Button: React.FC<ButtonProps> = ({onClick, ariaLabel, children}) => {
    return (
        <button style={{padding: '10px 20px', margin: '15px' }} aria-label={ariaLabel} onClick={onClick}>{children}</button>
    );
};

export default Button;
