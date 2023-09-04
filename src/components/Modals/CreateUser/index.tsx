import { useEffect } from 'react'
import { CircularProgress, DialogContent } from "@mui/material"
import { queryKey } from "../../../services/constants"
import { UserForm } from "../../Form/User"
import { UserSchema, userSchema } from "../../Form/User/schema"
import { useMutation, useQuery } from "@tanstack/react-query"
import roleService from "../../../services/Role"
import { paginationConfig } from "../../../utils/common"
import { CustomDialog, CustomDialogWithBackdrop } from "../customDialog"
import userService from '../../../services/User'
import { User } from '../../../services/interface'
import { modals } from '../../../pages/Users'

interface Props {
    className?: string,
    open: boolean,
    onClose: () => void,
    submit: (action: string, data: UserSchema) => void
}

export const CreateUserModal = ({
    onClose,
    className,
    open,
    submit
}: Props) => {
    const { data: roles, refetch } = useQuery({
      queryKey: [queryKey.USERS],
      queryFn: roleService.getRoles,
      ...paginationConfig,
      enabled: false
    })
    const updateUser = useMutation(['updateUser'], userService.updateUser)

    useEffect(() => {
        if(open && !roles){
            refetch().catch(err => console.error(err))
        }
    }, [open])

    const onSubmit = (data: UserSchema) => {
        submit(modals.CREATE, data)
    }

    return (
        <CustomDialogWithBackdrop 
            className={className} 
            open={open} 
            onClose={onClose}
        >
            <DialogContent sx={{display: 'flex', justifyContent: 'center'}}>
                {roles ? 
                <UserForm
                    roles={roles ?? []}
                    onSubmitItem={onSubmit}
                    schema={userSchema}
                /> : 
                <CircularProgress/>
                }
            </DialogContent>
        </CustomDialogWithBackdrop>
    )
}