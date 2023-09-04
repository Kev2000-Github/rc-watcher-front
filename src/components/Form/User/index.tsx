import {FormControl, IconButton, InputAdornment, OutlinedInput, Button, FormHelperText, InputLabel, Select, MenuItem} from '@mui/material'
import {VisibilityOff, Visibility} from '@mui/icons-material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {Boolify} from '../interfaces'
import { UserSchema } from './schema'
import {ObjectSchema} from 'yup'
import { ReactHookFormSelect } from '../../ReactHookFormSelect'
import { Role } from '../../../services/interface'

interface FormProps {
    roles: Role[],
    onSubmitItem: (data: UserSchema) => void;
    defaultValues?: UserSchema;
    schema: ObjectSchema<UserSchema>;
    disabledFields?: Boolify<UserSchema>
}

const defaultPropValues: UserSchema = {
    email: "",
    fullName: "",
    roleId: "",
    password: "",
    username: ""
}

export function UserForm({
    roles,
    schema,
    disabledFields,
    onSubmitItem,
    defaultValues = defaultPropValues
} : FormProps) {
    const [showPassword, setShowPassword] = useState(false)
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm({ defaultValues, resolver: yupResolver(schema) });
    
    const handleOnShowPassword = () => {
      setShowPassword(prev => !prev)
    }

    const onSubmit = (data: UserSchema) => {
        onSubmitItem(data)
    }
    
    return (
    <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <FormControl sx={{ p: 1 }} variant="outlined">
                <label htmlFor='user-fullName'>Nombre Completo</label>
                <OutlinedInput
                    {...register("fullName")}
                    id="user-fullName"
                    type='text'
                    size='small'
                    disabled={disabledFields?.fullName}
                />
                {!!errors.fullName && (
                    <FormHelperText error>
                    {errors.fullName?.message}
                    </FormHelperText>
                )}
            </FormControl>

            <FormControl sx={{ p: 1 }} variant="outlined">
                <label htmlFor='user-email'>email</label>
                <OutlinedInput
                    {...register("email")}
                    id="user-email"
                    type='email'
                    size='small'
                    disabled={disabledFields?.email}
                />
                {!!errors.email && (
                    <FormHelperText error>
                    {errors.email?.message}
                    </FormHelperText>
                )}
            </FormControl>

            <FormControl sx={{ p: 1 }} variant="outlined">
                <label htmlFor='user-username'>Nombre de usuario</label>
                <OutlinedInput
                    {...register("username")}
                    id="user-username"
                    type='text'
                    size='small'
                    disabled={disabledFields?.username}
                />
                {!!errors.username && (
                    <FormHelperText error>
                    {errors.username?.message}
                    </FormHelperText>
                )}
            </FormControl>
            
            <FormControl sx={{ p: 1 }} variant="outlined">
            <label htmlFor='user-password'>Contraseña</label>
            <OutlinedInput
                {...register("password")}
                id="user-password"
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

            <FormControl sx={{ p: 1 }} variant="outlined">
                <label htmlFor='role-select'>Rol</label>
                <ReactHookFormSelect
                    id={'role-select'}
                    name={'roleId'}
                    defaultValue={''}
                    variant="outlined"
                    size="small"
                    control={control}
                >
                    {
                        roles.map(role => (
                            <MenuItem 
                            key={role.id} 
                            value={role.id}>
                                {role.name}
                            </MenuItem>
                        ))
                    }
                </ReactHookFormSelect>
                {!!errors.roleId && (
                    <FormHelperText error>
                    {errors.roleId?.message}
                    </FormHelperText>
                )}
            </FormControl>

            <FormControl sx={{ p: 1, mt: 2, display: 'flex', flexDirection: 'row-reverse' }} variant="outlined">
                <Button 
                    variant='contained'
                    color='primary'
                    type="submit"
                >
                    Crear +
                </Button>
            </FormControl>
    </form>
    )
}