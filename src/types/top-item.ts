
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
        imageUrl: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        shortDescription: 'some good fefjj',
        priority: 0,
    }
    return [
        mac,mac,mac,mac,mac
    ]
}

const getCategories = () => {
    const computers: TopItem = {
        title: 'computer',
        type: 'category',
        category: '',
        url: '/products/computers/notebook',
        imageUrl: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        shortDescription: 'some good fefjj',
        priority: 0,
    }

    return [computers,computers,computers,computers,computers]
}

const getArticles = () => {
    const computers: TopItem = {
        title: 'computer',
        type: 'article',
        category: '',
        url: '/products/computers/notebook',
        imageUrl: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        shortDescription: 'some good fefjj',
        priority: 0,
    }

    return [computers,computers,computers,computers,computers]
}

export { type TopItem, getCategories,getItems,getArticles}