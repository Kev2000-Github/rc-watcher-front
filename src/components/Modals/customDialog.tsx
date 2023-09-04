import { Dialog, styled } from "@mui/material";

export const CustomDialog = styled(Dialog)(({theme}) => ({
    '& .MuiModal-backdrop': {
        backgroundColor: 'transparent',
    },
    '& .MuiDialog-paper': {
        borderRadius: '10px',
        border: `1px solid ${theme.custom.gray}`,
        boxShadow: '1px 2px 5px rgba(0,0,0,.3)',
        minWidth: '400px'
    }
}))

export const CustomDialogWithBackdrop = styled(Dialog)(({theme}) => ({
    '& .MuiDialog-paper': {
        borderRadius: '10px',
        border: `1px solid ${theme.custom.gray}`,
        boxShadow: '1px 2px 5px rgba(0,0,0,.3)',
        minWidth: '400px'
    }
}))