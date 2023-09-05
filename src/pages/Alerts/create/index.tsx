import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { notifyLoading } from "../../../utils/alert"
import { useEffect } from "react"
import { Layout } from "../../../components/Layout"
import alertService from "../../../services/Alert"
import { Box } from "@mui/material"
import { Card } from "../../../components/Card"
import { AlertSchema, alertSchema } from "../../../components/Form/Alert/schema"
import { AlertForm } from "../../../components/Form/Alert"
import { routes } from "../../../app/constants"
import { queryKey } from "../../../services/constants"
import regulationService from "../../../services/Regulation"
import style from './style.module.scss'

export function CreateAlert() {
  const navigate = useNavigate()
  const createMutation = useMutation(['createAlert'], alertService.createAlert, {
    onSuccess: () => {
      navigate(routes.ALERTS)
    }
  })
  const { data: regulations } = useQuery({
    queryKey: [queryKey.REGULATIONS],
    queryFn: regulationService.getRegulations,
  })
  const onSubmit = (data: AlertSchema) => createMutation.mutate(data)

  useEffect(() => {
    if(createMutation.isLoading) notifyLoading()
  }, [createMutation.isLoading])

  return (
    <Layout>
      <Box className={style.content}>
        <Card className={style.card}>
          <AlertForm
              regulations={regulations ?? []}
              onSubmitItem={onSubmit}
              schema={alertSchema}
          />
        </Card>
      </Box>
    </Layout>
  )
}