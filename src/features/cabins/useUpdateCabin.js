import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin, deleteCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

const useUpdateCabin = ()=> {
    const queryClient = useQueryClient();
    const  {mutate:editCabin,isPending:isEditing} = useMutation({
        mutationFn:({newCabinData,id})=>createEditCabin(newCabinData,id),
        onSuccess:()=>{
            toast.success("cabin successfully update");
            queryClient.invalidateQueries({queryKey:['cabin'],})
        },
        onError:(err)=>toast.error(err.message),
    });
    return {editCabin,isEditing};
}

export default useUpdateCabin;