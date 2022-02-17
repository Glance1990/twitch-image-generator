// Types
import { ChangeEvent } from 'react'
import { InputElementProps } from './InputElement.props'

// Styles
import Styling from './InputElement.styles'

function InputElement({
    value,
    label,
    type,
    min,
    max,
    step,
    updateValue,
    className,
}: InputElementProps) {
    return (
        <label htmlFor={label} className={className}>
            <span className="title">{label}</span>
            <div className={type !== 'text' ? 'wrap-input-output' : ''}>
                <input
                    type={type}
                    min={min}
                    max={max}
                    step={step}
                    name={label}
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateValue(e.target.value)
                    }
                />
                {type !== 'text' ? <output name={label}>{value}</output> : null}
            </div>
        </label>
    )
}

export default Styling(InputElement)
