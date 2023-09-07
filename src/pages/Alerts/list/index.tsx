import { Box, Typography, Button, Pagination, Stack } from '@mui/material'
import { Sort, Add } from '@mui/icons-material'
import { Layout } from '../../../components/Layout'
import { Card } from '../../../components/Card'
import style from './style.module.scss'
import { useEffect, useState, useRef } from 'react'
import { paginationProps } from '../../../services/interface'
import { useQuery } from '@tanstack/react-query'
import { pagination, routes } from '../../../app/constants'
import { closeNotification, notifyLoading } from '../../../utils/alert'
import { getPriorityColor, getPriorityText, paginationConfig } from '../../../utils/common'
import { useNavigate } from 'react-router'
import { ALERT_PRIORITY, ALERT_STATE, queryKey } from '../../../services/constants'
import { quizFilterProps } from '../../../services/Quiz/interface'
import alertService from '../../../services/Alert'
import { FilterAlertModal } from '../../../components/Modals/Filter/FilterAlerts'
import { SECOND } from '../../../utils/constants'

export function AlertListPage() {
  const navigate = useNavigate()
  const filterBtn = useRef<HTMLButtonElement>(null)
  const [stateFilter, setStateFilter] = useState<string>(ALERT_STATE.ALL)
  const [priorityFilter, setPriorityFilter] = useState<string>(ALERT_PRIORITY.ALL)
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [page, setPage] = useState<number>(pagination.DEFAULT_PAGE)
  const { isLoading, isFetching, data: paginatedAlerts, isPreviousData } = useQuery({
    queryKey: [queryKey.ALERTS, page, stateFilter, priorityFilter],
    queryFn: () => {
      const options: paginationProps = {
        limit: pagination.LIMIT,
        page
      }
      const filters = {
        state: stateFilter,
        priority: priorityFilter
      }
      return alertService.getAlerts(options, filters)
    },
    ...paginationConfig,
    staleTime: SECOND * 5
  })

  useEffect(() => {
    if(isFetching && isPreviousData) notifyLoading()
    else closeNotification()
  }, [isFetching])

  useEffect(() => {
    if(isLoading) notifyLoading()
    else closeNotification()
  }, [isLoading])

  const onChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  const onOpenFilter = () => setIsFilterOpen(true)
  const onCloseFilter = () => setIsFilterOpen(false)
  const handleFilters = (data: quizFilterProps) => {
    setStateFilter(data.state ?? ALERT_STATE.ALL)
    setPriorityFilter(data.state ?? ALERT_PRIORITY.ALL)
  }

  const getAlertState = (alert: string) => {
      if(alert === ALERT_STATE.SOLVED){
        return 'Resuelto'
      }
      if(alert === ALERT_STATE.PENDING){
        return 'Sin resolver'
      }
      return 'Cancelado'
  }

  return (
    <Layout>
      {
        paginatedAlerts && 
        <Box className={style.content}>
          <Box className={style.header}>
              <Typography variant='h6'>
                Encuestas
              </Typography>
              <div className={style.headerButtons}>
                <Button 
                  ref={filterBtn}
                  onClick={onOpenFilter} 
                  variant='outlined' 
                  startIcon={<Sort/>} 
                  color='secondary'
                >
                  Filtros
                </Button>
                <Button 
                  ref={filterBtn}
                  onClick={() => navigate(routes.CREATE_ALERT)} 
                  variant='contained' 
                  startIcon={<Add/>} 
                  color='primary'
                >
                  Crear Alerta
                </Button>
              </div>
              <FilterAlertModal
                elementRef={filterBtn.current?.getBoundingClientRect()}
                apply={handleFilters}
                open={isFilterOpen}
                onClose={onCloseFilter}
              />
          </Box>
          
          <Box className={style.catalog}>
            {
              paginatedAlerts?.data.map((item, idx) => {
                return (
                  <Card key={idx} className={`${style.card} ${item.state ===  ALERT_STATE.SOLVED? style.completed : ''}`}>
                      <Box className={style.cardHeader}>
                        <Typography sx={{ fontSize: 16, fontWeight: 600}} variant='body2'>
                          {item.title}
                        </Typography>
                        <Typography className={[style.priority, getPriorityColor(style, item.priority)].join(' ')} variant='body2'>
                          Prioridad: {getPriorityText(item.priority)}
                        </Typography>
                      </Box>
                      <Typography sx={{ paddingBottom: 2 }} variant='body2'>
                        {item.description}
                      </Typography>
                      <Typography className={style.questions} variant='body2'>
                        Estado: {getAlertState(item.state)}
                      </Typography>
                      <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'end', height: 1}}>
                        <Button 
                            variant='contained'
                            color={item.state ===  ALERT_STATE.SOLVED ? 'info' : 'primary'}
                            className={style.button}
                            sx={{width: 'auto'}}
                            onClick={() => {
                              const url = routes.QUIZ_FORM.split(':')[0] + item.id
                              navigate(url)
                            }}
                        >
                            Ver
                        </Button>
                      </Box>
                  </Card>
                )
              })
            }
          </Box>
          <Stack alignItems={'center'} sx={{paddingBottom: 3}}>
            <Pagination
              disabled={isFetching && isPreviousData}
              page={page}
              onChange={onChangePage}
              count={paginatedAlerts?.totalPages} 
              siblingCount={2}
              size="small" 
              showFirstButton 
              showLastButton />
          </Stack>
        </Box>
      }
    </Layout>
  )
}