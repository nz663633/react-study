const Button = ({ children, text, color = "black" }) => { // props 구조 분해 할당
    return (
        <button style={{ color: color }}>
            {text} - {color.toUpperCase()}
            {children}
        </button>
    );
};


export default Button;