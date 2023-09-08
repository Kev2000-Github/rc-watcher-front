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
import { getPriorityText, paginationConfig } from '../../../utils/common'
import { useNavigate } from 'react-router'
import { ALERT_STATE, SOLUTION_STATE, queryKey } from '../../../services/constants'
import { quizFilterProps } from '../../../services/Quiz/interface'
import { SECOND } from '../../../utils/constants'
import solutionService from '../../../services/Solution'
import { FilterSolutionModal } from '../../../components/Modals/Filter/FilterSolutions'
import { Coloredtag } from '../../../components/ColoredTag'

export function SolutionListPage() {
  const navigate = useNavigate()
  const filterBtn = useRef<HTMLButtonElement>(null)
  const [stateFilter, setStateFilter] = useState<string>(ALERT_STATE.ALL)
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [page, setPage] = useState<number>(pagination.DEFAULT_PAGE)
  const { isLoading, isFetching, data: paginatedSolutions, isPreviousData } = useQuery({
    queryKey: [queryKey.SOLUTIONS, page, stateFilter],
    queryFn: () => {
      const options: paginationProps = {
        limit: pagination.LIMIT,
        page
      }
      const filters = {
        state: stateFilter
      }
      return solutionService.getSolutions(options, filters)
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
  }

  return (
    <Layout>
      {
        paginatedSolutions && 
        <Box className={style.content}>
          <Box className={style.header}>
              <Typography variant='h6'>
                Soluciones
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
                  onClick={() => navigate(routes.CREATE_SOLUTION)} 
                  variant='contained' 
                  startIcon={<Add/>} 
                  color='primary'
                >
                  Crear Solucion
                </Button>
              </div>
              <FilterSolutionModal
                elementRef={filterBtn.current?.getBoundingClientRect()}
                apply={handleFilters}
                open={isFilterOpen}
                onClose={onCloseFilter}
              />
          </Box>
          
          <Box className={style.catalog}>
            {
              paginatedSolutions?.data.map((item) => {
                return (
                  <Card key={item.id} className={`
                  ${style.card} 
                  ${style.split}
                  ${item.state === SOLUTION_STATE.INACTIVE ? style.inactive: ''}`}>
                      <Box className={style.left}>
                        <Box className={style.cardHeader}>
                          <Typography sx={{ fontSize: 16, fontWeight: 600}} variant='body2'>
                            {item.title}
                          </Typography>
                        </Box>
                        <Typography className={style.description} sx={{ paddingBottom: 2 }} variant='body2'>
                          {item.description}
                        </Typography>
                        <Typography className={style.questions} variant='body2'>
                          {item.madeBy.fullName}
                        </Typography>
                      </Box>
                      <Box className={style.right}>
                        {
                          item.Alerts.map(alert => (
                            <Box key={alert.id} className={style.alerts}>
                              <Typography sx={{ fontSize: 14, fontWeight: 600}} variant='body2'>
                                {alert.title}
                              </Typography>
                              <Coloredtag
                                color={alert.priority}
                                text={`Prioridad: ${getPriorityText(alert.priority)}`}
                              />
                            </Box>
                          ))
                        }
                        <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'end', height: 1}}>
                          <Button 
                              variant='contained'
                              color={item.state ===  SOLUTION_STATE.INACTIVE ? 'info' : 'primary'}
                              className={style.button}
                              sx={{width: 'auto'}}
                              onClick={() => {
                                const url = routes.SOLUTION.replace(':id', item.id)
                                navigate(url)
                              }}
                          >
                              Ver
                          </Button>
                        </Box>
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
              count={paginatedSolutions?.totalPages} 
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