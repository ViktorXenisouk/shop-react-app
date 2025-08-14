import React, { Fragment } from "react"
import { PropsCnd } from "../types";
import { useAuthUserStore } from "../../../store/useAuth";
import { TextField, Button } from "@mui/material";
import PhoneInput from "../../../UI/PhoneInput";
import { EmailLabel, UserNameLabel } from "../../../components/labels";

const PersonalInfo: React.FC<PropsCnd> = (props) => {
    const store = useAuthUserStore()

    const onClick = () => {
        props.setCompleted(props.index, true)
    }

    const textHandle: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        props.setBody({ username: event.target.value })
        props.setCompleted(props.index, false)
    }

    const emailHandle: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        props.setBody({ username: event.target.value })
        props.setCompleted(props.index, false)
    }

    const phoneHandler = (tel: string) => {
        props.setBody({ tel: tel })
        props.setCompleted(props.index, false)
    }

    const isCompleted = props.isCompleted

    if (store.token) {
        const user = store.user
        if (!props.body.username || !props.body.email) {
            props.setBody({ username: user.username, email: user.email })
        }
        return (
            <Fragment>
                <TextField disabled focused color="success" value={user.username} label='name' />
                <TextField disabled focused color="success" value={user.email} label='email' />
                <Button onClick={onClick}>Confirm info</Button>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <TextField
                onChange={textHandle}
                value={props.body.username}
                label={UserNameLabel}
                focused={isCompleted ? true : undefined}
                color={isCompleted ? 'success' : 'info'}
            />
            <TextField
                onChange={emailHandle}
                value={props.body.email}
                label={EmailLabel}
                focused={isCompleted ? true : undefined}
                color={isCompleted ? 'success' : 'info'}
            />
            <PhoneInput
                value={props.body.tel}
                onChange={phoneHandler}
            />
            <Button onClick={onClick}>
                Continue
            </Button>
        </Fragment>
    )
}

export default PersonalInfo