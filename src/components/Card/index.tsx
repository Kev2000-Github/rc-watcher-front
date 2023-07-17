import style from './style.module.scss'
import {Card as MaterialCard} from '@mui/material'

type Props = {
  children?: React.ReactNode
};

export function Card({children}: Props): React.ReactNode {
  return (
    <MaterialCard className={style.card}>
        {children}
    </MaterialCard>
  )
}