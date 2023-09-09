import style from './style.module.scss'
import { Card } from '../../components/Card'
import { useQuery } from '@tanstack/react-query'
import { closeNotification, notifyError, notifyLoading } from '../../utils/alert'
import { useEffect, useState } from 'react'
import { ServiceError } from '../../errors/ServiceError'
import { Layout } from '../../components/Layout'
import { Box, Link, Typography } from '@mui/material'
import { AMLForm } from '../../components/Form/AML'
import { AMLSchema, amlSchema } from '../../components/Form/AML/schema'
import amlService from '../../services/AML'
import { RISK, queryKey } from '../../services/constants'

export function AML() {
  const [name, setName] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const search = useQuery({
    queryKey: [queryKey.AML],
    queryFn: () => {
      const filters = {
        name,
        country
      }
      return amlService.getAML(filters)
    },
    enabled: false,
    onSuccess: () => {
      closeNotification()
    }
  })

  useEffect(() => {
    if(name !== ''){
      search.refetch().catch(err => console.error(err))
    }
  }, [name])

  useEffect(() => {
    if(search.isFetching) notifyLoading()
  }, [search.isFetching])

  useEffect(() => {
    if(search.error){
      const err = search.error as ServiceError
      notifyError(err.title, err.message)
    }
  }, [search.error])

  const onSubmit = (data: AMLSchema) => {
    setName(data.name)
    if(data.country) setCountry(data.country)
  }

  const getRiskColor = (risk: string) => {
    if(risk === RISK.HIGH){
      return style.high
    }
    if(risk === RISK.MEDIUM){
      return style.medium
    }
    return style.low
  }

  const getRiskText = (risk: string) => {
    if(risk === RISK.HIGH){
      return 'Alto'
    }
    if(risk === RISK.MEDIUM){
      return 'Medio'
    }
    return 'Bajo'
  }

  return (
    <Layout>
      <Box className={style.content}>
          <Typography variant='h5'>
            Buscador AML
          </Typography>
          <Card className={style.card}>
            <AMLForm 
                onSubmitItem={onSubmit}
                schema={amlSchema}
            />
            {
              search.data ?
              <>
                <Typography variant='h6' sx={{pt: 2, fontWeight: '600'}}>
                  Resultado
                </Typography>
                <Box className={style.split}>
                  <Box className={style.left}>
                      <img className={style.picture} src={search.data.picture}/>
                      <Typography variant='subtitle1'>
                        <b>Nombre:</b> {search.data.fullName}
                      </Typography>
                      <Typography variant='subtitle1'>
                        <b>Pais:</b> {search.data.country}
                      </Typography>
                  </Box>
                  <Box className={style.right}>
                      <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
                        <Typography className={[style.risk, getRiskColor(search.data.riskLevel)].join(' ')}>
                          Riesgo: {getRiskText(search.data.riskLevel)}
                        </Typography>
                      </Box>
                      {search.data.articles.map((article, idx) => (
                        <Card className={style.article} key={`${search.data.id}-article-${idx}`}>
                          <Box className={style.horizontal}>
                            <Typography sx={{fontWeight: '600'}} variant='subtitle1'>
                              Artículo #{idx + 1}: 
                            </Typography>
                            <Typography>
                              {article.content}
                            </Typography>
                          </Box>
                          <Link className={style.subtitleLink} target='_blank' href={article.link}>
                            [aquí]
                          </Link>
                        </Card>
                      ))}
                      {search.data.sanctions.map((sanction, idx) => (
                        <Card className={`${style.horizontal} ${style.sanction}`} key={`${search.data.id}-sanction-${idx}`}>
                          <Typography sx={{fontWeight: '600'}} variant='subtitle1'>
                            Sanción #{idx + 1}: 
                          </Typography>
                          <Typography>
                            {sanction.content}
                          </Typography>
                        </Card>
                      ))}
                  </Box>
                </Box>
              </> : ''
            }
          </Card>
      </Box>
    </Layout>
  )
}