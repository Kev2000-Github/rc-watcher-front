import { Button, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useState } from 'react'
import { ALERT_PRIORITY_FILTER, ALERT_STATE_FILTER } from "../../../services/constants"
import style from './style.module.scss'
import { CustomDialog } from "../customDialog"
import { AlertFilterProps } from "../../../services/Alert/interface"

interface Props {
    className?: string,
    open: boolean,
    onClose: () => void,
    apply: (data: AlertFilterProps) => void
    elementRef?: DOMRect | null,
    yOffset?: number,
    initialState?: string
}

const stateOptions = [
    {value: ALERT_STATE_FILTER.ALL, name: 'Todo'},
    {value: ALERT_STATE_FILTER.SOLVED, name: 'Resuelto'},
    {value: ALERT_STATE_FILTER.PENDING, name: 'No Resuelto'},
    {value: ALERT_STATE_FILTER.CANCELED, name: 'Cancelado'}
]

const priorityOptions = [
    {value: ALERT_PRIORITY_FILTER.ALL, name: 'Todo'},
    {value: ALERT_PRIORITY_FILTER.HIGH, name: 'Alto'},
    {value: ALERT_PRIORITY_FILTER.MEDIUM, name: 'Medio'},
    {value: ALERT_PRIORITY_FILTER.LOW, name: 'Bajo'},
]

export const FilterAlertModal = ({
    elementRef,
    onClose,
    apply,
    className,
    open,
    yOffset = 20,
    initialState
}: Props) => {
    const [state, setState] = useState<string>(initialState ?? stateOptions[0].value)
    const [priority, setPriority] = useState<string>(priorityOptions[0].value)
    
    const handleStateChange = (e: SelectChangeEvent<string>) => {
        setState(e.target.value)
    }
    const handlePriorityChange = (e: SelectChangeEvent<string>) => {
        setPriority(e.target.value)
    }
    const handleApply = () => {
        const data = {
            state,
            priority
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
                <FormControl>
                    <InputLabel id="priority-label">Prioridad</InputLabel>
                    <Select
                        labelId="priority-label"
                        value={priority}
                        label="Prioridad"
                        variant="standard"
                        size="small"
                        onChange={handlePriorityChange}
                    >
                        {
                            priorityOptions.map(opt => (
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