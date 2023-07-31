import style from './style.module.scss'
import {Card as MaterialCard} from '@mui/material'

type Props = {
  children?: React.ReactNode,
  borderRadius?: number
};

export function Card({children, ...propStyle}: Props): React.ReactNode {
  return (
    <MaterialCard className={style.card} sx={{...propStyle}}>
        {children}
    </MaterialCard>
  )
}