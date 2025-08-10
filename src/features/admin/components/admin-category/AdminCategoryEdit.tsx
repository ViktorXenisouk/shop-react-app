import { useParams } from 'react-router-dom';
import { useAdminAuthStore } from '../../../../store/useAdmin';
import { editCategory } from './api';
import { DataLoaderFromPromise } from '../../../loading/Loading';
import { safeFetch } from '../../../../services/safe-fetch';
import { Catalog, Filter, CategoryProps, Variant } from '../../../../types/catalog';
import { Body } from './types';
import CategoryUpdateOrCreateForm from './components/CategoryUpdateOrCreateForm';


const A = ({ data }: { data: Catalog }) => {
    const store = useAdminAuthStore()
   
    const submitHandler = async (body : Body) => {
        await editCategory(body, data._id, store.token);
    }

    return (
        <CategoryUpdateOrCreateForm data={data} onSubmit={submitHandler}/>
    )
}

const AdminCategoryEdit = () => {
    const store = useAdminAuthStore()

    const params = useParams()

    const id = params.id as string

    const options: RequestInit = {}
    options.method = "GET"
    options.headers = {
        'Authorization': `Bearer ${store.token}`,
    }
    const res = safeFetch<Catalog>(`/category/${id}`, options)

    return (
        <DataLoaderFromPromise res={res} page={A} />
    )
}

export default AdminCategoryEdit