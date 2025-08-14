import React from "react"
import { Card, CardMedia, CardContent, Typography, ButtonGroup, Button } from "@mui/material"
import { Link as LinkRouter } from "react-router-dom"
import { Delete, Edit } from "@mui/icons-material"

type Props = {
  id: string;
  name: string;
  discription: string;
  imgUrl: string;
  handleDelete: (id: string) => void
}

const AdminProductsCard : React.FC<Props> = ({ id, name, discription, imgUrl, handleDelete }) => {

  const handleClick = async () => {
    handleDelete(id)
  }

  return (
    <Card sx={{ display: 'flex' ,justifyContent:'space-between',width:'100%'}}>
      <CardMedia
        component="img"
        alt="green iguana"
        image={imgUrl}
        sx={{width:"200px!important",height:"140px"}}
      />
      <CardContent sx={{display:'flex'}}>
        <Typography sx={{borderRight:'black solid 1px',width:'200px'}}>{name}</Typography>
        <Typography sx={{ml:'10px'}}>{discription}</Typography>
      </CardContent>
      <ButtonGroup>
        <Button
          component={LinkRouter} to={`/admin/products/edit/${id}`}
          startIcon={<Edit />}>
          Edit
        </Button>
        <Button onClick={handleClick}
          startIcon={<Delete />}
        >Delete</Button>
      </ButtonGroup>
    </Card>
  )
}

export default AdminProductsCard