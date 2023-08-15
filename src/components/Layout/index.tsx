import { Menu } from "../Menu";
import style from './style.module.scss'

type Props = {
  children?: React.ReactNode,
};

export function Layout({children}: Props) {
    return (
        <div className={style.outline}>
            <Menu/>
            <div className={style.content}>
                {children}
            </div>
        </div>
    )
}