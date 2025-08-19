import { TopItem } from "../../types/top-item"

// not real API

const getTopProducts = () : (TopItem & {id:string})[] => {
const mac = {
        title: 'mac',
        type: 'product',
        category: '',
        url: '/products/688374af23f715bf779f1eb5',
        id:'688374af23f715bf779f1eb5',
        imageUrl: 'https://res.cloudinary.com/djdxksokm/image/upload/v1753359255/my-pet-project/whooqmb8vkdtsw7dqxrh.png',
        shortDescription: 'some good short discription ............',
        priority: 0,
    }
    return Array(15).fill(mac)
}

const getTopCategories = () : TopItem[] => {
 const computers = {
        title: 'computer',
        type: 'category',
        category: '',
        url: '/products/computers/notebook',
        imageUrl: 'https://res.cloudinary.com/djdxksokm/image/upload/v1753359255/my-pet-project/whooqmb8vkdtsw7dqxrh.png',
        shortDescription: 'some good short discription ....',
        priority: 0,
    }

    return Array(15).fill(computers)
}

const getArticles = () : TopItem[] => {
 const computers = {
        title: 'computer',
        type: 'article',
        category: '',
        url: '/products/computers/notebook',
        imageUrl: 'https://res.cloudinary.com/djdxksokm/image/upload/v1753359255/my-pet-project/whooqmb8vkdtsw7dqxrh.png',
        shortDescription: 'some good short discription ....',
        priority: 0,
    }

    return Array(15).fill(computers)
}

export { getTopProducts,getTopCategories,getArticles}