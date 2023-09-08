/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormControlProps, InputLabel, Select } from '@mui/material'
import { Control, Controller } from "react-hook-form";

type Props = {
    name?: string,
    label?: string,
    className?: string,
    control: Control<any, any>,
    defaultValue?: string,
    children: React.ReactNode
} & FormControlProps

export const ReactHookFormSelect = ({
  name = 'select',
  label,
  control,
  defaultValue,
  children,
  ...props
}: Props) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      {
        label ? <InputLabel id={labelId}>{label}</InputLabel> : ''
      }
      <Controller
        render={({field}) => {
            return (
                <Select labelId={label ? labelId : undefined} {...field}>
                  {children}
                </Select>
            )
        }}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};