import { Box, Button, Typography } from "@mui/material"
import { Coloredtag } from "../ColoredTag"
import style from './style.module.scss'
import { Card } from "../Card"
import { CommonGridCardProps } from "./interface"

type Props = CommonGridCardProps & {
    tagData: {
        subtitle: string,
        tagColor: string,
        tagText: string
    }[]
}

export function GridCardSplit({
    showState = false,
    state = 'completed',
    stateColor = 'primary',
    title,
    tagData,
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
        <Card {...rest} className={`${style.card} ${style.split} ${className ?? ''}`}>
            {
                showState && 
                <Typography className={`${style.state} ${genStateColor()}`}>
                    {state}
                </Typography>
            }
            <Box className={style.left}>
              <Box className={style.cardHeader}>
                <Typography sx={{ fontSize: 16, fontWeight: 600}} variant='body2'>
                  {title}
                </Typography>
              </Box>
              <Typography className={style.description} sx={{ paddingBottom: 2 }} variant='body2'>
                {description}
              </Typography>
              <Typography className={style.questions} variant='body2'>
                {smallText}
              </Typography>
            </Box>
            <Box className={style.right}>
              {
                tagData.map((tag, idx) => (
                  <Box key={idx} className={style.alerts}>
                    <Typography sx={{ fontSize: 14, fontWeight: 600}} variant='body2'>
                        {tag.subtitle}
                    </Typography>
                    <Coloredtag
                      color={tag.tagColor}
                      text={tag.tagText}
                    />
                  </Box>
                ))
              }
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
            </Box>
        </Card>
    )
}