/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Swal from 'sweetalert2'
import { SECOND } from './constants'

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

type ErrorNotifier = (title?: string, text?: string|string[]) => void
export const notifyError: ErrorNotifier = (
  title = 'Ha ocurrido un error',
  text
) => {
  let message = text as string
  if(typeof text === 'object'){
    message = text.map(msg => `<li>${msg}</li>`).join('\n ')
    message = `<ul>${message}</ul>`
  }
  void Swal.fire({
    icon: 'error',
    title,
    html: message
  })
}

export const notifySuccess = (title='') => {
  void Swal.fire({
    icon: 'success',
    title: title,
    showConfirmButton: false,
    timer: 1 * SECOND
  })
}

export const closeNotification = () => {
  Swal.close()
}