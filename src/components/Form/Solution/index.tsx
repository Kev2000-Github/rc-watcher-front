import {FormControl, OutlinedInput, Button, FormHelperText, Typography, MenuItem, TextareaAutosize, Autocomplete, TextField, Box, IconButton} from '@mui/material'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {Boolify} from '../interfaces'
import { SolutionSchema } from './schema'
import {ObjectSchema} from 'yup'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../app/constants'
import style from './style.module.scss'
import { Add, Delete } from '@mui/icons-material'
import { Card } from '../../Card'
import { useQuery } from '@tanstack/react-query'
import { queryKey } from '../../../services/constants'
import alertService from '../../../services/Alert'
import { getPriorityColor, getPriorityText, paginationConfig } from '../../../utils/common'
import { Alert, paginationProps } from '../../../services/interface'
import { SyntheticEvent, useState } from 'react'

interface FormProps {
    onSubmitItem: (data: SolutionSchema) => void;
    defaultValues?: SolutionSchema;
    schema: ObjectSchema<SolutionSchema>;
    disabledFields?: Boolify<SolutionSchema>;
}

const defaultPropValues: SolutionSchema = {
    title: "",
    description: "",
    alertIds: [],
    responsableIds: [],
    steps: [{value: ''}]
}

const availableUsers = [
    {id: '1', username: 'Alta'},
    {id: '2', username: 'Rodrik'},
    {id: '3', username: 'Ban'}
]

export function SolutionForm({
    schema,
    disabledFields,
    onSubmitItem,
    defaultValues = defaultPropValues
} : FormProps) {
    const [selectedAlert, setSelectedAlert] = useState<Alert|null>()
    const [addedAlerts, setAddedAlerts] = useState<Alert[]>([])
    const navigate = useNavigate()
    const { data: alerts } = useQuery({
        queryKey: [queryKey.ALERTS],
        queryFn: () => {
          const options: paginationProps = {
            limit: 999,
            page: 1
          }
          const filters = {}
          return alertService.getAlerts(options, filters)
        },
        ...paginationConfig,
      })
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
      } = useForm({ defaultValues, resolver: yupResolver(schema) });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'steps'
    })

    const onSubmit = (data: SolutionSchema) => {
        console.log(data)
        onSubmitItem(data)
    }

    const updateSelectedAlert = (_: SyntheticEvent<Element, Event>, value: Alert | null) => {
        if(value) setSelectedAlert(value)
    }
    
    const addAlert = () => {
        if(!selectedAlert) return
        const newAlerts = [...addedAlerts, selectedAlert]
        setAddedAlerts(newAlerts)
        setSelectedAlert(undefined)
        const alertIds = newAlerts.map(alert => alert.id)
        setValue('alertIds', alertIds, {shouldValidate: true})
    }

    const removeAlert = (id: string) => {
        let alerts = [...addedAlerts]
        alerts = alerts.filter(alert => alert.id !== id)
        setAddedAlerts(alerts)
        const alertIds = alerts.map(alert => alert.id)
        setValue('alertIds', alertIds, {shouldValidate: true})
    }

    const filterSearchOptions = () => {
        if(!alerts?.data) return []
        const addedAlertIds = addedAlerts.map(alert => alert.id)
        return alerts.data.filter(alert => {
            return !addedAlertIds.includes(alert.id)
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexDirection: 'column'}}>
            <Box className={style.content}>
                <Box className={`${style.side} ${style.left}`}>
                    <Typography variant='h6'>
                        Solucion
                    </Typography>
                    <Card className={style.card}>
                        <Box className={style.section}>
                                <FormControl className={style.left} sx={{ p: 1 }} variant="outlined">
                                        <label htmlFor='login-title'>Titulo</label>
                                        <OutlinedInput
                                            {...register("title")}
                                            id="login-title"
                                            type='text'
                                            size='small'
                                            disabled={disabledFields?.title}
                                        />
                                        {!!errors.title && (
                                            <FormHelperText error id="accountId-error">
                                            {errors.title?.message}
                                            </FormHelperText>
                                        )}
                                </FormControl>

                                <FormControl className={style.right} sx={{ p: 1, width: '100%' }} variant="outlined">
                                    <label htmlFor='responsableIds'>Responsables</label>
                                    <Controller
                                        render={({field: {onChange}}) => (
                                        <Autocomplete
                                            size='small'
                                            multiple
                                            id="responsableIds"
                                            options={availableUsers}
                                            getOptionLabel={option => option.username}
                                            filterSelectedOptions
                                            onChange={(_, item) => onChange(item)}
                                            renderInput={params => <TextField {...params} />}
                                        />
                                        )}
                                        name={'responsableIds'}
                                        control={control}
                                        defaultValue={[]}
                                    />
                                    {!!errors.responsableIds && (
                                        <FormHelperText error id="accountId-error">
                                        {errors.responsableIds?.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                        </Box>
                        
                        <FormControl sx={{ p: 1 }} variant="outlined">
                                    <label htmlFor='description-alert'>Descripcion</label>
                                    <TextField
                                        multiline
                                        id="description-alert"
                                        {...register("description")}
                                        minRows={5}
                                        disabled={disabledFields?.description}
                                    />
                                    {!!errors.description && (
                                        <FormHelperText error id="accountId-error">
                                        {errors.description?.message}
                                        </FormHelperText>
                                    )}
                        </FormControl>

                        <Box sx={{ p: 1 }}>
                                <Box className={style.stepsHeader}>
                                    <Typography>
                                        Pasos
                                    </Typography>
                                    <IconButton 
                                        onClick={() => append({value: ''})}
                                        size='small' 
                                        className={style.addStep}>
                                        <Add/>
                                    </IconButton>
                                </Box>

                                <ul className={style.noPadding}>
                                    {fields.map((item, index) => (
                                    <li key={item.id} className={style.steps}>
                                        <FormControl className={style.stepForm} variant="outlined">
                                            <Box className={style.step}>
                                                <label className={style.stepItem} htmlFor={`step-${item.id}`}>{index + 1}.</label>
                                                <OutlinedInput
                                                    {...register(`steps.${index}.value`)}
                                                    className={style.input}
                                                    id={`step-${item.id}`}
                                                    type='text'
                                                    size='small'
                                                />
                                                <IconButton 
                                                    onClick={() => remove(index)}
                                                    className={style.stepItem} 
                                                    color='error'>
                                                    <Delete/>
                                                </IconButton>
                                            </Box>
                                            {!!errors.steps && (
                                                <FormHelperText error id="accountId-error">
                                                {errors.steps[index]?.value?.message}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </li>
                                    ))}
                                </ul>
                                {!!errors.steps && (
                                    <FormHelperText error id="accountId-error">
                                    {errors.steps.message}
                                    </FormHelperText>
                                )}
                        </Box>
                        
                        <FormControl sx={{ p: 1, mt: 2, display: 'flex', flexDirection: 'row' }} variant="outlined">
                                    <Button 
                                        variant='outlined'
                                        color='error'
                                        onClick={() => navigate(routes.SOLUTIONS)}
                                    >
                                        Descartar
                                    </Button>
                                    <Button 
                                        sx={{ ml: 2 }}
                                        variant='contained'
                                        color='primary'
                                        type="submit"
                                    >
                                        Guardar
                                    </Button>
                        </FormControl>
                    </Card>
                </Box>
                <Box className={`${style.side} ${style.right}`}>
                    <Typography variant='h6'>
                        Alertas Relacionadas
                    </Typography>
                    <Card className={style.card}>
                        <Typography>
                            Buscador alertas
                        </Typography>
                        <Box className={style.horizontal}>
                            <Autocomplete
                                key={addedAlerts.length}
                                onChange={updateSelectedAlert}
                                isOptionEqualToValue={(opt, val) => opt.id === val.id}
                                sx={{flex: 0.7}}
                                size='small'
                                options={filterSearchOptions()}
                                getOptionLabel={option => option.title}
                                filterSelectedOptions
                                renderInput={params => <TextField {...params} />}
                            />
                            <Button
                                variant='contained'
                                onClick={addAlert}
                            >
                                Añadir
                            </Button>
                        </Box>
                        {
                            addedAlerts.map(alert => {
                                return (
                                    <Box key={alert.id} className={style.alertCard}>
                                        <Box className={style.horizontal} sx={{justifyContent: 'space-between'}}>
                                            <Typography variant='h5'>
                                                Titulo
                                            </Typography>
                                            <Typography className={[style.priority, getPriorityColor(style, alert.priority)].join(' ')} variant='body2'>
                                                Prioridad: {getPriorityText(alert.priority)}
                                            </Typography>
                                            <Button 
                                                onClick={() => removeAlert(alert.id)}
                                                color='error' 
                                                size='small'>
                                                Descartar alerta
                                            </Button>
                                        </Box>
                                        <FormControl>
                                            <Typography>
                                                Descripcion
                                            </Typography>
                                            <TextField
                                                size='small'
                                                multiline
                                                minRows={5}
                                                maxRows={5}
                                                disabled={true}
                                                value={alert.description}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <Typography>
                                                Regulacion
                                            </Typography>
                                            <TextField
                                                size='small'
                                                value={alert.Regulation.name}
                                                disabled={true}
                                            />
                                        </FormControl>
                                    </Box>
                                )
                            })
                        }
                        {!!errors.alertIds && (
                            <FormHelperText error id="accountId-error">
                            {errors.alertIds?.message}
                            </FormHelperText>
                        )}
                    </Card>
                </Box>
            </Box>
        </form>
    )
}