import { Button, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useState } from 'react'
import { SOLUTION_STATE } from "../../../services/constants"
import style from './style.module.scss'
import { CustomDialog } from "../customDialog"
import { SolutionFilterProps } from "../../../services/Solution/interface"

interface Props {
    className?: string,
    open: boolean,
    onClose: () => void,
    apply: (data: SolutionFilterProps) => void
    elementRef?: DOMRect | null,
    yOffset?: number
}

const stateOptions = [
    {value: SOLUTION_STATE.ALL, name: 'Todo'},
    {value: SOLUTION_STATE.ACTIVE, name: 'Activo'},
    {value: SOLUTION_STATE.INACTIVE, name: 'Inactivo'},
]

export const FilterSolutionModal = ({
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
        const data = {
            state,
        }
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
            <DialogContent className={style.content}>
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