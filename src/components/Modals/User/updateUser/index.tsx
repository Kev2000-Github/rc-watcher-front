import { useEffect } from 'react'
import { CircularProgress, DialogContent } from "@mui/material"
import { queryKey } from "../../../../services/constants"
import { EditUserForm } from "../../../Form/User"
import { EditUserSchema, editUserSchema } from "../../../Form/User/schema"
import { useQuery } from "@tanstack/react-query"
import roleService from "../../../../services/Role"
import { paginationConfig, removeBlankProperties } from "../../../../utils/common"
import { CustomDialogWithBackdrop } from "../../customDialog"
import { modals } from '../../../../pages/Users/constants'
import userService from '../../../../services/User'
import { User } from '../../../../services/interface'

interface Props {
    userId: string,
    admin: User,
    className?: string,
    open: boolean,
    onClose: () => void,
    submit: (action: string, data: EditUserSchema) => void
}

export const UpdateUserModal = ({
    userId,
    admin,
    onClose,
    className,
    open,
    submit
}: Props) => {
    const { data: roles, refetch } = useQuery({
      queryKey: [queryKey.ROLES],
      queryFn: roleService.getRoles,
      ...paginationConfig,
      enabled: false
    })
    const { data: user, refetch: refetchUser } = useQuery({
      queryKey: [queryKey.USER, userId],
      queryFn: () => {
        return userService.getUser(admin.Company.id, userId)
      },
      enabled: false
    })

    useEffect(() => {
        if(open){
            refetchUser().catch(err => console.error(err))
            if(!roles) refetch().catch(err => console.error(err))
        }
    }, [open])

    const onSubmit = (data: EditUserSchema) => {
        const filteredData = removeBlankProperties(data) as EditUserSchema
        submit(modals.UPDATE, filteredData)
    }

    const genDefaultValues = (user: User) => {
        return {
            username: user?.username ?? '',
            fullName: user?.fullName ?? '',
            email: user?.email ?? '',
            password: '',
            roleId: user?.Role?.id ?? ''
        }
    }

    return (
        <CustomDialogWithBackdrop 
            className={className} 
            open={open} 
            onClose={onClose}
        >
            <DialogContent sx={{display: 'flex', justifyContent: 'center'}}>
                {roles && user ? 
                <EditUserForm
                    roles={roles ?? []}
                    onSubmitItem={onSubmit}
                    schema={editUserSchema}
                    defaultValues={genDefaultValues(user)}
                    disabledFields={{email: true}}
                /> : 
                <CircularProgress/>
                }
            </DialogContent>
        </CustomDialogWithBackdrop>
    )
}