import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

type Props = {
    onClick: () => void,
    disabled: boolean,
    left?: string,
    right?: string,
    icon: React.ReactNode,
}

const CarouselButton = ({ onClick, disabled, left, right, icon }: Props) => {

    const borderProps : any = [
        {
            borderLeftWidth: '1px',
            borderLeftStyle: 'solid',
            borderLeftColor: 'primary.main',
        },
         {
            borderRightWidth: '1px',
            borderRightStyle: 'solid',
            borderRightColor: 'primary.main',
        },
    ][right?0:1]

    return (
        <Button
            startIcon
            onClick={onClick}
            variant="contained"
            color="primary"
            sx={{
                position: 'absolute',
                borderRadius: 0,
                top: '0px',
                bottom: '0px',
                left: left,
                right: right,
                zIndex: 1,
                color: theme => disabled ? theme.palette.action.disabled : undefined,
                bgcolor: disabled ? 'action.disabled' : undefined,
                ...borderProps
            }}
        >
            {icon}
        </Button>
    )
}

export default CarouselButton