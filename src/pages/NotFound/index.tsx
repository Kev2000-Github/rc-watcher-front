import style from './style.module.scss'

const starCounter = new Array(100).fill(0);

export function NotFound() {
  console.log(style)

  return (
    <div className={style.wrapper}>
        <div className={style.textGroup}>
            <p className={style.text404}>404</p>
            <p className={style.textLost}>La pagina que estas buscando <br />se perdio en el espacio.</p>
        </div>
        <div className={style.windowGroup}>
            <div className={style.window404}>
                <div className={style.stars}>
                    {
                        starCounter.map((_, idx) => {
                            return (<div className={style.star} key={idx}></div>)
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}