import { useEffect } from 'react'
import { CircularProgress, DialogContent } from "@mui/material"
import { queryKey } from "../../../../services/constants"
import { CreateUserForm } from "../../../Form/User"
import { UserSchema, userSchema } from "../../../Form/User/schema"
import { useQuery } from "@tanstack/react-query"
import roleService from "../../../../services/Role"
import { paginationConfig } from "../../../../utils/common"
import { CustomDialogWithBackdrop } from "../../customDialog"
import { modals } from '../../../../pages/Users/constants'

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
      queryKey: [queryKey.ROLES],
      queryFn: roleService.getRoles,
      ...paginationConfig,
      enabled: false
    })

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
                <CreateUserForm
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