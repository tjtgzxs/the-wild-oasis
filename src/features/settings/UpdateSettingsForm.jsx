import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSettings from "./useSettings.js";
import {useForm} from "react-hook-form";
import Button from "../../ui/Button.jsx";
import useUpdateSetting from "./useUpdateSetting.js";
import Spinner from "../../ui/Spinner.jsx";

function UpdateSettingsForm() {
    const {isLoading,settings:{maxBooingLength,breakfastPrice,maxGuestsPerBooking,minBookingLength}={}}=useSettings()
    const {updateSetting,isPending}=useUpdateSetting()
    const {register,handleSubmit,formState}=useForm()
    const {errors}=formState
    const onSubmit=(data)=>{
        updateSetting(data)
    }
    const onError = (err)=>{
        console.log(err)
    }
    if(isLoading)return <Spinner />
    return (
    <Form onSubmit={handleSubmit(onSubmit,onError)}>
      <FormRow label='Minimum nights/booking' error={errors?.minBookingLength?.message}>
        <Input disabled={isPending} type='number' id='min-nights' {...register('minBookingLength',{
            required:"This field is required.",
            min:{
                value:1,
                message:"Minimum  1 nights/booking"
            },
        })} defaultValue={minBookingLength}/>
      </FormRow>
      <FormRow label='Maximum nights/booking' error={errors?.maxBookingLength?.message}>
        <Input type='number' id='max-nights' {...register('maxBooingLength',{
            required:"This field is required.",
            min:{
                value:1,
                message:"Minimum  1 nights/booking"
            }
        })} defaultValue={maxBooingLength}/>
      </FormRow>
      <FormRow label='Maximum guests/booking' error={errors?.maxGuestsPerBooking?.message}>
        <Input type='number' id='max-guests' {...register("maxGuestsPerBooking",{
            required:"This field is required.",
            min:{
                value:1,
                message:"Minimum  1 guests/booking"
            }
        })} defaultValue={maxGuestsPerBooking}/>
      </FormRow>
      <FormRow label='Breakfast price' error={errors?.breakfastPrice?.message}>
        <Input type='number' id='breakfast-price' {...register("breakfastPrice",{
            required:"This field is required.",
            min:{
                value:0,
                message:"Breakfast price must be at least 0"
            }
        })} defaultValue={breakfastPrice}/>
      </FormRow>
        <Button>Edit</Button>
    </Form>
  );
}

export default UpdateSettingsForm;
