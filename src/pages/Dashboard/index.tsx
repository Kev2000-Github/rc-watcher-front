import { Box, Button, CircularProgress, List, ListItem, Typography } from '@mui/material'
import { Layout } from '../../components/Layout'
import style from './style.module.scss'
import { Card } from '../../components/Card'
import { ComplianceScore } from '../../components/ComplianceScore'
import { useUserStore } from '../../store'
import { routes } from '../../app/constants'
import { useNavigate } from 'react-router-dom'
import { getPriorityText } from '../../utils/common'
import { useQuery } from '@tanstack/react-query'
import { queryKey } from '../../services/constants'
import { Alert, Risk } from '../../services/interface'
import overviewService from '../../services/Overview'
import { Coloredtag } from '../../components/ColoredTag'

const LOADER_SIZE = 100

export function Dashboard() {
  const navigate = useNavigate()
  const {user} = useUserStore()
  const onViewAlert = () => {
    const url = routes.ALERT.replace(':id', 'id')
    navigate(url)
  }
  const { data: overviewData } = useQuery({
    queryKey: [queryKey.OVERVIEW],
    queryFn: overviewService.getOverview,
  })

  const genAlertItems = (alerts: Alert[]) => {
    return alerts.map(alert => ({
      id: alert.id,
      title: alert.title,
      regulation: alert.Regulation.name,
      tag: getPriorityText(alert.priority),
      tagColor: alert.priority
    }))
  }

  const genRiskItems = (risks: Risk[]) => {
    return risks.map(risk => ({
      id: risk.id,
      title: risk.name,
      regulation: risk.Regulation.name,
      tagColor: style.black,
      tag: `puntaje: ${(risk.score * 100).toFixed(0)}%`
    }))
  }

  return (
    <Layout>
      <Box className={style.content}>
        <Typography variant='h4'>
          {user && `Bienvenido, ${user.fullName}`}
        </Typography>
        <Box className={style.grid}>
            <Card className={`
              ${style.card} 
              ${overviewData ? style.overview : style.cardLoading}`}
            >
              {
                overviewData ?
                <>
                  <OverviewItem
                    count={overviewData?.solutionCount ?? 0}
                    label='Soluciones'
                  />
                  <OverviewItem
                    count={overviewData?.affectingRiskCount ?? 0}
                    label='Riesgos'
                  />
                  <OverviewItem
                    count={overviewData?.alertCount ?? 0}
                    label='Alertas'
                  />
                  <OverviewItem
                    count={overviewData?.pendingQuizCount ?? 0}
                    label='Encuestas'
                  />
                </>
                : <CircularProgress size={LOADER_SIZE}/>
              }
            </Card>
            <Card className={style.card}>
              <Typography variant='h5' sx={{mr: 'auto'}}>
                Compliance Score
              </Typography>
              <ComplianceScore value={overviewData?.complianceScore ? overviewData.complianceScore * 100 : 0} />
            </Card>
            <Card className={`${style.top} ${style.card}`}>
              <Top
                headerText='Top 10 Alertas mas prioritarias'
                topItems={overviewData?.topAlerts ? genAlertItems(overviewData.topAlerts) : undefined}
                onClick={onViewAlert}
              />
            </Card>
            <Card className={`${style.top} ${style.card}`}>
              <Top
                headerText='Top 10 Riesgos más prioritarios'
                topItems={overviewData?.topRisks ? genRiskItems(overviewData.topRisks) : undefined}
                onClick={onViewAlert}
              />
            </Card>
        </Box>
      </Box>
    </Layout>
  )
}

type overviewProps = {
  count: number,
  label: string
}
function OverviewItem({
  count,
  label
}: overviewProps) {
  return (
    <Box className={style.overviewItem}>
      <Typography className={style.count} variant='h3'>
        {count}
      </Typography>
      <Typography className={style.label} variant='body1'>
        {label}
      </Typography>
    </Box>
  )
}

type topItem = {
  id: string
  title: string,
  tag: string,
  tagColor: string,
  regulation: string
}

type topProps = {
  headerText: string,
  topItems?: topItem[],
  onClick: () => void
}
function Top({
  headerText,
  topItems,
  onClick
}: topProps) {
  return (
    <>
      <Typography variant='h5' sx={{mr: 'auto'}}>
        {headerText}
      </Typography>
      {
        topItems ? 
        <List className={style.list}>
          {
            topItems.map(item => (
              <ListItem key={item.id} className={style.listItem}>
                <Typography className={style.title}>
                  {item.title}
                </Typography>
                <Coloredtag
                  text={item.tag}
                  color={item.tagColor}
                />
                <span className={style.regulation}>
                  Regulación: <p className={style.regularTxt}>{item.regulation}</p>
                </span>
                <Button 
                    variant='contained'
                    color='primary'
                    size='small'
                    className={style.button}
                    sx={{width: 'auto'}}
                    onClick={onClick}
                >
                    Ver
                </Button>
              </ListItem>
            ))
          }
        </List>
        : <CircularProgress size={LOADER_SIZE}/>
      }
    </>
  )
}