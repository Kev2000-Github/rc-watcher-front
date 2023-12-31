import { Box, Typography, Button, Pagination, Stack } from '@mui/material'
import { Sort } from '@mui/icons-material'
import { Layout } from '../../../components/Layout'
import style from '../../../utils/common.module.scss'
import { useEffect, useState, useRef } from 'react'
import { paginationProps } from '../../../services/interface'
import { useQuery } from '@tanstack/react-query'
import quizService from '../../../services/Quiz'
import { pagination, routes } from '../../../app/constants'
import { closeNotification, notifyLoading } from '../../../utils/alert'
import { paginationConfig } from '../../../utils/common'
import { useNavigate } from 'react-router'
import { queryKey, quizListFilter } from '../../../services/constants'
import { FilterModal } from '../../../components/Modals/Filter/Filter'
import { quizFilterProps } from '../../../services/Quiz/interface'
import { GridCard } from '../../../components/GridCard'
import { useUserStore } from '../../../store'

export function QuizListPage() {
  const { isAdmin, isAuditor } = useUserStore()
  const navigate = useNavigate()
  const filterBtn = useRef<HTMLButtonElement>(null)
  const [stateFilter, setStateFilter] = useState<string>(isAdmin() ? quizListFilter.state.PENDING : quizListFilter.state.COMPLETED)
  const [tagsFilter, setTagsFilter] = useState<string[]>(Object.values(quizListFilter.include))
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [page, setPage] = useState<number>(pagination.DEFAULT_PAGE)
  const { isLoading, isFetching, data: paginatedQuizzes, isPreviousData } = useQuery({
    queryKey: [queryKey.QUIZZES, page, stateFilter, ...tagsFilter],
    queryFn: () => {
      const options: paginationProps = {
        limit: pagination.LIMIT,
        page
      }
      const filters = {
        state: stateFilter,
        tags: tagsFilter
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
    setTagsFilter(tags => data.tags ?? tags)
  }

  const shouldBtnDisable = (isCompleted: boolean) => {
    if(isAuditor() && !isCompleted) return true
    else return false
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
                initialState={stateFilter}
                elementRef={filterBtn.current?.getBoundingClientRect()}
                apply={handleFilters}
                open={isFilterOpen}
                onClose={onCloseFilter}
              />
          </Box>
          
          <Box className={style.catalog}>
            {
              paginatedQuizzes?.data.map((item) => {
                return (
                  <GridCard
                    key={item.id}
                    title={item.name}
                    tagText={item.Regulation.name}
                    description={item.description}
                    smallText={`preguntas: ${item.questionCount}`}
                    state={'completo'}
                    showState={item.isCompleted}
                    onClick={() => {
                      let url = ''
                      if(!item.isCompleted) url = routes.QUIZ_FORM.replace(':id', item.id)
                      else url = routes.UPDATE_QUIZ_FORM.replace(':id', item.id)
                      navigate(url)
                    }}
                    btnColor={item.isCompleted ? 'info' : 'primary'}
                    btnText={isAdmin() ? 'Responder' : 'Ver'}
                    disabled={shouldBtnDisable(item.isCompleted)}
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