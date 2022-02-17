export interface InputElementProps {
    value: any
    label: string
    type: 'text' | 'range'
    min?: number
    max?: number
    step?: number
    className: string
    updateValue: (val: any) => void
}
