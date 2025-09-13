import React, {useId} from "react";
import "../Select/Select.css"
const Select = ({
    options=[],
    label,
    style,
    ...props
}, ref )=> 
{
    const id = useId()
    return (
        <div id="select">
            {label && <label htmlFor={id}>{`${label}:`}</label>}
            <select id={id} style={style} {...props} ref={ref}>
                {options.map((option)=>(
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)