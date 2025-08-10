import { Portrait,Email,Password,Phone } from "@mui/icons-material";
import MyLabel from "./MyLabel";

export const UserNameLabel = (
    <MyLabel title="username" icon={<Portrait />} />
)

export const EmailLabel = (
    <MyLabel title="email" icon={<Email />} />
)

export const PasswordLabel = (
    <MyLabel title="password" icon={<Password />} />
)

export const PasswordAgainLabel = (
    <MyLabel title="password again" icon={<Password />} />
)

export const PhoneLabel = (
    <MyLabel title="phone" icon={<Phone />} />
) 