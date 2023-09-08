import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { notifyLoading } from "../../../utils/alert"
import { useEffect } from "react"
import { Layout } from "../../../components/Layout"
import { routes } from "../../../app/constants"
import { SolutionForm } from "../../../components/Form/Solution"
import { SolutionSchema, solutionSchema } from "../../../components/Form/Solution/schema"
import solutionService from "../../../services/Solution"
import { createSolutionProps } from "../../../services/Solution/interface"
import { mutationKey, queryKey } from "../../../services/constants"
import { paginationProps } from "../../../services/interface"
import userService from "../../../services/User"
import { useUserStore } from "../../../store"
import alertService from "../../../services/Alert"

export function CreateSolution() {
  const {user} = useUserStore()
  const navigate = useNavigate()
  const createMutation = useMutation([mutationKey.SOLUTION], solutionService.createSolution, {
    onSuccess: () => {
      navigate(routes.SOLUTIONS)
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
  const onSubmit = (data: SolutionSchema) => {
    const req: createSolutionProps = {
      ...data,
      steps: data.steps.map(step => step.value),
      responsableIds: data.responsableIds.map(user => user.id)
    }
    createMutation.mutate(req)
  }

  useEffect(() => {
    if(createMutation.isLoading) notifyLoading()
  }, [createMutation.isLoading])

  return (
    <Layout>
      <SolutionForm
          availableUsers={users?.data ?? []}
          alerts={alerts?.data ?? []}
          onSubmitItem={onSubmit}
          schema={solutionSchema}
      />
    </Layout>
  )
}