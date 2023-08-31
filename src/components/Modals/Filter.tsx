import { Button, Dialog, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, styled } from "@mui/material"
import { useState } from 'react'
import { quizListFilter } from "../../services/constants"
import { quizFilterProps } from "../../services/Quiz/interface"

const CustomDialog = styled(Dialog)(({theme}) => ({
    '& .MuiModal-backdrop': {
        backgroundColor: 'transparent',
    },
    '& .MuiDialog-paper': {
        borderRadius: '10px',
        border: `1px solid ${theme.custom.gray}`,
        boxShadow: '1px 2px 5px rgba(0,0,0,.3)',
        minWidth: '300px'
    }
}))

interface Props {
    className?: string,
    open: boolean,
    onClose: () => void,
    apply: (data: quizFilterProps) => void
    elementRef?: DOMRect | null,
    yOffset?: number
}

const stateOptions = [
    {value: quizListFilter.state.ALL, name: 'Todo'},
    {value: quizListFilter.state.COMPLETED, name: 'Completados'},
    {value: quizListFilter.state.PENDING, name: 'Pendientes'}
]

export const FilterModal = ({
    elementRef,
    onClose,
    apply,
    className,
    open,
    yOffset = 20
}: Props) => {
    const [state, setState] = useState<string>(stateOptions[0].value)
    const handleStateChange = (e: SelectChangeEvent<string>) => {
        setState(e.target.value)
    }
    const handleApply = () => {
        const data = {state}
        apply(data)
        onClose()
    }
    return (
        <CustomDialog 
            className={className} 
            open={open} 
            onClose={onClose}
            PaperProps={{
                style: elementRef ? {
                    position: 'absolute',
                    right: 0,
                    top: elementRef.y + yOffset
                } : undefined
            }}
        >
            <DialogContent>
                <FormControl>
                    <InputLabel id="state-label">Estado</InputLabel>
                    <Select
                        labelId="state-label"
                        value={state}
                        label="Estado"
                        variant="standard"
                        size="small"
                        onChange={handleStateChange}
                    >
                        {
                            stateOptions.map(opt => (
                                <MenuItem 
                                selected={state === opt.value} 
                                key={opt.value} 
                                value={opt.value}>
                                    {opt.name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleApply}>Aplicar</Button>
            </DialogActions>
        </CustomDialog>

    )
}