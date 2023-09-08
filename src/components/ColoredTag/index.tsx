import { Typography } from "@mui/material"
import style from './style.module.scss'

interface Props {
    className?: string,
    text: string,
    color?: string,
    size?: 'medium' | 'small'
}

export function Coloredtag({
    className,
    text,
    color = 'black',
    size = 'medium'
}: Props) {

    const genColor = (color: string) => {
        switch(color){
            case 'high':
                return style.danger
            case 'medium':
                return style.mid
            case 'low': 
                return style.low
            default:
                return style.black
        }
    }

    return (
        <Typography 
            className={`
                ${style.tag} ${genColor(color)} 
                ${className ?? ''}
                ${size === 'small' ? style.small : ''}`} 
            variant='body2'>
          {text}
        </Typography>
    )
}