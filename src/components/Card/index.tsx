import style from './style.module.scss'
import {Card as MaterialCard} from '@mui/material'

type Props = {
  children?: React.ReactNode,
  className?: string,
  borderRadius?: number
};

export function Card({children, className='', ...propStyle}: Props): React.ReactNode {
  return (
    <MaterialCard className={`${style.card} ${className}`} sx={{...propStyle}}>
        {children}
    </MaterialCard>
  )
}