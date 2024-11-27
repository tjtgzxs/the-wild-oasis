import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {updateSetting as apiUpdateSetting} from "../../services/apiSettings.js";

const useUpdateSetting = () => {
    const queryClient = useQueryClient();
    const{data,mutate:updateSetting,error,isPending} = useMutation({
        mutationFn:({newSetting})=>apiUpdateSetting(newSetting),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['settings']})
            toast.success("Cabin successfully updated");
        },
        onError:(err)=>toast.error(err.message),
    })
    return {data,updateSetting,error,isPending}
}
export default useUpdateSetting