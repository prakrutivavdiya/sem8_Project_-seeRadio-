import './CustomStepper.css'

const CustomStepper = (props) => {
    let step = props.activeStep;

    let style = {
        complete: {
            one: 'step ml-auto completeStep',
            two: 'step completeStep'
        },
        active: {
            one: 'step ml-auto activeStep',
            two: 'step activeStep',
            three: 'step mr-auto activeStep'
        },
        incomplete: {
            two: 'step incompleteStep',
            three:'step mr-auto incompleteStep'
        }
    }
    return (
        <div className='d-flex flex-rows my-5'>
            <div className={step===1?style.active.one:step===2?style.complete.one:style.complete.one}>step 1<br />Add Advertiser</div>
            <div className={step===1?style.incomplete.two:step===2?style.active.two:style.complete.two}>step 2<br />Add Order</div>
            <div className={step===1?style.incomplete.three:step===2?style.incomplete.three:style.active.three}>step 3<br />Add Assets</div>

        </div>
    );
}
export default CustomStepper;