import { Chip } from "@mui/material"
import { SuperTag as SuperTagType } from "./types"
import { FiberNew,Star,AttachMoney } from "@mui/icons-material"
import React from "react"

type Props = {
  superTag: SuperTagType
}

type Color = "success" | "default" | "primary" | "secondary" | "error" | "info" | "warning"

const SuperTag: React.FC<Props> = ({ superTag }) => {

  const param : {label?:string,color:Color,icon:any} = {
    'new': {
      label:'recently added',
      color: 'warning' as Color,
      icon: <FiberNew />
    },
    'the-best': {
      label: 'THE BEST',
      color: 'info' as Color,
      icon: <Star />
    },
    'super-price': {
      label: 'SUPER PRICE',
      color: 'success' as Color,
      icon: <AttachMoney />
    }
  }[superTag]

  return (
    <Chip
      label={param.label}
      icon={param.icon}
      color={param.color}
      size="small"
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1,
        fontWeight: 'bold',
        textTransform: 'uppercase',
      }}
    />
  )
}

export default SuperTag