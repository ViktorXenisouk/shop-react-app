type FilterData = {
    name:string;
    type:'horizontal'|'vertical';
    options:{title:string,value:string}[]
}

const FILTER_DATA:FilterData[] = [
    {
        name:'quality',
        type:'vertical',
        options:[
            {title:'good',value:'good'},
            {title:'nice',value:'nice'},
            {title:'bad',value:'bad'},
            {title:'aa',value:'aa'},
        ]
    },
    {
        name:'quality',
        type:'horizontal',
        options:[
            {title:'good',value:'good'},
            {title:'nice',value:'nice'},
            {title:'bad',value:'bad'},
            {title:'aa',value:'aa'},
        ]
    },
    {
        name:'quality',
        type:'vertical',
        options:[
            {title:'good',value:'good'},
            {title:'nice',value:'nice'},
            {title:'bad',value:'bad'},
            {title:'aa',value:'aa'},
        ]
    },
]

export {FILTER_DATA}

const getFilterDataByCategory = async() => {
    return FILTER_DATA
}

export type {FilterData,getFilterDataByCategory}