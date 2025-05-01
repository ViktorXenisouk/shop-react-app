type ErrorPageProps = {
    status:number;
    message:string;
}

const ErrorPage = ({status,message}:ErrorPageProps) => {

    return (
        <div>
            <p>{status}</p>
            <p>{message}</p>
        </div>
    )
}

export default ErrorPage