import './btnsubmit.css'
const BtnSubmit = ({fnNext,text}) => (
    <button id="submit" onClick={fnNext}>{text}</button>
)

export default BtnSubmit