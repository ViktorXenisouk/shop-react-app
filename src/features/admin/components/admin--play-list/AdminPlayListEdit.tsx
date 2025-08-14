import React from "react";
import { PlayList } from "../../../../types/play-list";
import { autoSaveFetch } from "../../../../services/safe-fetch";
import { useParams } from "react-router-dom";
import AdminPlayListCreateOrUpdateForm from "./components/AdminPlayListCreateOrUpdateForm"
import { Body } from "./types";
import { useAdminAuthStore } from "../../../../store/useAdmin";
import { DataLoaderFromPromise } from "../../../loading/Loading";
import { editPlayList } from "./api";

const Render : React.FC<{ data: PlayList }> = ({ data }) => {
    const store = useAdminAuthStore()

    console.log(data)
   
    const submitHandler = async (body : Body) => {
        await editPlayList(store.token??'',data.path,body);
    }

    return (
        <AdminPlayListCreateOrUpdateForm data={data} onSubmit={submitHandler}/>
    )
}

const AdminPlayListEdit = () => {

    const params = useParams()

    const id = params.id as string

    const res = autoSaveFetch<PlayList>(`/play-list/${id}`, {method:'GET'})

    return (
        <DataLoaderFromPromise res={res} page={Render} />
    )
}

export default AdminPlayListEdit