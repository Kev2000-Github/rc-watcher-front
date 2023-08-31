import { Box, Typography, Button, Pagination, Stack } from '@mui/material'
import { Sort } from '@mui/icons-material'
import { Layout } from '../../../components/Layout'
import { Card } from '../../../components/Card'
import style from './style.module.scss'
import { useEffect, useState, useRef } from 'react'
import { paginationProps } from '../../../services/interface'
import { useQuery } from '@tanstack/react-query'
import quizService from '../../../services/Quiz'
import { pagination, routes } from '../../../app/constants'
import { closeNotification, notifyLoading } from '../../../utils/alert'
import { paginationConfig } from '../../../utils/common'
import { useNavigate } from 'react-router'
import { queryKey, quizListFilter } from '../../../services/constants'
import { FilterModal } from '../../../components/Modals/Filter'
import { quizFilterProps } from '../../../services/Quiz/interface'

export function QuizListPage() {
  const navigate = useNavigate()
  const filterBtn = useRef<HTMLButtonElement>(null)
  const [stateFilter, setStateFilter] = useState<string>(quizListFilter.state.ALL)
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [page, setPage] = useState<number>(pagination.DEFAULT_PAGE)
  const { isLoading, isFetching, data: paginatedQuizzes, isPreviousData } = useQuery({
    queryKey: [queryKey.QUIZZES, page, stateFilter],
    queryFn: () => {
      const options: paginationProps = {
        limit: pagination.LIMIT,
        page
      }
      const filters = {
        state: stateFilter
      }
      return quizService.getQuizzes(options, filters)
    },
    ...paginationConfig
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
    setStateFilter(data.state ?? quizListFilter.state.ALL)
  }
  return (
    <Layout>
      {
        paginatedQuizzes && 
        <Box className={style.content}>
          <Box className={style.header}>
              <Typography variant='h6'>
                Encuestas
              </Typography>
              <Button 
                ref={filterBtn}
                onClick={onOpenFilter} 
                variant='outlined' 
                startIcon={<Sort/>} 
                color='secondary'
              >
                Filtros
              </Button>
              <FilterModal
                elementRef={filterBtn.current?.getBoundingClientRect()}
                apply={handleFilters}
                open={isFilterOpen}
                onClose={onCloseFilter}
              />
          </Box>
          
          <Box className={style.catalog}>
            {
              paginatedQuizzes?.data.map((item, idx) => {
                return (
                  <Card key={idx} className={`${style.card} ${item.isCompleted ? style.completed : ''}`}>
                      <Box className={style.cardHeader}>
                        <Typography sx={{ fontSize: 16, fontWeight: 600}} variant='body2'>
                          {item.name}
                        </Typography>
                        <Typography className={style.regulation} variant='body2'>
                          {item.Regulation.name}
                        </Typography>
                      </Box>
                      <Typography sx={{ paddingBottom: 2 }} variant='body2'>
                        {item.description}
                      </Typography>
                      <Typography className={style.questions} variant='body2'>
                        preguntas: {item.questionCount}
                      </Typography>
                      <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'end', height: 1}}>
                        <Button 
                            variant='contained'
                            color={item.isCompleted ? 'info' : 'primary'}
                            className={style.button}
                            sx={{width: 'auto'}}
                            onClick={() => {
                              const url = routes.QUIZ_FORM.split(':')[0] + item.id
                              navigate(url)
                            }}
                        >
                            Responder
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
              count={paginatedQuizzes?.totalPages} 
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