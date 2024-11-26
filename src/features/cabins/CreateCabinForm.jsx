import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import FormRow from "../../ui/FormRow.jsx";
import useCreateCabin from "./useCreateCabin.js";
import useUpdateCabin from "./useUpdateCabin.js";



function CreateCabinForm({cabinToEdit={}}) {

    const {id:editId,...editValues}=cabinToEdit;
    const isEditSession=Boolean(editId);
    const {register,handleSubmit,reset,getValues,formState}=useForm(
        {
            defaultValues:isEditSession?editValues:{}
        }
    )
    const {errors}=formState
    const {createCabin,isCreating}=useCreateCabin()
    const   {editCabin,isEditing}=useUpdateCabin()
    const isWorking=isEditing||isCreating
    const onSubmit = (values)=>{
        // console.log(values.image)
        // console.log({...values,image:values.image[0]})
        const image=typeof (values.image)==="string"?values.image:values.image[0];
        if(isEditSession){
            editCabin({newCabinData:{...values,image},id:editId},{
                onSuccess:()=>reset()
            });
        }else {
            createCabin({...values,image},{onSuccess:()=>reset()})
        }


    }
    const onError = (err)=>{
        console.log(err)
    }
  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)}>
      <FormRow label={"Cabin name"} error={errors?.name?.message} >

        <Input {...register('name',{
            required:"This field is required.",

        })} type="text" id="name" disabled={isWorking} />

      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>

        <Input {...register("maxCapacity",{
            required:"This field is required.",
            min:{
                value:1,
                message:"Capacity must be at least 1"
            }

        })} type="number" id="maxCapacity" disabled={isWorking} />

      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>

        <Input {...register("regularPrice",{
            required:"This field is required.",
            min:{
                value:1,
                message:"Price must be at least 1"
            }

        })} type="number" id="regularPrice" disabled={isWorking} />

      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>

        <Input  {...register("discount",{
            required:"This field is required.",
            validate:(value)=>{
                console.log(value,getValues().regularPrice)
                return +value<=Number(getValues().regularPrice)||"Discount must be less than the regular price"
            }



        })} type="number" id="discount" defaultValue={0} disabled={isWorking} />

      </FormRow>

      <FormRow label={"Description for website"} error={errors?.description?.message}>

        <Textarea {...register("description",{
            required:"This field is required.",

        })} type="number" id="description" defaultValue="" disabled={isWorking} />

      </FormRow>

      <FormRow label={"Cabin photo"} error={errors?.image?.message}>

        <FileInput  type={`file`} id="image" accept="image/*" {...register("image",{
            required:isEditSession?false:"This field is required.",

        })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession?"Edit Cabin":"Add Cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
