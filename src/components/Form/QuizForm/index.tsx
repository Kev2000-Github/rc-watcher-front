import { 
    Box, 
    Typography, 
    Button, 
    TableContainer, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    Checkbox, 
    TableBody, 
    FormControlLabel, 
    RadioGroup, 
    Radio, 
    IconButton } from '@mui/material'
import { Card } from '../../../components/Card'
import style from './style.module.scss'
import { AttachFile } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { QuizForm } from '../../../services/interface'
import { DynamicSchema, QuizFormSchema } from './schema'
import { useEffect } from 'react'
import { notifyError } from '../../../utils/alert'

interface FormProps {
    onSubmitItem: (data: QuizFormSchema) => void;
    defaultValues?: QuizFormSchema;
    schema: DynamicSchema;
    formData: QuizForm;
}

export function QuizForm({
    formData: quiz,
    schema,
    onSubmitItem,
    defaultValues
}: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

    const onSubmit = (data: QuizFormSchema) => {
        onSubmitItem(data)
    }
    useEffect(() => {
        const errorArr = Object.keys(errors)
        if(errorArr.length > 0) {
            const message = errorArr.map(key => errors[key]?.selectionId?.message ?? '')
            notifyError('¡Aun no has terminado la encuesta!', message)
        }
    }, [errors])
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}  className={style.content}>
        <Typography variant='h6' className={style.title}>
            {quiz.Regulation.name}
        </Typography>
        <Card className={style.form}>
            <Typography className={style.formTitle} variant='h6'>
            {quiz.name}
            </Typography>
            <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell className={style.tableHeaderCell}></TableCell>
                    <TableCell className={style.tableHeaderCell}>Pregunta</TableCell>
                    <TableCell className={style.tableHeaderCell} align="left">Respuesta</TableCell>
                    <TableCell className={style.tableHeaderCell} align="left">Riesgo</TableCell>
                    <TableCell className={style.tableHeaderCell} align="left">Archivo</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {quiz.Questions.map((question, idx) => (
                    <TableRow
                    className={style.tableRowContent}
                    key={question.id}
                    >
                    <TableCell sx={{textAlign: 'center', fontWeight: 600}} component='th' scope="row">
                        {idx + 1}.
                    </TableCell>
                    <TableCell scope="row">
                        {question.description}
                    </TableCell>
                    <TableCell align="left">
                        <RadioGroup
                            className={style.selections}
                            name={`selections-${question.id}`}
                        >
                            {
                            question.Selections.map(selection => {
                                const isMultiple = question.isMultiple
                                return (
                                <FormControlLabel 
                                    key={selection.id}
                                    className={style.selection}
                                    value={selection.id} 
                                    control={isMultiple ? 
                                    <Checkbox 
                                        {...register(`${question.id}.selectionId`)}
                                        value={selection.id}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 }}}
                                    /> 
                                    : <Radio 
                                            {...register(`${question.id}.selectionId`)}
                                            value={selection.id}
                                            size='small'/>} 
                                    label={selection.description} 
                                />
                                )
                            })
                            }
                        </RadioGroup>
                    </TableCell>
                    <TableCell align="left">
                        <Typography className={style.riskName} variant='body2'>
                        {question.Risk.name}
                        </Typography>
                    </TableCell>
                    <TableCell align="left">
                        {
                        question.hasDoc ? 
                        <IconButton>
                            <AttachFile/>
                        </IconButton>
                        : ''
                        }
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <Box className={style.cardFooter}>
            <Button 
                variant='outlined'
                color='error'
                className={style.button}
                sx={{marginRight: 2}}
            >
                Descartar
            </Button>
            <Button 
                variant='contained'
                color='primary'
                className={style.button}
                type='submit'
            >
                Guardar
            </Button>
            </Box>
        </Card>
    </form>
  )
}