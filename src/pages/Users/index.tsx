import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import style from './style.module.scss'
import { Button, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { pagination } from '../../app/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKey } from '../../services/constants';
import { paginationProps } from '../../services/interface';
import { paginationConfig } from '../../utils/common';
import { closeNotification, notifyLoading } from '../../utils/alert';
import userService from '../../services/User';
import { useUserStore } from '../../store';
import {Edit, Delete} from '@mui/icons-material'
import { CreateUserModal } from '../../components/Modals/CreateUser';
import { UserSchema } from '../../components/Form/User/schema';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const modals = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}

export function Users() {
  const user = useUserStore(state => state.user)
  const [updates, setUpdates] = useState<number>(0)
  const [page, setPage] = useState<number>(pagination.DEFAULT_PAGE)
  const [openModal, setOpenModal] = useState<string|null>()
  const { isLoading, isFetching, data: paginatedUsers, isPreviousData, refetch } = useQuery({
    queryKey: [queryKey.USERS, page, updates],
    queryFn: () => {
      const options: paginationProps = {
        limit: pagination.LIMIT,
        page
      }
      return userService.getUsers(user?.Company?.id ?? '', options)
    },
    ...paginationConfig
  })
  const updateUser = useMutation(['updateUser'], userService.updateUser, {
    onSuccess: () => {
      onCloseModal()
    }
  })
  const createUser = useMutation(['createUser'], userService.createUser, {
    onSuccess: () => {
      onCloseModal()
      setUpdates(prev => prev + 1)
    }
  })
  const deleteUser = useMutation(['deleteUser'], userService.updateUser, {
    onSuccess: () => {
      onCloseModal()
    }
  })

  useEffect(() => {
    if(isFetching && isPreviousData) notifyLoading()
    else closeNotification()
  }, [isFetching])

  useEffect(() => {
    if(isLoading) notifyLoading()
    else closeNotification()
  }, [isLoading])

  const onEditUser = (userId: string) => {
    console.log("A")
  }

  const onDeleteUser = (userId: string) => {
    console.log("A")
  }

  const onOpenModal = (modal: string) => {
    setOpenModal(modal)
  }

  const onCloseModal = () => setOpenModal(null)
  const onSubmit = (action: string, data: UserSchema) => {
    if(action === modals.CREATE){
      const req = {
        userId: user?.id ?? '',
        companyId: user?.Company?.id ?? '',
        body: data
      }
      createUser.mutate(req)
    }
  }
  
  return (
    <Layout>
        <main className={style.content}>
            <Card className={style.card}>
                <header>
                  <Typography variant='h5'>
                      Usuarios
                  </Typography>
                  <Button 
                  variant='contained'
                  onClick={() => onOpenModal(modals.CREATE)}>
                    Agregar
                  </Button>
                </header>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Usuario</StyledTableCell>
                            <StyledTableCell>Nombre Completo</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Rol</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                          {paginatedUsers?.data.map(scopedUser => (
                            <StyledTableRow key={scopedUser.id}>
                              <StyledTableCell component="th" scope="row">
                                  {scopedUser.username}
                              </StyledTableCell>
                              <StyledTableCell>{scopedUser.fullName}</StyledTableCell>
                              <StyledTableCell>{scopedUser.email}</StyledTableCell>
                              <StyledTableCell>{scopedUser.Role.name}</StyledTableCell>
                              <StyledTableCell>
                                <IconButton
                                color='primary'
                                disabled={user?.id === scopedUser.id}
                                onClick={() => onEditUser(scopedUser.id)}>
                                  <Edit/>
                                </IconButton>
                                <IconButton
                                color='error'
                                disabled={user?.id === scopedUser.id}
                                onClick={() => onDeleteUser(scopedUser.id)}>
                                  <Delete/>
                                </IconButton>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <CreateUserModal
              submit={onSubmit}
              open={openModal === modals.CREATE}
              onClose={onCloseModal}
            />
        </main>
    </Layout>
  );
}