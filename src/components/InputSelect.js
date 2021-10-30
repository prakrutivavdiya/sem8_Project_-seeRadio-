import {Input} from 'reactstrap';
const InputSelect = (props) => {

    let options=[];
    //console.log(props.options)
    options=props.options.map((obj)=>{
       // console.log('obj',{...obj})
       return ( <option value={obj.value} key={Math.random()} label={obj.label}></option>);
       
    })
    //console.log(options);

    return (
        <Input type="select" value={props.value} onChange={props.onChange} name={props.name} valid={props.valid} invalid={props.invalid}>
            <option value=''>select..</option>
            {options}
        </Input>
    );
}
export default InputSelect;
