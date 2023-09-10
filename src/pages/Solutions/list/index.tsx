import { Box, Typography, Button, Pagination, Stack } from '@mui/material'
import { Sort, Add } from '@mui/icons-material'
import { Layout } from '../../../components/Layout'
import style from '../../../utils/common.module.scss'
import { useEffect, useState, useRef } from 'react'
import { Solution, paginationProps } from '../../../services/interface'
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
import { GridCardSplit } from '../../../components/GridCard/split'
import { useUserStore } from '../../../store'

export function SolutionListPage() {
  const { isAdmin } = useUserStore()
  const navigate = useNavigate()
  const filterBtn = useRef<HTMLButtonElement>(null)
  const [stateFilter, setStateFilter] = useState<string>(SOLUTION_STATE.ACTIVE)
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

  const genTagData = (solution: Solution) => {
    return solution.Alerts.map(alert => ({
      tagColor: alert.priority,
      tagText: `Prioridad: ${getPriorityText(alert.priority)}`,
      subtitle: alert.title
    }))
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
                {
                  isAdmin() &&
                  <Button 
                    ref={filterBtn}
                    onClick={() => navigate(routes.CREATE_SOLUTION)} 
                    variant='contained' 
                    startIcon={<Add/>} 
                    color='primary'
                  >
                    Crear Solucion
                  </Button>
                }
              </div>
              <FilterSolutionModal
                initialState={stateFilter}
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
                  <>
                    <GridCardSplit
                      key={item.id}
                      title={item.title}
                      description={item.description}
                      smallText={item.madeBy.fullName}
                      tagData={genTagData(item)}
                      onClick={() => {
                        const url = routes.SOLUTION.replace(':id', item.id)
                        navigate(url)
                      }}
                      btnColor={item.state === SOLUTION_STATE.INACTIVE ? 'info' : 'primary'}
                      state={'Inactivo'}
                      showState={item.state === SOLUTION_STATE.INACTIVE}
                      stateColor='gray'
                    />
                  </>
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