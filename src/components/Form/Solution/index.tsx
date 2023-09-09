import {FormControl, Button, FormHelperText, Typography, Autocomplete, TextField, Box, IconButton} from '@mui/material'
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
import { getPriorityText } from '../../../utils/common'
import { Alert, User } from '../../../services/interface'
import { SyntheticEvent, useEffect, useState } from 'react'
import { Coloredtag } from '../../ColoredTag'

interface FormProps {
    alerts: Alert[],
    availableUsers: User[]
    defaultValues?: SolutionSchema
    disabledFields?: Boolify<SolutionSchema>
    dangerBtnText?: string
    submitBtnText?: string
    dangerBtnOnClick?: () => void
    submitBtnOnClick?: () => void
}

interface EditFormProps extends FormProps {
    schema: ObjectSchema<SolutionSchema>
    isEditable?: true,
    onSubmitItem: (data: SolutionSchema) => void;
}
interface ViewFormProps extends FormProps {
    schema?: undefined
    isEditable?: false,
    onSubmitItem?: undefined
}

const defaultPropValues: SolutionSchema = {
    title: "",
    description: "",
    alertIds: [],
    responsableIds: [],
    steps: [{value: ''}]
}

export function SolutionForm({
    availableUsers,
    alerts,
    isEditable = true,
    schema,
    disabledFields,
    defaultValues = defaultPropValues,
    dangerBtnText = 'Descartar',
    submitBtnText = 'Guardar',
    dangerBtnOnClick,
    submitBtnOnClick,
    onSubmitItem
} : EditFormProps|ViewFormProps) {
    const [selectedAlert, setSelectedAlert] = useState<Alert|null>()
    const [addedAlerts, setAddedAlerts] = useState<Alert[]>([])
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
      } = useForm({ defaultValues, resolver: schema ? yupResolver(schema) : undefined });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'steps'
    })
    useEffect(() => {
        if(defaultValues.alertIds.length > 0){
            const defaultAlerts = alerts.filter(alert => defaultValues.alertIds.includes(alert.id))
            setAddedAlerts(defaultAlerts)
        }
    }, [])

    const onSubmit = (data: SolutionSchema) => {
        if(onSubmitItem) onSubmitItem(data)
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
        const addedAlertIds = addedAlerts.map(alert => alert.id)
        return alerts.filter(alert => {
            return !addedAlertIds.includes(alert.id)
        })
    }

    return (
        <form onSubmit={isEditable ? handleSubmit(onSubmit) : undefined} style={{display: 'flex', flexDirection: 'column'}}>
            <Box className={style.content}>
                <Box className={`${style.side} ${style.left}`}>
                    <Typography variant='h6'>
                        Solucion
                    </Typography>
                    <Card className={style.card}>
                        <Box className={style.section}>
                                <FormControl className={style.left} sx={{ p: 1 }} variant="outlined">
                                        <label htmlFor='login-title'>Titulo</label>
                                        <TextField
                                            {...register("title")}
                                            id="login-title"
                                            type='text'
                                            size='small'
                                            disabled={disabledFields?.title ?? !isEditable}
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
                                        render={({field: {onChange, ...rest}}) => (
                                            <Autocomplete
                                                {...rest}
                                                size='small'
                                                multiple
                                                id="responsableIds"
                                                isOptionEqualToValue={(a, b) => a.id === b.id}
                                                options={availableUsers}
                                                getOptionLabel={option => option.username}
                                                filterSelectedOptions
                                                onChange={(_, item) => onChange(item)}
                                                disabled={disabledFields?.responsableIds ?? !isEditable}
                                                renderInput={params => <TextField {...params}/>}
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
                                        disabled={disabledFields?.description  ?? !isEditable}
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
                                    {
                                        isEditable && 
                                        <IconButton 
                                            onClick={() => append({value: ''})}
                                            size='small' 
                                            className={style.addStep}>
                                            <Add/>
                                        </IconButton>
                                    }
                                </Box>

                                <ul className={style.noPadding}>
                                    {fields.map((item, index) => (
                                    <li key={item.id} className={style.steps}>
                                        <FormControl className={style.stepForm} variant="outlined">
                                            <Box className={style.step}>
                                                <label className={style.stepItem} htmlFor={`step-${item.id}`}>{index + 1}.</label>
                                                <TextField
                                                    {...register(`steps.${index}.value`)}
                                                    className={style.input}
                                                    id={`step-${item.id}`}
                                                    type='text'
                                                    size='small'
                                                    disabled={disabledFields?.steps ?? !isEditable}
                                                />
                                                {
                                                    isEditable &&
                                                    <IconButton 
                                                        onClick={() => remove(index)}
                                                        className={style.stepItem} 
                                                        color='error'>
                                                        <Delete/>
                                                    </IconButton>
                                                }
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
                        
                        <FormControl sx={{ p: 1, mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'end' }} variant="outlined">
                                    <Button 
                                        variant='outlined'
                                        color='error'
                                        onClick={dangerBtnOnClick ? dangerBtnOnClick : () => navigate(routes.SOLUTIONS)}
                                    >
                                        {dangerBtnText}
                                    </Button>
                                    <Button 
                                        sx={{ ml: 2 }}
                                        variant='contained'
                                        color='primary'
                                        type={submitBtnOnClick ? 'button' : 'submit'}
                                        onClick ={submitBtnOnClick}
                                    >
                                        {submitBtnText}
                                    </Button>
                        </FormControl>
                    </Card>
                </Box>
                <Box className={`${style.side} ${style.right}`}>
                    <Typography variant='h6'>
                        Alertas Relacionadas
                    </Typography>
                    <Card className={style.card}>
                        {
                            isEditable && 
                            <>
                                <Typography>
                                    Buscador alertas
                                </Typography>
                                <Box className={style.horizontal} sx={{pb: 4}}>
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
                            </>
                        }
                        {
                            addedAlerts.map(alert => {
                                return (
                                    <Box key={alert.id} className={style.alertCard}>
                                        <Box className={`${style.header} ${style.horizontal}`}>
                                            <Typography variant='h5'>
                                                Titulo
                                            </Typography>
                                            <Coloredtag
                                                color={alert.priority}
                                                text={`Prioridad: ${getPriorityText(alert.priority)}`}
                                            />
                                            {
                                                isEditable &&
                                                <Button 
                                                    sx={{ml: 'auto'}}
                                                    onClick={() => removeAlert(alert.id)}
                                                    color='error' 
                                                    size='small'>
                                                    Descartar alerta
                                                </Button>
                                            }
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
                                                Regulación
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