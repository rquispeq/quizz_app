import './option.css'
const Option = ({option_text,id}) => (
    <li>
        <input type="radio" className="answer" name="answer" id={id} />
        <label htmlFor={id}>{option_text}</label>
    </li>
)

export default Option