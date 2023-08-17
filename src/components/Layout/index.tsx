import { Menu } from "../Menu";
import { Box, Typography } from '@mui/material'
import style from './style.module.scss'
import UserIcon from '@mui/icons-material/PersonRounded';
import { useUserStore } from "../../store";

type Props = {
  children?: React.ReactNode,
};

export function Layout({children}: Props) {
    const user = useUserStore(state => state.user)
    return (
        <div className={style.layout}>
            <Menu/>
            <div className={style.content}>
                <Box className={style.topInfo}>
                    <UserIcon className={style.icon}/>
                    <Box className={style.userInfo}>
                        <Typography className={style.name}>
                            {user?.fullName ?? 'full name'}
                        </Typography>
                        <Typography className={style.type}>
                            {user?.Role?.name ?? 'role'}
                        </Typography>
                    </Box>
                </Box>
                {children}
            </div>
        </div>
    )
}