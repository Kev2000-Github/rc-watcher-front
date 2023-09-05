import { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {Boolify} from '../interfaces'
import { EditUserSchema, UserSchema } from './schema'
import {ObjectSchema} from 'yup'
import { Role } from '../../../services/interface'
import { CommonUserForm } from './common'

interface UserFormProps<T extends FieldValues> {
    roles: Role[]
    onSubmitItem: (data: T) => void
    defaultValues?: T
    schema: ObjectSchema<T>
    disabledFields?: Boolify<T>
}

const defaultPropValues: UserSchema = {
    email: "",
    fullName: "",
    roleId: "",
    password: "",
    username: ""
}

export function CreateUserForm({
    roles,
    schema,
    disabledFields,
    onSubmitItem,
    defaultValues = defaultPropValues
} : UserFormProps<UserSchema>) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm({ defaultValues, resolver: yupResolver(schema) });
    
    const onSubmit = (data: UserSchema) => {
        onSubmitItem(data)
    }
    
    return (
        <CommonUserForm
            control={control}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            roles={roles}
            disabledFields={disabledFields}
            buttonText={'CREAR +'}
        />
    )
}

export function EditUserForm({
    roles,
    schema,
    disabledFields,
    onSubmitItem,
    defaultValues = defaultPropValues
} : UserFormProps<EditUserSchema>) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
      } = useForm({ defaultValues, resolver: yupResolver(schema) });

    const onSubmit = (data: EditUserSchema) => {
        onSubmitItem(data)
    }

    useEffect(() => {
        reset(defaultValues)
    }, [defaultValues, reset])
    
    return (
        <CommonUserForm
            control={control}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            roles={roles}
            disabledFields={disabledFields}
            buttonText={'Editar'}
        />
    )
}

