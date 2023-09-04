import { Button, Chip, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, styled } from "@mui/material"
import { useState } from 'react'
import { quizListFilter } from "../../../services/constants"
import { quizFilterProps } from "../../../services/Quiz/interface"
import style from './style.module.scss'
import { CustomDialog } from "../customDialog"

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

const includeOptions = [
    {value: quizListFilter.include.AML, name: 'AML'},
    {value: quizListFilter.include.TAXES, name: 'Impuestos'},
    {value: quizListFilter.include.SECURITY, name: 'Seguridad'},
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
    const [tags, setTags] = useState<string[]>(includeOptions.map(opt => opt.value))
    const handleStateChange = (e: SelectChangeEvent<string>) => {
        setState(e.target.value)
    }
    const handleApply = () => {
        const data = {
            state,
            tags
        }
        apply(data)
        onClose()
    }
    const onClickTag = (val: string) => {
        const filteredTags = tags.filter(tag => tag !== val)
        if(filteredTags.length === tags.length) setTags([...tags, val])
        else setTags(filteredTags)
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
                <FormControl className={style.tagSection}>
                    {
                        includeOptions.map(opt => (
                            <Chip
                                key={opt.value}
                                sx={{
                                    width: 'fit-content',
                                    fontSize: '.8rem',
                                }}
                                label={opt.name} 
                                variant={tags.includes(opt.value) ? 'filled' : 'outlined'}
                                onClick={() => onClickTag(opt.value)} 
                                color='primary'
                            />
                        ))
                    }
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleApply}>Aplicar</Button>
            </DialogActions>
        </CustomDialog>

    )
}