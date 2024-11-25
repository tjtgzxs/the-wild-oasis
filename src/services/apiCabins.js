import supabase, {supabaseUrl} from "./supabase.js";
export const createEditCabin = async (newCabin,id) => {
    const hasImagePath=newCabin.image?.startsWith?.(supabaseUrl)
    const imageName=`${Math.random()}-${newCabin.image.name}`.replace("/","");
    const imagePath=hasImagePath?newCabin.image:`${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    //1.create Cabin
    let query= supabase
        .from('cabins')
    if (!id){
        query=query .insert([
            {...newCabin,image:imagePath},
        ])
    }
    if (id){
        query=query.update({...newCabin,image:imagePath})
            .eq('id', id)
    }
    const { data, error } = await query.select().single()
    if (error){
        console.log(error);
        throw new Error("Cabin not be inserted")
    }
    //2.upload image
    const { fileData, fileError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image);
    if (fileError) {
        // Handle error
        console.log(fileError);
        await deleteCabin(data.id)
        throw new Error("Cabin image not be uploaded")
    }
    return {...data,uploadData:fileData};
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
