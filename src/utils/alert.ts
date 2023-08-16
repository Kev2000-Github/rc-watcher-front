/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Swal from 'sweetalert2'

type LoadingNotifier = (title?: string) => void
export const notifyLoading: LoadingNotifier = (title = 'Cargando...') => {
  void Swal.fire({
    title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })
}

type ErrorNotifier = (title?: string, text?: string) => void
export const notifyError: ErrorNotifier = (
  title = 'Ha ocurrido un error',
  text
) => {
  void Swal.fire({
    icon: 'error',
    title,
    text: text ?? ''
  })
}

export const closeNotification = () => {
  Swal.close()
}