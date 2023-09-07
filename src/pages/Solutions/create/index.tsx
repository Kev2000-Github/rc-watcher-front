import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { notifyLoading } from "../../../utils/alert"
import { useEffect } from "react"
import { Layout } from "../../../components/Layout"
import { Box } from "@mui/material"
import { Card } from "../../../components/Card"
import { routes } from "../../../app/constants"
import style from './style.module.scss'
import { SolutionForm } from "../../../components/Form/Solution"
import { SolutionSchema, solutionSchema } from "../../../components/Form/Solution/schema"
import solutionService from "../../../services/Solution"
import { createSolutionProps } from "../../../services/Solution/interface"
import { mutationKey } from "../../../services/constants"

export function CreateSolution() {
  const navigate = useNavigate()
  const createMutation = useMutation([mutationKey.SOLUTION], solutionService.createSolution, {
    onSuccess: () => {
      navigate(routes.SOLUTIONS)
    }
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
          onSubmitItem={onSubmit}
          schema={solutionSchema}
      />
    </Layout>
  )
}