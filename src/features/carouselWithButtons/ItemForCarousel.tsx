import { Box} from "@mui/material"

const ItemForCarousel = ({children,minWidth,height}: {children: React.ReactNode,minWidth:string|number,height:string|number}) => {

  return (
    <Box
      sx={{
        minWidth: minWidth,
        height: height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0, // Чтобы элементы не сжимались
      }}
    >
      {children}
    </Box>
  )
}

export default ItemForCarousel