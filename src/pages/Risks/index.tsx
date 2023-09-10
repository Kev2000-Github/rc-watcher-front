import { Box, Typography, TableContainer, Table, TableHead, TableRow, Paper, TableBody, TableFooter, TablePagination } from '@mui/material'
import { Layout } from '../../components/Layout'
import style from './style.module.scss'
import { useEffect, useState } from 'react'
import { paginationProps } from '../../services/interface'
import { useQuery } from '@tanstack/react-query'
import { pagination } from '../../app/constants'
import { closeNotification, notifyLoading } from '../../utils/alert'
import { paginationConfig } from '../../utils/common'
import { queryKey } from '../../services/constants'
import { SECOND } from '../../utils/constants'
import riskService from '../../services/Risk'
import { Card } from '../../components/Card'
import { StyledTableCell, StyledTableRow } from '../../components/styledComponents'
import { Coloredtag } from '../../components/ColoredTag'

export function Risks() {
  const [page, setPage] = useState<number>(pagination.DEFAULT_PAGE - 1)
  const [rowsPerPage, setRowsPerPage] = useState<number>(pagination.LIMIT);
  const { isLoading, isFetching, data: paginatedRisks, isPreviousData } = useQuery({
    queryKey: [queryKey.RISKS, page],
    queryFn: () => {
      const options: paginationProps = {
        limit: pagination.LIMIT,
        page: page + 1
      }
      return riskService.getRisks(options)
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

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Layout>
      <Box className={style.content}>
        {
          paginatedRisks &&
          <Card className={style.card}>
              <Typography variant='h5' sx={{pb: 1}}>
                  Riesgos
              </Typography>
              <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }}>
                      <TableHead>
                      <TableRow>
                          <StyledTableCell>Nombre</StyledTableCell>
                          <StyledTableCell>Regulacion</StyledTableCell>
                          <StyledTableCell>Riesgo</StyledTableCell>
                      </TableRow>
                      </TableHead>
                      <TableBody>
                        {paginatedRisks.data.map(risk => (
                          <StyledTableRow key={risk.id}>
                            <StyledTableCell component="th" scope="row">
                              {risk.name}
                            </StyledTableCell>
                            <StyledTableCell>
                              {risk.Regulation.name}
                            </StyledTableCell>
                            <StyledTableCell>
                              <Coloredtag
                                className={style.tag}
                                text={`puntaje: ${(risk.score * 100).toFixed(0)}%`}
                              />
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[]}
                            colSpan={3}
                            count={-1}
                            labelDisplayedRows={({from, to}) => `${from}-${to}`}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                          />
                        </TableRow>
                      </TableFooter>
                  </Table>
              </TableContainer>
          </Card>
        }
      </Box>
    </Layout>
  )
}