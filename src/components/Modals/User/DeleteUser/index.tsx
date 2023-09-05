import { Button, DialogActions, DialogContent, Typography } from "@mui/material"
import { UserSchema } from "../../../Form/User/schema"
import { CustomDialogWithBackdrop } from "../../customDialog"
import { modals } from '../../../../pages/Users'

interface Props {
    userId: string,
    className?: string,
    open: boolean,
    onClose: () => void,
    submit: (action: string, data: UserSchema|string) => void
}

export const DeleteUserModal = ({
    userId,
    onClose,
    className,
    open,
    submit
}: Props) => {
    return (
        <CustomDialogWithBackdrop 
            className={className} 
            open={open} 
            onClose={onClose}
        >
            <DialogContent sx={{display: 'flex', justifyContent: 'center'}}>
                <Typography>
                    ¿seguro que quieres eliminar este usuario?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>Cancelar</Button>
                <Button color='error' onClick={() => submit(modals.DELETE, userId)}>Eliminar</Button>
            </DialogActions>
        </CustomDialogWithBackdrop>
    )
}