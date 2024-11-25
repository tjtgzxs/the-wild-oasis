import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow.jsx";



function CreateCabinForm({cabinToEdit={}}) {

    const {id:editId,...editValues}=cabinToEdit;
    const isEditSession=Boolean(cabinToEdit);
    const  queryClient = useQueryClient();
    const {register,handleSubmit,reset,getValues,formState}=useForm(
        {
            defaultValues:isEditSession?editValues:{}
        }
    )
    const {errors}=formState
    
    const  {mutate:createCabin,isPending:isCreating} = useMutation({
        mutationFn:createEditCabin,
        onSuccess:()=>{
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({queryKey:['cabin'],})
            reset()
        },
        onError:(err)=>toast.error(err.message),
    });
    const  {mutate:editCabin,isPending:isEditing} = useMutation({
        mutationFn:({newCabinData,id})=>createEditCabin(newCabinData,id),
        onSuccess:()=>{
            toast.success("cabin successfully update");
            queryClient.invalidateQueries({queryKey:['cabin'],})
            reset()
        },
        onError:(err)=>toast.error(err.message),
    });
    const isWorking=isEditing||isCreating
    const onSubmit = (values)=>{
        // console.log(values.image)
        // console.log({...values,image:values.image[0]})
        const image=typeof (values.image)==="string"?values.image:values.image[0];
        if(isEditSession){
            editCabin({newCabinData:{...values,image},id:editId});
        }else {
            createCabin({...values,image},editId)
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
