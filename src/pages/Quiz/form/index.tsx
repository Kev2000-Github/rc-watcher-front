import { Layout } from '../../../components/Layout'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import quizService from '../../../services/Quiz'
import { closeNotification, notifyError, notifyLoading, notifySuccess } from '../../../utils/alert'
import { useNavigate, useParams } from 'react-router'
import { QuizForm } from '../../../components/Form/QuizForm'
import { DynamicSchema, QuizFormSchema, quizFormSchemaBuilder } from '../../../components/Form/QuizForm/schema'
import { generateDefaultValues } from '../../../components/Form/QuizForm/helper'
import { routes } from '../../../app/constants'
import { queryKey } from '../../../services/constants'
import { ServiceError } from '../../../errors/ServiceError'

export function QuizFormPage() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [enabledFetch, setEnabledFetch] = useState<boolean>(true)
  const [schema, setSchema] = useState<DynamicSchema|null>(null)
  const specificQueryKey = `${queryKey.QUIZ}-${id ?? ''}`
  const { data: quiz, isFetching } = useQuery({
    queryKey: [queryKey.QUIZ, specificQueryKey],
    queryFn: () => quizService.getQuizForm(id!),
    enabled: enabledFetch
  })
  const answerFormMutation = useMutation(['login'], quizService.answerQuizForm, {
    onSuccess: () => {
      closeNotification()
      notifySuccess({ title: '¡Has completado la encuesta!' })
      navigate(routes.DASHBOARD)
    }
  })

  useEffect(() => {
    if(answerFormMutation.error){
      const err = answerFormMutation.error as ServiceError
      notifyError(err.title, err.message)
    }
  }, [answerFormMutation.error])

  useEffect(() => {
    if(isFetching) notifyLoading()
    else{
      setEnabledFetch(false)
      closeNotification()
    }
  },[isFetching])

  useEffect(() => {
    if(answerFormMutation.isLoading) notifyLoading()
  }, [answerFormMutation.isLoading])

  useEffect(() => {
    if(quiz){
      setSchema(quizFormSchemaBuilder(quiz))
    }
  }, [quiz])

  const onSubmit = (data: QuizFormSchema) => answerFormMutation.mutate({id, form: data})
 
  return (
    <Layout>
      {
        !isFetching && quiz && schema &&
        <QuizForm
          formData={quiz}
          onSubmitItem={onSubmit}
          schema={schema}
          defaultValues={generateDefaultValues(quiz)}
        />
      }
    </Layout>
  )
}