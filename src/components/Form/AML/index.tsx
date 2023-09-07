import {FormControl, OutlinedInput, Button, FormHelperText, Box, TextField} from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {Boolify} from '../interfaces'
import { AMLSchema } from './schema'
import {ObjectSchema} from 'yup'
import style from './style.module.scss'

interface FormProps {
    onSubmitItem: (data: AMLSchema) => void;
    defaultValues?: AMLSchema;
    schema: ObjectSchema<AMLSchema>;
    disabledFields?: Boolify<AMLSchema>
}

const defaultPropValues: AMLSchema = {
    name: '',
    country: ''
}

export function AMLForm({
    schema,
    disabledFields,
    onSubmitItem,
    defaultValues = defaultPropValues
} : FormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ defaultValues, resolver: yupResolver(schema) });

    const onSubmit = (data: AMLSchema) => {
        onSubmitItem(data)
    }
    
    return (
    <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexDirection: 'column'}}>
        <Box className={style.horizontal}>
            <FormControl className={style.name} sx={{ p: 1 }} variant="outlined">
                <label htmlFor='aml-name'>Buscar Personalidad AML - PEP</label>
                <TextField
                    {...register("name")}
                    id="aml-name"
                    type='text'
                    size='small'
                    disabled={disabledFields?.country}
                    autoComplete='on'
                />
                {!!errors.name && (
                    <FormHelperText error>
                    {errors.name?.message}
                    </FormHelperText>
            )}
            </FormControl>
            <FormControl sx={{ p: 1 }} variant="outlined">
                <label htmlFor='aml-country'>Pais</label>
                <OutlinedInput
                    {...register("country")}
                    id="aml-country"
                    type='text'
                    size='small'
                    disabled={disabledFields?.country}
                    autoComplete='on'
                />
                {!!errors.country && (
                    <FormHelperText error>
                    {errors.country?.message}
                    </FormHelperText>
            )}
            </FormControl>
            <FormControl sx={{ p: 1 }} variant="outlined">
                <Button 
                    size='large'
                    variant='contained'
                    color='primary'
                    type="submit"
                >
                    Realizar Busqueda
                </Button>
            </FormControl>
            
        </Box>
    </form>
    )
}