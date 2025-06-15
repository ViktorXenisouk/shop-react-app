import { Card, CardMedia, CardContent, Typography, ButtonGroup, Button, Snackbar } from "@mui/material"
import { useState } from "react";
import { Link as LinkRouter } from "react-router-dom"
import { safeFetch } from "../../../../services/safeFetch";
import Cookie from "../../../../utils/cookie"

type Props = {
  id: string;
  name: string;
  discription: string;
  imgUrl: string;
  handleDelete:(id:string)=>void
}

const AdminProductsCard = ({id, name, discription, imgUrl,handleDelete }: Props) => {

  const handleClick = async () => {
    handleDelete(id)
  }

  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={imgUrl}
      />
      <CardContent>
        <Typography>{name}</Typography>
        <Typography>{discription}</Typography>
      </CardContent>
      <ButtonGroup>
        <Button
          component={LinkRouter} to={`/admin/products/edit/${id}`}>
          Edit
        </Button>
        <Button onClick={handleClick}>Delete</Button>
      </ButtonGroup>
    </Card>
  )
}

export default AdminProductsCard