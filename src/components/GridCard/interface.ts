
export type CommonGridCardProps = {
    showState?: boolean,
    state?: string,
    stateColor?: 'primary' | 'gray',
    title: string,
    description: string,
    smallText: string,
    onClick?: () => void
    className?: string,
    disabled?: boolean,
    btnColor?: "primary" | "inherit" | "secondary" | "success" | "error" | "info" | "warning",
    btnText?: string
}