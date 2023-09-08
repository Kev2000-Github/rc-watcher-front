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
import { Button, IconButton, TableFooter, TablePagination, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { pagination } from '../../app/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { mutationKey, queryKey } from '../../services/constants';
import { paginationProps } from '../../services/interface';
import { paginationConfig } from '../../utils/common';
import { closeNotification, notifyError, notifyLoading } from '../../utils/alert';
import userService from '../../services/User';
import { useUserStore } from '../../store';
import {Edit, Delete} from '@mui/icons-material'
import { CreateUserModal } from '../../components/Modals/User/CreateUser';
import { EditUserSchema, UserSchema } from '../../components/Form/User/schema';
import { UpdateUserModal } from '../../components/Modals/User/updateUser';
import { DeleteUserModal } from '../../components/Modals/User/DeleteUser';
import { ServiceError } from '../../errors/ServiceError';
import { modals } from './constants';

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

export function Users() {
  const user = useUserStore(state => state.user)
  const [page, setPage] = useState<number>(pagination.DEFAULT_PAGE - 1)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [updates, setUpdates] = useState<number>(0)
  const [selectedUser, setSelectedUser] = useState<string>('')
  const [openModal, setOpenModal] = useState<string|null>(null)
  const { isLoading, isFetching, data: paginatedUsers, isPreviousData } = useQuery({
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

  const updateUser = useMutation([mutationKey.UPDATE_USER], userService.updateUser, {
    onSuccess: () => {
      onCloseModal()
      setUpdates(prev => prev + 1)
    },
    onError: (error: ServiceError) => {
      notifyError(error.title, error.message)
    }
  })
  const createUser = useMutation([mutationKey.USER], userService.createUser, {
    onSuccess: () => {
      onCloseModal()
      setUpdates(prev => prev + 1)
    },
    onError: (error: ServiceError) => {
      notifyError(error.title, error.message)
    }
  })
  const deleteUser = useMutation([mutationKey.DELETE_USER], userService.deleteUser, {
    onSuccess: () => {
      onCloseModal()
      setUpdates(prev => prev + 1)
    },
    onError: (error: ServiceError) => {
      notifyError(error.title, error.message)
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

  const onUpdateSelectedUser = (action: string, userId: string) => {
    setSelectedUser(userId)
    setOpenModal(action)
  }

  const onOpenModal = (modal: string) => {
    setOpenModal(modal)
  }

  const onCloseModal = () => {
    setSelectedUser('')
    setOpenModal(null)
  }

  const onSubmit = (action: string, data: UserSchema|EditUserSchema|string) => {
    if(action === modals.CREATE){
      const req = {
        companyId: user?.Company?.id ?? '',
        body: typeof data === 'string' ? {} : data
      }
      createUser.mutate(req)
    }
    else if(action === modals.UPDATE){
      const req = {
        userId: selectedUser ?? '',
        companyId: user?.Company?.id ?? '',
        body: typeof data === 'string' ? {} : data
      }
      updateUser.mutate(req)
    }
    else if(action === modals.DELETE){
      const req = {
        userId: selectedUser ?? '',
        companyId: user?.Company?.id ?? '',
      }
      deleteUser.mutate(req)
    }
  }

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    console.log(newPage)
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
        {
          user ?
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
                    <Table sx={{ minWidth: 700 }}>
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
                                onClick={() => onUpdateSelectedUser(modals.UPDATE, scopedUser.id)}>
                                  <Edit/>
                                </IconButton>
                                <IconButton
                                color='error'
                                disabled={user?.id === scopedUser.id}
                                onClick={() => onUpdateSelectedUser(modals.DELETE, scopedUser.id)}>
                                  <Delete/>
                                </IconButton>
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
            <CreateUserModal
              submit={onSubmit}
              open={openModal === modals.CREATE}
              onClose={onCloseModal}
            />
            <UpdateUserModal
              userId={selectedUser}
              admin={user}
              submit={onSubmit}
              open={openModal === modals.UPDATE}
              onClose={onCloseModal}            
            />
            <DeleteUserModal
              userId={selectedUser}
              submit={onSubmit}
              open={openModal === modals.DELETE}
              onClose={onCloseModal}            
            />
        </main>
        : ''
        }
    </Layout>
  );
}