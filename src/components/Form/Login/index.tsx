import {FormControl, IconButton, InputAdornment, OutlinedInput, Button, FormHelperText} from '@mui/material'
import {VisibilityOff, Visibility} from '@mui/icons-material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {Boolify} from '../interfaces'
import { LoginSchema } from './schema'
import {ObjectSchema} from 'yup'

interface FormProps {
    onSubmitItem: (data: LoginSchema) => void;
    defaultValues?: LoginSchema;
    schema: ObjectSchema<LoginSchema>;
    disabledFields?: Boolify<LoginSchema>
}

const defaultPropValues: LoginSchema = {
    companyId: "",
    password: "",
    username: ""
}

export function LoginForm({
    schema,
    disabledFields,
    onSubmitItem,
    defaultValues = defaultPropValues
} : FormProps) {
    const [showPassword, setShowPassword] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ defaultValues, resolver: yupResolver(schema) });
    
    const handleOnShowPassword = () => {
      setShowPassword(prev => !prev)
    }

    const onSubmit = (data: LoginSchema) => {
        onSubmitItem(data)
    }
    
    return (
    <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexDirection: 'column'}}>
        <FormControl sx={{ p: 1 }} variant="outlined">
            <label htmlFor='login-username'>Username</label>
            <OutlinedInput
                {...register("username")}
                id="login-username"
                type='text'
                size='small'
                disabled={disabledFields?.username}
            />
            {!!errors.username && (
                <FormHelperText error id="accountId-error">
                  {errors.username?.message}
                </FormHelperText>
            )}
            </FormControl>

            <FormControl sx={{ p: 1 }} variant="outlined">
            <label htmlFor='login-id-empresa'>ID Empresa</label>
            <OutlinedInput
                {...register("companyId")}
                id="login-id-empresa"
                type='text'
                size='small'
                disabled={disabledFields?.companyId}
            />
            {!!errors.companyId && (
                <FormHelperText error id="accountId-error">
                  {errors.companyId?.message}
                </FormHelperText>
            )}
            </FormControl>
            
            <FormControl sx={{ p: 1 }} variant="outlined">
            <label htmlFor='login-password'>Contraseña</label>
            <OutlinedInput
                {...register("password")}
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                size='small'
                disabled={disabledFields?.password}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleOnShowPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
            />
            {!!errors.password && (
                <FormHelperText error id="accountId-error">
                  {errors.password?.message}
                </FormHelperText>
            )}
            </FormControl>
            
            <FormControl sx={{ p: 1, mt: 2, display: 'flex', flexDirection: 'row' }} variant="outlined">
                <Button 
                    variant='outlined'
                    color='primary'
                >
                    Registrarse
                </Button>
                <Button 
                    sx={{ ml: 2 }}
                    variant='contained'
                    color='primary'
                    type="submit"
                >
                    Iniciar Sesion
                </Button>
            </FormControl>
    </form>
    )
}