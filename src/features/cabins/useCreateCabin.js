import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export default function useCreateCabin() {
    const queryClient=useQueryClient()
    const  {mutate:createCabin,isPending:isCreating} = useMutation({
        mutationFn:(newCabin)=>createEditCabin(newCabin),
        onSuccess:()=>{
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({queryKey:['cabin'],})

        },
        onError:(err)=>toast.error(err.message),
    });
    return {createCabin,isCreating};
}
