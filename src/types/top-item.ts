
type TopItem = {
    title: string,
    type: 'product' | 'category' | 'article',
    url: string,
    category: string,
    imageUrl: string,
    shortDescription: string,
    priority: number,
}


export type { TopItem }