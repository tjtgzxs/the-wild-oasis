import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCabin as deleteCabinApi} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export default function useDeleteCabin() {
    const queryClient = useQueryClient();
    const {isPending:isDeleting,mutate:deleteCabin}= useMutation({
        mutationFn:(id)=>deleteCabinApi(id),
        onSuccess:()=>{
            toast.success("Cabins deleted successfully.");
            queryClient.invalidateQueries({
                queryKey:['cabin'],
            })
        },
        onError:(err)=>toast.error(err.message),
    })
    return {isDeleting,deleteCabin};
}
