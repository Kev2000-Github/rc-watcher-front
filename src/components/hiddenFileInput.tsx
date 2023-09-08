
interface Props {
    className?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    id?: string,
    mimeType?: string[]
}

export const HiddenFileInput = ({
    id,
    mimeType = ['application/pdf'],
    className,
    onChange
}: Props) => {

    return (
        <>
            <input
                className={className}
                onChange={onChange}
                accept={mimeType.join(', ')}
                style={{ display: 'none' }}
                id={id}
                type="file"
            /> 
        </>
    )
}