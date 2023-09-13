 
 
import Swal from 'sweetalert2'
import { SECOND } from './constants'

interface Options {
  title?: string
  onClose?: ()=>void,
}
const defaultOpts: Options = {
  title: '',
  onClose: () => null,
}

export const notifyLoading = (options?: Options) => {
  const defaultLoadingOpts = {...defaultOpts, title: 'Cargando...'}
  const { onClose, title } = {...defaultLoadingOpts, ...options}
  void Swal.fire({
    customClass: {
      container: 'alerts'
    },
    title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    },
    didClose: onClose
  })
}

type ErrorNotifier = (title?: string, text?: string|string[]) => void
export const notifyError: ErrorNotifier = (
  title = 'Ha ocurrido un error',
  text
) => {
  let message = text as string
  if(typeof text === 'object'){
    message = text.map(msg => `<li style="text-align: left;">${msg}</li>`).join('\n ')
    message = `<ul>${message}</ul>`
  }
  void Swal.fire({
    customClass: {
      container: 'alerts'
    },
    icon: 'error',
    title,
    html: message
  })
}

type WarnNotifier = (title?: string, text?: string|string[]) => void
export const notifyWarn: WarnNotifier = (
  title = 'Ha ocurrido un error',
  text
) => {
  let message = text as string
  if(typeof text === 'object'){
    message = text.map(msg => `<li style="text-align: left;">${msg}</li>`).join('\n ')
    message = `<ul>${message}</ul>`
  }
  void Swal.fire({
    customClass: {
      container: 'alerts'
    },
    icon: 'warning',
    title,
    html: message
  })
}

export const notifySuccess = (options?: Options) => {
  const { onClose, title } = {...defaultOpts, ...options}
  void Swal.fire({
    customClass: {
      container: 'alerts'
    },
    icon: 'success',
    title: title,
    showConfirmButton: false,
    timer: 1 * SECOND,
    didClose: onClose
  })
}

export const closeNotification = () => {
  Swal.close()
}