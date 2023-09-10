import { Layout } from '../../../components/Layout'
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import quizService from '../../../services/Quiz'
import { closeNotification, notifyError, notifyLoading } from '../../../utils/alert'
import { useNavigate, useParams } from 'react-router'
import { QuizForm } from '../../../components/Form/QuizForm'
import { QuizForm as QuizFormType } from '../../../services/interface'
import { DynamicSchema, QuizFormSchema, quizFormSchemaBuilder } from '../../../components/Form/QuizForm/schema'
import { routes } from '../../../app/constants'
import { mutationKey, queryKey, url } from '../../../services/constants'
import { ServiceError } from '../../../errors/ServiceError'
import axios from 'axios'
import { isPromise } from '../../../utils/common'

export function UpdateQuizFormPage() {
  const {id} = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [enabledFetch, setEnabledFetch] = useState<boolean>(true)
  const [schema, setSchema] = useState<DynamicSchema|null>(null)
  const specificQueryKey = `${queryKey.QUIZ}-${id ?? ''}`
  const { data: quiz, isFetching } = useQuery({
    queryKey: [queryKey.QUIZ, specificQueryKey],
    queryFn: () => quizService.getQuizForm(id!),
    enabled: enabledFetch
  })
  const answerFormMutation = useMutation([mutationKey.UPDATE_QUIZ], quizService.updateQuizForm, {
    onSuccess: async () => {
      closeNotification()
      await queryClient.invalidateQueries({queryKey: [queryKey.QUIZZES, queryKey.QUIZ]})
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

  const onSubmit = async (data: QuizFormSchema) => {
    for(const key of Object.keys(data)){
      if(data[key].document && isPromise(data[key].document?.content)){
        data[key].document!.content = await data[key].document!.content
      }
    }
    answerFormMutation.mutate({id, form: data})
  }

  const generateDefaultValues = (quiz: QuizFormType) => {
    const data: QuizFormSchema = {}
    for(const question of quiz.Questions){
        const selectedOpt = question.Selections.filter(selection => {
          return selection.selected
        })
        if(question.isMultiple){
            data[question.id] = {selectionId: selectedOpt.map(selected => selected.id)}
        }
        else{
            data[question.id] = {selectionId: selectedOpt[0].id}
            if(question.hasDoc && question.Document) {
              const id = question.Document.id
              const type = question.Document.type
              data[question.id].document = {
                name: question.Document.name,
                content: quizService.getQuizDocumentBase64(id, type)
              }
            }
        }
    }
    return data
  }

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