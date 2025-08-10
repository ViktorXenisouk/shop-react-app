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

    return (
        <Button
            startIcon
            onClick={onClick}
            sx={{
                position: 'absolute',
                top: '0px',
                bottom: '0px',
                left: left,
                right: right,
                zIndex: 1,
                border: '#ccc solid 1px',
                color: disabled ? 'grey.400' : 'primary.main',
                bgcolor: 'transparent',
                borderWidth: '1px',
                borderStyle:'double',

                ':hover': {
                    borderColor: 'grey.500',
                    backgroundColor: 'grey.200'
                },
            }}
        >
            {icon}
        </Button>
    )
}

export default CarouselButton