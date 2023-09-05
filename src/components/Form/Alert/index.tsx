import {FormControl, OutlinedInput, Button, FormHelperText, Typography, MenuItem, TextareaAutosize} from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {Boolify} from '../interfaces'
import { AlertSchema } from './schema'
import {ObjectSchema} from 'yup'
import { ReactHookFormSelect } from '../../ReactHookFormSelect'
import { Regulation } from '../../../services/interface'
import { ALERT_PRIORITY } from '../../../services/constants'
import { CustomTextArea } from '../../CustomTextArea'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../app/constants'

interface FormProps {
    regulations: Regulation[],
    onSubmitItem: (data: AlertSchema) => void;
    defaultValues?: AlertSchema;
    schema: ObjectSchema<AlertSchema>;
    disabledFields?: Boolify<AlertSchema>;
}

const defaultPropValues: AlertSchema = {
    title: "",
    description: "",
    priority: "",
    regulationId: "",
}

const priorityOptions = [
    {value: ALERT_PRIORITY.HIGH, name: 'Alta'},
    {value: ALERT_PRIORITY.MEDIUM, name: 'Media'},
    {value: ALERT_PRIORITY.LOW, name: 'Baja'}
]

export function AlertForm({
    regulations,
    schema,
    disabledFields,
    onSubmitItem,
    defaultValues = defaultPropValues
} : FormProps) {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm({ defaultValues, resolver: yupResolver(schema) });
    

    const onSubmit = (data: AlertSchema) => {
        onSubmitItem(data)
    }
    
    return (
    <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexDirection: 'column'}}>
        <FormControl sx={{ p: 1 }} variant="outlined">
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

            <FormControl sx={{ p: 1 }} variant="outlined">
            <label htmlFor='description-alert'>Descripcion</label>
            <CustomTextArea
                id="description-alert"
                {...register("description")}
                minRows={4}
                disabled={disabledFields?.description}
            />
            {!!errors.description && (
                <FormHelperText error id="accountId-error">
                  {errors.description?.message}
                </FormHelperText>
            )}
            </FormControl>
            
            <FormControl sx={{ p: 1 }} variant="outlined">
                <Typography variant='inherit'>Prioridad</Typography>
                <ReactHookFormSelect
                    id={'priority-select'}
                    name={'priority'}
                    defaultValue={''}
                    variant="outlined"
                    size="small"
                    control={control}
                >
                    {
                        priorityOptions.map(priority => (
                            <MenuItem 
                            key={priority.value} 
                            value={priority.value}>
                                {priority.name}
                            </MenuItem>
                        ))
                    }
                </ReactHookFormSelect>
                {!!errors.priority && (
                    <FormHelperText error>
                    {errors.priority?.message}
                    </FormHelperText>
                )}
            </FormControl>

            <FormControl sx={{ p: 1 }} variant="outlined">
                <Typography variant='inherit'>Regulacion</Typography>
                <ReactHookFormSelect
                    id={'regulation-select'}
                    name={'regulationId'}
                    defaultValue={''}
                    variant="outlined"
                    size="small"
                    control={control}
                >
                    {
                        regulations.map(regulation => (
                            <MenuItem 
                            key={regulation.id} 
                            value={regulation.id}>
                                {regulation.name}
                            </MenuItem>
                        ))
                    }
                </ReactHookFormSelect>
                {!!errors.regulationId && (
                    <FormHelperText error>
                    {errors.regulationId?.message}
                    </FormHelperText>
                )}
            </FormControl>
            
            <FormControl sx={{ p: 1, mt: 2, display: 'flex', flexDirection: 'row' }} variant="outlined">
                <Button 
                    variant='outlined'
                    color='error'
                    onClick={() => navigate(routes.ALERTS)}
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
    </form>
    )
}