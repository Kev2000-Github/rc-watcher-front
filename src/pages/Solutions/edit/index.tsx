import { useNavigate, useParams } from 'react-router-dom'
import { routes } from '../../../app/constants'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { mutationKey, queryKey } from '../../../services/constants'
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
import { SolutionSchema, solutionSchema } from '../../../components/Form/Solution/schema'
import { editSolutionProps } from '../../../services/Solution/interface'

export function EditSolution() {
    const {user} = useUserStore()
    const navigate = useNavigate()
    const {id} = useParams()
    const queryClient = useQueryClient()
    const { data: solution, isLoading } = useQuery({
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
    const editSolution = useMutation([mutationKey.EDIT_SOLUTION], (data: editSolutionProps) => {
      return solutionService.editSolution(id ?? '', data)
    }, 
    {
      onSuccess: async () => {
        closeNotification()
        await queryClient.invalidateQueries({queryKey: [queryKey.SOLUTIONS, queryKey.SOLUTION]})
        navigate(routes.SOLUTIONS)
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
      if(editSolution.isLoading) notifyLoading()
      return () => closeNotification()
    }, [editSolution.isLoading])

    const genDefaultvalues = (solution: Solution) => {
        return {
          title: solution.title,
          description: solution.description,
          responsableIds: solution.Responsables.map(resp => ({ id: resp.id, username: resp.username })),
          alertIds: solution.Alerts.map(al => al.id),
          steps: solution.Steps.map(step => ({ value: step.description }))
        }
    }

    const onSubmit = (data: SolutionSchema) => {
      const req: editSolutionProps = {
        ...data,
        steps: data.steps.map(step => step.value),
        responsableIds: data.responsableIds.map(user => user.id)
      }
      editSolution.mutate(req)
    }

    return (
    <Layout>
      {
        solution &&
        <Box className={style.content}>
          <Box className={style.header}>
            <Button 
                sx={{pl: 4, pr: 4}}
                variant='outlined'
                color='primary'
                onClick={() => navigate(routes.EDIT_SOLUTION.replace(':id', solution.id))}
            >
                Editar
            </Button>
          </Box>
          <SolutionForm
            onSubmitItem={onSubmit}
            schema={solutionSchema}
            availableUsers={users?.data ?? []}
            alerts={alerts?.data ?? []}
            defaultValues={genDefaultvalues(solution)}
          />
        </Box>
      }
    </Layout>
    )
}