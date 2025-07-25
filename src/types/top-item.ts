
type TopItem = {
    title: string,
    type: 'product' | 'category' | 'article',
    url: string,
    category: string,
    imageUrl: string,
    shortDescription: string,
    priority: number,
}

const getItems = () => {
    const mac: TopItem & {id:string} = {
        title: 'mac',
        type: 'product',
        category: '',
        url: '/products/computers/notebook',
        id:'6858146d17dd6b4a8d0726eb',
        imageUrl: 'https://res.cloudinary.com/djdxksokm/image/upload/v1753359255/my-pet-project/whooqmb8vkdtsw7dqxrh.png',
        shortDescription: 'some good fefjj',
        priority: 0,
    }
    return Array(15).fill(mac)

}

const getCategories = () => {
    const computers: TopItem = {
        title: 'computer',
        type: 'category',
        category: '',
        url: '/products/computers/notebook',
        imageUrl: 'https://res.cloudinary.com/djdxksokm/image/upload/v1753359255/my-pet-project/whooqmb8vkdtsw7dqxrh.png',
        shortDescription: 'some good fefjj',
        priority: 0,
    }

    return Array(15).fill(computers)
}

const getArticles = () => {
    const computers: TopItem = {
        title: 'computer',
        type: 'article',
        category: '',
        url: '/products/computers/notebook',
        imageUrl: 'https://res.cloudinary.com/djdxksokm/image/upload/v1753359255/my-pet-project/whooqmb8vkdtsw7dqxrh.png',
        shortDescription: 'some good fefjj',
        priority: 0,
    }

    return [computers,computers,computers,computers,computers]
}

export { type TopItem, getCategories,getItems,getArticles}