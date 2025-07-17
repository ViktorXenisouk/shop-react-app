import { Body, PropsCnd } from "../types";
import { useAuthUserStore } from "../../../store/useAuth";
import { TextField,Button } from "@mui/material";

const PersonalInfo = (props: PropsCnd) => {
    const store = useAuthUserStore()

    const onClick = () => {
        props.setCompleted(props.index, true)
    }

    const textHandle = (event: any) => {
        props.setBody({ username: event.target.value })
        props.setCompleted(props.index, false)
    }

    const emailHandle = (event: any) => {
        props.setBody({ username: event.target.value })
        props.setCompleted(props.index, false)
    }

    const isCompleted = props.isCompleted

    if (store.token) {
        const user = store.user
        if (!props.body.username || !props.body.email) {
            props.setBody({ username: user.username, email: user.email })
        }
        return (
            <>
                <TextField disabled focused color="success" value={user.username} label='name' />
                <TextField disabled focused color="success" value={user.email} label='email' />
                <Button onClick={onClick}>Confirm info</Button>
            </>
        )
    }

        return (
            <>
                <TextField focused={isCompleted ? true : undefined} color={isCompleted ? 'success' : 'info'} onChange={textHandle} value={props.body.username} label='username' />
                <TextField focused={isCompleted ? true : undefined} color={isCompleted ? 'success' : 'info'} onChange={emailHandle} value={props.body.email} label='email' />
                <TextField onChange={emailHandle} />
                <Button onClick={onClick}>
                    Continue
                </Button>
            </>
        )
}

    export default PersonalInfo