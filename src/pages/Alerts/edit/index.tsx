import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { closeNotification, notifyLoading } from "../../../utils/alert"
import { useEffect } from "react"
import { Layout } from "../../../components/Layout"
import alertService from "../../../services/Alert"
import { Box } from "@mui/material"
import { Card } from "../../../components/Card"
import { AlertSchema, alertSchema } from "../../../components/Form/Alert/schema"
import { AlertForm } from "../../../components/Form/Alert"
import { routes } from "../../../app/constants"
import { mutationKey, queryKey } from "../../../services/constants"
import regulationService from "../../../services/Regulation"
import style from './style.module.scss'
import { Alert } from "../../../services/interface"

export function EditAlert() {
  const {id} = useParams()
  const navigate = useNavigate()
  const { data: alert, isLoading: alertIsLoading } = useQuery({
    queryKey: [queryKey.ALERT],
    queryFn: () => alertService.getAlert(id ?? '')
  })
  const { data: regulations, isLoading: regulationIsLoading } = useQuery({
    queryKey: [queryKey.REGULATIONS],
    queryFn: regulationService.getRegulations,
  })
  const editMutation = useMutation([mutationKey.EDIT_ALERT], (props: AlertSchema) => {
    return alertService.editAlert(id ?? '', props)
  }, {
    onSuccess: () => {
      navigate(routes.ALERTS)
    }
  })

  const onSubmit = (data: AlertSchema) => editMutation.mutate(data)

  const genDefaultValues = (alert: Alert) => {
    return {
      title: alert.title,
      description: alert.description,
      regulationId: alert.Regulation.id,
      priority: alert.priority
    }
  }

  useEffect(() => {
    if(alertIsLoading && regulationIsLoading) notifyLoading()
    else if(!(alertIsLoading && regulationIsLoading)) closeNotification()
    return () => closeNotification()
  }, [alertIsLoading, regulationIsLoading])

  useEffect(() => {
    if(editMutation.isLoading) notifyLoading()
  }, [editMutation.isLoading])

  return (
    <Layout>
      {
        alert && regulations && 
        <Box className={style.content}>
          <Card className={style.card}>
            <AlertForm
                regulations={regulations ?? []}
                onSubmitItem={onSubmit}
                schema={alertSchema}
                defaultValues={genDefaultValues(alert)}
            />
          </Card>
        </Box>
      }
    </Layout>
  )
}