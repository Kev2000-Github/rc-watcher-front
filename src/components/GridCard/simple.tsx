import { Box, Button, Typography } from "@mui/material"
import { Coloredtag } from "../ColoredTag"
import style from './style.module.scss'
import { Card } from "../Card"
import { CommonGridCardProps } from "./interface"

type Props = CommonGridCardProps & {
    tagColor?: string,
    tagText: string,
}

export function GridCard({
    showState = false,
    state = 'completed',
    stateColor = 'primary',
    title,
    tagColor = 'black',
    tagText,
    description,
    smallText,
    onClick,
    className,
    disabled = false,
    btnColor = 'primary',
    btnText = 'Ver',
    ...rest
}: Props) {

    const genStateColor = () => {
        switch(stateColor){
            case 'gray':
                return style.gray
            default:
                return style.primary
        }
    }

    return (
        <Card {...rest} className={`${style.card} ${className ?? ''}`}>
            {
                showState && 
                <Typography className={`${style.state} ${genStateColor()}`}>
                    {state}
                </Typography>
            }
            <Box className={style.cardHeader}>
                <Typography sx={{ fontSize: 16, fontWeight: 600}} variant='body2'>
                    {title}
                </Typography>
                <Coloredtag
                    color={tagColor}
                    text={tagText}
                />
                </Box>
                <Typography sx={{ paddingBottom: 2 }} variant='body2'>
                {description}
                </Typography>
                <Typography className={style.questions} variant='body2'>
                    {smallText}
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'end', height: 1}}>
                <Button 
                    variant='contained'
                    color={btnColor}
                    className={style.button}
                    sx={{width: 'auto'}}
                    onClick={onClick}
                    disabled={disabled}
                >
                    {btnText}
                </Button>
            </Box>
        </Card>
    )
}