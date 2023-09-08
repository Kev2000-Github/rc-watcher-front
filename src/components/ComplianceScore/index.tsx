import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'
import {Box, Typography} from '@mui/material'
import style from './style.module.scss'

type Props = CircularProgressProps & { value: number }

const THICKNESS = 5
const SIZE = 200

export function ComplianceScore(
  props: Props,
) {
  return (
    <Box className={style.circular}>
      <CircularProgress 
        className={style.circleBG}
        variant="determinate"
        color='secondary'
        thickness={THICKNESS}
        size={SIZE}
        value={100} />
      <CircularProgress 
        variant="determinate"
        size={SIZE}
        thickness={THICKNESS}
        {...props} />
      <Box className={style.label}>
        <Typography
          variant="h5"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}