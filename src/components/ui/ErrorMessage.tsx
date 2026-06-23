interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="mt-3 mx-4">
            <p className="fs-4">
                Error: {message} <span>⛔️</span>
            </p>
        </div>
    );
};

export default ErrorMessage;
