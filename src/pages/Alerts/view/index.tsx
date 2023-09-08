import {FormControl, Button, Typography, Box, TextField} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { routes } from '../../../app/constants'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { mutationKey, queryKey } from '../../../services/constants'
import alertService from '../../../services/Alert'
import style from './style.module.scss'
import { Layout } from '../../../components/Layout'
import { Card } from '../../../components/Card'
import { getAlertStateText, getPriorityText } from '../../../utils/common'
import { useEffect } from 'react'
import { closeNotification, notifyError, notifyLoading } from '../../../utils/alert'
import { ServiceError } from '../../../errors/ServiceError'

export function AlertViewPage() {
    const navigate = useNavigate()
    const {id} = useParams()
    const queryClient = useQueryClient()
    const { data: alert, isLoading } = useQuery({
      queryKey: [queryKey.ALERT],
      queryFn: () => alertService.getAlert(id ?? ''),
      onSuccess: () => {
        closeNotification()
      }
    })
    const deleteAlert = useMutation([mutationKey.DELETE_ALERT], alertService.deleteAlert, {
      onSuccess: async () => {
        closeNotification()
        await queryClient.invalidateQueries({queryKey: [queryKey.ALERTS, queryKey.ALERT]})
        navigate(routes.ALERTS)
      },
      onError: (error: ServiceError) => {
        notifyError(error.title, error.message)
      }
    })

    useEffect(() => {
      if(isLoading) notifyLoading()
      return () => closeNotification()
    }, [isLoading])

    useEffect(() => {
      if(deleteAlert.isLoading) notifyLoading()
      return () => closeNotification()
    }, [deleteAlert.isLoading])

    return (
    <Layout>
      {
        alert ? 
        <Box className={style.content}>
          <Box className={style.header}>
            <Button 
                sx={{pl: 4, pr: 4}}
                variant='outlined'
                color='primary'
                onClick={() => navigate(routes.EDIT_ALERT.replace(':id', alert.id))}
            >
                Editar
            </Button>
          </Box>
          <Box className={style.split}>
            <Box className={`${style.side} ${style.left}`}>
              <Box className={style.sideHeader}>
                <Typography variant='h6'>
                  Alerta
                </Typography>
                <Typography variant='body2'>
                  Fecha de Creacion: 20/06/2023
                </Typography>
              </Box>
              <Card className={style.card}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                  <FormControl sx={{ p: 1 }} variant="outlined">
                      <label htmlFor='description-title'>Titulo</label>
                      <TextField
                          value={alert.title}
                          id="description-title"
                          type='text'
                          size='small'
                          disabled={true}
                      />
                  </FormControl>

                  <FormControl sx={{ p: 1 }} variant="outlined">
                      <label htmlFor='description-alert'>Descripcion</label>
                      <TextField
                          value={alert.description}
                          multiline
                          rows={5}
                          id="description-alert"
                          type='text'
                          size='small'
                          disabled={true}
                      />
                  </FormControl>
                  
                  <Box className={style.horizontal}>
                    <FormControl sx={{ p: 1 }} variant="outlined">
                      <Typography variant='inherit'>Prioridad</Typography>
                      <TextField
                        value={getPriorityText(alert.priority)}
                        id="priority"
                        type='text'
                        size='small'
                        disabled={true}
                      />
                    </FormControl>

                    <FormControl sx={{ p: 1 }} variant="outlined">
                      <Typography variant='inherit'>Estado</Typography>
                      <TextField
                        value={getAlertStateText(alert.state)}
                        id="state"
                        type='text'
                        size='small'
                        disabled={true}
                      />
                    </FormControl>
                  </Box>
                  
                  <FormControl sx={{ p: 1, mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'end' }} variant="outlined">
                          <Button 
                              variant='outlined'
                              color='error'
                              onClick={() => deleteAlert.mutate(alert.id)}
                          >
                              Eliminar
                          </Button>
                          <Button 
                              sx={{ ml: 2 }}
                              variant='contained'
                              color='primary'
                              onClick={() => navigate(routes.CREATE_SOLUTION)}
                          >
                              Crear Solucion
                          </Button>
                  </FormControl>
                </Box>
              </Card>
            </Box>
            <Box className={`${style.side} ${style.right}`}>
              <Typography variant='h6'>
                Regulacion
              </Typography>
              <Card className={style.card}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                  <FormControl sx={{ p: 1 }} variant="outlined">
                      <label htmlFor='regulation-title'>Titulo</label>
                      <TextField
                          value={alert.Regulation.name}
                          id="regulation-title"
                          type='text'
                          size='small'
                          disabled={true}
                      />
                  </FormControl>
                </Box>
              </Card>
            </Box>
          </Box>
        </Box>
      : ''
      }
    </Layout>
    )
}