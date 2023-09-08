import { Box, Button, List, ListItem, Typography } from '@mui/material'
import { Layout } from '../../components/Layout'
import style from './style.module.scss'
import { Card } from '../../components/Card'
import { ComplianceScore } from '../../components/ComplianceScore'
import { useUserStore } from '../../store'
import { routes } from '../../app/constants'
import { useNavigate } from 'react-router-dom'
import { getPriorityColor, getPriorityText } from '../../utils/common'
import { useQuery } from '@tanstack/react-query'
import alertService from '../../services/Alert'
import { ALERT_STATE, queryKey } from '../../services/constants'
import { Alert, paginationProps } from '../../services/interface'

export function Dashboard() {
  const navigate = useNavigate()
  const {user} = useUserStore()
  const onViewAlert = () => {
    const url = routes.ALERT.replace(':id', 'id')
    navigate(url)
  }
  const { data: alerts } = useQuery({
    queryKey: [queryKey.ALERTS],
    queryFn: () => {
      const options: paginationProps = {
        limit: 10,
        page: 1
      }
      const filters = {
        state: ALERT_STATE.PENDING,
      }
      return alertService.getAlerts(options, filters)
    },
  })

  const genAlertItems = (alerts: Alert[]) => {
    return alerts.map(alert => ({
      id: alert.id,
      title: alert.title,
      regulation: alert.Regulation.name,
      tag: getPriorityText(alert.priority),
      tagColor: getPriorityColor(style, alert.priority)
    }))
  }

  return (
    <Layout>
      <Box className={style.content}>
        <Typography variant='h4'>
          {user && `Bienvenido, ${user.fullName}`}
        </Typography>
        <Box className={style.grid}>
            <Card className={`${style.card} ${style.overview}`}>
              <OverviewItem
                count={45}
                label='Soluciones'
              />
              <OverviewItem
                count={60}
                label='Riesgos'
              />
              <OverviewItem
                count={50}
                label='Alertas'
              />
              <OverviewItem
                count={15}
                label='Encuestas'
              />
            </Card>
            <Card className={style.card}>
              <Typography variant='h5' sx={{mr: 'auto'}}>
                Compliance Score
              </Typography>
              <ComplianceScore value={50} />
            </Card>
            <Card className={`${style.top} ${style.card}`}>
              <Top
                headerText='Top 10 Alertas mas prioritarias'
                topItems={genAlertItems(alerts?.data ?? [])}
                onClick={onViewAlert}
              />
            </Card>
            <Card className={`${style.top} ${style.card}`}>
              <Top
                headerText='Top 10 Riesgos más prioritarios'
                topItems={genAlertItems(alerts?.data ?? [])}
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
  topItems: topItem[],
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
      <List className={style.list}>
        {
          topItems.map(item => (
            <ListItem key={item.id} className={style.listItem}>
              <Typography className={style.title}>
                {item.title}
              </Typography>
              <Typography className={`${style.tag} ${item.tagColor}`} variant='body2'>
                {item.tag}
              </Typography>
              <Typography className={style.regulation}>
                Regulacion: <p className={style.regularTxt}>{item.regulation}</p>
              </Typography>
              <Button 
                  variant='contained'
                  color='primary'
                  size='small'
                  className={style.button}
                  sx={{width: 'auto'}}
                  onClick={() => onClick}
              >
                  Ver
              </Button>
            </ListItem>
          ))
        }
      </List>
    </>
  )
}