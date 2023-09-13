import { useNavigate, useParams } from 'react-router-dom'
import { routes } from '../../../app/constants'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SOLUTION_STATE, mutationKey, queryKey } from '../../../services/constants'
import solutionService from '../../../services/Solution'
import { Layout } from '../../../components/Layout'
import { useEffect } from 'react'
import { closeNotification, notifyError, notifyLoading } from '../../../utils/alert'
import { ServiceError } from '../../../errors/ServiceError'
import { SolutionForm } from '../../../components/Form/Solution'
import { Solution, paginationProps } from '../../../services/interface'
import { useUserStore } from '../../../store'
import userService from '../../../services/User'
import alertService from '../../../services/Alert'
import { Box, Button } from '@mui/material'
import style from './style.module.scss'

export function SolutionViewPage() {
    const {user, isAdmin} = useUserStore()
    const navigate = useNavigate()
    const {id} = useParams()
    const queryClient = useQueryClient()
    const { data: solution, isLoading, refetch } = useQuery({
      queryKey: [queryKey.SOLUTION],
      queryFn: () => solutionService.getSolution(id ?? ''),
      onSuccess: () => {
        closeNotification()
      }
    })
    const { data: users } = useQuery({
      queryKey: [queryKey.USERS],
      queryFn: () => {
        const options: paginationProps = {
          limit: 999,
          page: 1
        }
        return userService.getUsers(user?.Company.id ?? '', options)
      },
    })
    const { data: alerts } = useQuery({
      queryKey: [queryKey.ALERTS],
      queryFn: () => {
        const options: paginationProps = {
          limit: 999,
          page: 1
        }
        const filters = {}
        return alertService.getAlerts(options, filters)
      },
    })
    const deleteSolution = useMutation([mutationKey.DELETE_SOLUTION], solutionService.deleteSolution, {
      onSuccess: async () => {
        closeNotification()
        await queryClient.invalidateQueries({queryKey: [queryKey.SOLUTIONS, queryKey.SOLUTION]})
        navigate(routes.SOLUTIONS)
      },
      onError: (error: ServiceError) => {
        notifyError(error.title, error.message)
      }
    })
    const toggleSolution = useMutation([mutationKey.DELETE_SOLUTION], () => {
      let newState = SOLUTION_STATE.ACTIVE
      if(solution?.state === SOLUTION_STATE.ACTIVE) newState = SOLUTION_STATE.INACTIVE
      return solutionService.updateSolutionState(id ?? '', newState)
    }, {
      onSuccess: async () => {
        closeNotification()
        await queryClient.invalidateQueries({queryKey: [queryKey.SOLUTIONS, queryKey.SOLUTION]})
        await refetch()
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
      if(deleteSolution.isLoading || toggleSolution.isLoading) notifyLoading()
      return () => closeNotification()
    }, [deleteSolution.isLoading, toggleSolution.isLoading])

    const genDefaultvalues = (solution: Solution) => {
        return {
          title: solution.title,
          description: solution.description,
          responsableIds: solution.Responsables.map(resp => ({ id: resp.id, username: resp.username })),
          alertIds: solution.Alerts.map(al => al.id),
          steps: solution.Steps.map(step => ({ value: step.description }))
        }
    }

    const onDelete = () => {
      deleteSolution.mutate(id ?? '')
    }

    const onSubmit = () => {
      toggleSolution.mutate()
    }

    return (
    <Layout>
      {
        solution &&
        <Box className={style.content}>
          <Box className={style.header}>
            {
              isAdmin() &&
              <Button 
                sx={{pl: 4, pr: 4}}
                variant='outlined'
                color='primary'
                onClick={() => navigate(routes.EDIT_SOLUTION.replace(':id', solution.id))}
              >
                  Editar
              </Button>
            }
          </Box>
          <SolutionForm
            availableUsers={users?.data ?? []}
            alerts={alerts?.data ?? []}
            isEditable={false}
            defaultValues={genDefaultvalues(solution)}
            submitBtnText={solution.state === SOLUTION_STATE.ACTIVE ? 'desactivar' : 'activar'}
            submitBtnColor={solution.state === SOLUTION_STATE.ACTIVE ? 'info' : 'primary'}
            dangerBtnText='Eliminar'
            dangerBtnOnClick={onDelete}
            submitBtnOnClick={onSubmit}
            disableBtns={!isAdmin()}
          />
        </Box>
      }
    </Layout>
    )
}