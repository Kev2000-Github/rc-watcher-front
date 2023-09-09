import { Box, Typography, Button, Pagination, Stack } from '@mui/material'
import { Sort, Add } from '@mui/icons-material'
import { Layout } from '../../../components/Layout'
import style from '../../../utils/common.module.scss'
import { useEffect, useState, useRef } from 'react'
import { paginationProps } from '../../../services/interface'
import { useQuery } from '@tanstack/react-query'
import { pagination, routes } from '../../../app/constants'
import { closeNotification, notifyLoading } from '../../../utils/alert'
import { getAlertStateText, getPriorityText, paginationConfig } from '../../../utils/common'
import { useNavigate } from 'react-router'
import { ALERT_PRIORITY, ALERT_STATE, queryKey } from '../../../services/constants'
import { quizFilterProps } from '../../../services/Quiz/interface'
import alertService from '../../../services/Alert'
import { FilterAlertModal } from '../../../components/Modals/Filter/FilterAlerts'
import { SECOND } from '../../../utils/constants'
import { GridCard } from '../../../components/GridCard'

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

  return (
    <Layout>
      {
        paginatedAlerts && 
        <Box className={style.content}>
          <Box className={style.header}>
              <Typography variant='h6'>
                Alertas
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
              paginatedAlerts?.data.map((item) => {
                return (
                  <GridCard
                    key={item.id}
                    title={item.title}
                    tagText={`Prioridad: ${getPriorityText(item.priority)}`}
                    tagColor={item.priority}
                    description={item.description}
                    smallText={`Estado: ${getAlertStateText(item.state)}`}
                    onClick={() => {
                      const url = routes.ALERT.replace(':id', item.id)
                      navigate(url)
                    }}
                    btnColor={item.state === ALERT_STATE.SOLVED ? 'info' : 'primary'}
                    state={getAlertStateText(ALERT_STATE.SOLVED)}
                    showState={item.state === ALERT_STATE.SOLVED}
                  />
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