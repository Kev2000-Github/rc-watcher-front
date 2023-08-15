import { Menu } from "../Menu";
import { Box, Typography } from '@mui/material'
import style from './style.module.scss'
import UserIcon from '@mui/icons-material/PersonRounded';

type Props = {
  children?: React.ReactNode,
};

export function Layout({children}: Props) {
    return (
        <div className={style.outline}>
            <Menu/>
            <div className={style.content}>
                <Box className={style.topInfo}>
                    <UserIcon className={style.icon}/>
                    <Box className={style.userInfo}>
                        <Typography className={style.name}>
                            Francisco Castillo
                        </Typography>
                        <Typography className={style.type}>
                            Admin
                        </Typography>
                    </Box>
                </Box>
                {children}
            </div>
        </div>
    )
}