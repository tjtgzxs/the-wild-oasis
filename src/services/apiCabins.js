import supabase from "./supabase.js";
export const createCabin = async (newCabin) => {

    const { data, error } = await supabase
        .from('cabins')
        .insert([
            newCabin,
        ])
        .select()
    if (error){
        console.log(error);
        throw new Error("Cabin not be inserted")
    }
}

export const getCabins = async ()=>{
    const { data: cabins, error } = await supabase
        .from('cabins')
        .select('*');
    if (error) {
        console.log(error);
        throw new Error("Cabin could not be found.");
    }
    return cabins;
}

export const deleteCabin = async (id)=>{
    const { data,error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', Number(id))
    if (error) {
        console.log(error);
        throw new Error("Cabin could not be deleted.");
    }
    console.log(data)

    return data
}
