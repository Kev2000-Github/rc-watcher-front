import {FormControl, IconButton, InputAdornment, OutlinedInput, Button, FormHelperText, TextField, Box, Typography, Autocomplete} from '@mui/material'
import {VisibilityOff, Visibility} from '@mui/icons-material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {BoolifyInnerTwo} from '../interfaces'
import { RegisterSchema } from './schema'
import {ObjectSchema} from 'yup'
import style from './style.module.scss'
import { Card } from '../../Card'
import { Logo } from '../../../SVG/logo'
import { Country } from '../../../services/interface'

interface FormProps {
    countries: Country[],
    onSubmitItem: (data: RegisterSchema) => void;
    defaultValues?: RegisterSchema;
    schema: ObjectSchema<RegisterSchema>;
    disabledFields?: BoolifyInnerTwo<RegisterSchema>
}

const defaultPropValues: RegisterSchema = {
    user: {
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    },
    company: {
        name: '',
        companyId: '',
        countryId: '',
        address: ''
    }
}

export function RegisterForm({
    schema,
    disabledFields,
    onSubmitItem,
    countries,
    defaultValues = defaultPropValues
} : FormProps) {
    const [showPassword, setShowPassword] = useState(false)
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
      } = useForm({ defaultValues, resolver: yupResolver(schema) });
    
    const handleOnShowPassword = () => {
      setShowPassword(prev => !prev)
    }

    const onSubmit = (data: RegisterSchema) => {
        onSubmitItem(data)
    }
    
    return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <Logo style={style.logo} />
        <Box className={style.content}>
            <Typography variant='h5' className={style.headerTitle}>
                Datos Usuario
            </Typography>
            <Card className={style.card}>
                <Box className={style.horizontal}>
                        <FormControl className={style.fullName} sx={{ p: 1 }} variant="outlined">
                            <label htmlFor='register-fullName'>Nombre</label>
                            <TextField
                                {...register("user.fullName")}
                                id="register-fullName"
                                type='text'
                                size='small'
                                disabled={disabledFields?.user?.fullName}
                            />
                            {!!errors.user?.fullName && (
                                <FormHelperText error>
                                {errors.user?.fullName?.message}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl className={style.username} sx={{ p: 1 }} variant="outlined">
                            <label htmlFor='register-username'>Username</label>
                            <TextField
                                {...register("user.username")}
                                id="register-username"
                                type='text'
                                size='small'
                                disabled={disabledFields?.user?.username}
                            />
                            {!!errors.user?.username && (
                                <FormHelperText error>
                                {errors.user?.username?.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                </Box>
                <Box className={style.horizontal}>
                        <FormControl className={style.password} sx={{ p: 1 }} variant="outlined">
                            <label htmlFor='register-password'>Contraseña</label>
                            <OutlinedInput
                                {...register("user.password")}
                                id="register-password"
                                type={showPassword ? 'text' : 'password'}
                                size='small'
                                disabled={disabledFields?.user?.password}
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
                            {!!errors.user?.password && (
                                <FormHelperText error>
                                {errors.user?.password?.message}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl className={style.confirmPassword} sx={{ p: 1 }} variant="outlined">
                            <label htmlFor='register-confirmPassword'>Confirmar Contraseña</label>
                            <TextField
                                {...register("user.confirmPassword")}
                                id="register-confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                size='small'
                                disabled={disabledFields?.user?.password}
                            />
                            {!!errors.user?.confirmPassword && (
                                <FormHelperText error>
                                {errors.user?.confirmPassword?.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                </Box>
                <Box className={style.horizontal}>
                        <FormControl className={style.role} sx={{ p: 1 }} variant="outlined">
                            <label htmlFor='register-role'>Rol</label>
                            <TextField
                                id="register-role"
                                type='text'
                                size='small'
                                disabled={true}
                                value={'Admin'}
                            />
                        </FormControl>

                        <FormControl className={style.email} sx={{ p: 1 }} variant="outlined">
                            <label htmlFor='register-email'>Correo electrónico</label>
                            <TextField
                                {...register("user.email")}
                                id="register-email"
                                type='text'
                                size='small'
                                disabled={disabledFields?.user?.email}
                            />
                            {!!errors.user?.email && (
                                <FormHelperText error>
                                {errors.user?.email?.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                </Box>
            </Card>
            <Typography variant='h5' className={style.headerTitle}>
                Datos Empresa
            </Typography>
            <Card className={style.card}>
                <Box className={style.horizontal}>
                        <FormControl className={style.companyName} sx={{ p: 1 }} variant="outlined">
                            <label htmlFor='register-companyName'>Nombre</label>
                            <TextField
                                {...register("company.name")}
                                id="register-companyName"
                                type='text'
                                size='small'
                                disabled={disabledFields?.company?.name}
                            />
                            {!!errors.company?.name && (
                                <FormHelperText error>
                                {errors.company?.name?.message}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl className={style.companyId} sx={{ p: 1 }} variant="outlined">
                            <label htmlFor='register-companyId'>ID Empresa</label>
                            <TextField
                                {...register("company.companyId")}
                                id="register-companyId"
                                type='text'
                                size='small'
                                disabled={disabledFields?.company?.companyId}
                            />
                            {!!errors.company?.companyId && (
                                <FormHelperText error>
                                {errors.company.companyId?.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                </Box>
                <FormControl className={style.country} sx={{ p: 1}} variant="outlined">
                    <label htmlFor='countryId'>País</label>
                    <Controller
                        render={({field: {onChange}}) => (
                            <Autocomplete
                                size='small'
                                id="countryId"
                                isOptionEqualToValue={(a, b) => a.id === b.id}
                                options={countries}
                                getOptionLabel={option => option.name}
                                filterSelectedOptions
                                onChange={(_, item) => onChange(item?.id)}
                                disabled={disabledFields?.company.countryId}
                                renderInput={params => <TextField {...params}/>}
                            />
                        )}
                        name={'company.countryId'}
                        control={control}
                        defaultValue={''}
                    />
                    {!!errors.company?.countryId && (
                        <FormHelperText error>
                        {errors.company?.countryId?.message}
                        </FormHelperText>
                    )}
                </FormControl>
                <FormControl className={style.address} sx={{ p: 1 }} variant="outlined">
                    <label htmlFor='company-address'>Dirección</label>
                    <TextField
                        multiline
                        id="company-address"
                        {...register("company.address")}
                        minRows={5}
                        disabled={disabledFields?.company.address}
                    />
                    {!!errors.company?.address && (
                        <FormHelperText error>
                        {errors.company?.address.message}
                        </FormHelperText>
                    )}
                </FormControl>
            </Card>
            <FormControl sx={{ p: 1, mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'end' }} variant="outlined">
                    <Button 
                        variant='outlined'
                        color='error'
                        onClick={() => reset()}
                    >
                        Descartar Cambios
                    </Button>
                    <Button 
                        sx={{ ml: 2 }}
                        variant='contained'
                        color='primary'
                        type="submit"
                    >
                        Registrar
                    </Button>
            </FormControl>
        </Box>
    </form>
    )
}