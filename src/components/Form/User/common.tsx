import {FormControl, IconButton, InputAdornment, OutlinedInput, Button, FormHelperText, MenuItem, Typography} from '@mui/material'
import {VisibilityOff, Visibility} from '@mui/icons-material'
import { useState } from 'react'
import { Control, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import {Boolify} from '../interfaces'
import { EditUserSchema, UserSchema } from './schema'
import { ReactHookFormSelect } from '../../ReactHookFormSelect'
import { Role } from '../../../services/interface'

type CommmonFormProps<T extends FieldValues> = {
    roles: Role[],
    buttonText: string,
    errors: FieldErrors<T>
    control: Control<T, any>
    disabledFields?: Boolify<T>
    register: UseFormRegister<T>
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
}


export function CommonUserForm({
    roles,
    errors,
    control,
    register,
    disabledFields,
    onSubmit,
    buttonText,
} : CommmonFormProps<UserSchema> | CommmonFormProps<EditUserSchema>) {
    const [showPassword, setShowPassword] = useState(false)
    
    const handleOnShowPassword = () => {
      setShowPassword(prev => !prev)
    }
    
    return (
    <form onSubmit={onSubmit} style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
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
                    autoComplete='true'
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
                    autoComplete='true'
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
                    {showPassword ? <Visibility /> : <VisibilityOff />}
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
                <Typography variant='inherit'>Rol</Typography>
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
                    {buttonText}
                </Button>
            </FormControl>
    </form>
    )
}