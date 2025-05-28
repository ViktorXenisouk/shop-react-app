

const MessageShower = ({ message, status, color = 'green' }: { message?: string, status?: number, color?: string }) => {
    return (
        <div>
            {message ? <p>{message}</p>:''}
            {status ? <p>{status}</p>:''}
        </div>
    )
}

export default MessageShower