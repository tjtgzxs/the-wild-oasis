import {useQuery} from "@tanstack/react-query";
import {getSettings} from "../../services/apiSettings.js";
import cabins from "../../pages/Cabins.jsx";

const useSettings=()=>{
    const {isLoading,data:settings,error}=useQuery({
        queryKey:['settings'],
        queryFn:getSettings
    })
    return {isLoading,settings,error}
}

export default useSettings