type CatalogData = {
    name: string;
    path: string;
    parent?: CatalogData;
    catalogs?: CatalogData[];
}

const DEFAULT_CATALOG = [
    { name: 'default', path: 'notebook', subCatalog: [{ name: 'mac', path: 'mac' }] },
    { name: 'ddddd', path: 'pc', },
    { name: 'miniPC', path: 'minipc', },
    { name: 'gameing', path: 'gaming', },
]

const CATALOG_DATA: CatalogData[] = [
    {
        name: 'computers',
        path: 'computers',
        catalogs: [
            {
                name: 'notebook', path: 'notebook', catalogs:
                    [{ name: 'mac', path: 'mac' },
                    { name: 'mac', path: 'mac' },
                    { name: 'mac', path: 'mac' },
                    { name: 'mac', path: 'mac' },
                    { name: 'mac', path: 'mac' }
                    ]
            },
            { name: 'pc', path: 'pc', },
            { name: 'miniPC', path: 'minipc', },
            { name: 'gameing', path: 'gaming', },
        ]
    },
    {
        name: 'mobile',
        path: 'mobile',
        catalogs: [
            { name: 'iphone', path: 'iphone', catalogs: [{ name: 'mac', path: 'mac' }] },
            { name: 'samsung', path: 'samsung', },
            { name: 'xiaomi', path: 'xiaomi', },
            { name: 'gameing', path: 'gaming', },
        ]
    },
    {
        name: 'console',
        path: 'console',
        catalogs: [
            { name: 'ps4', path: 'ps4', catalogs: [{ name: 'mac', path: 'mac' }] },
            { name: 'xbox', path: 'xbox', },
            { name: 'nintendo', path: 'nintendo', },
            { name: 'retro', path: 'retro', },
        ]
    },
]

const dataInitilization = () => {
    for (let i = 0; i < CATALOG_DATA.length; i++) {
        transformCatalog(CATALOG_DATA[i], '')
    }
}

const transformCatalog = (currentCatalog: CatalogData, path: string) => {
    if(path==''){
        path = '/' + path + currentCatalog.path;
    }
    else{
        path = path + '-' + currentCatalog.path;
    }
    currentCatalog.path = path

    if (currentCatalog.catalogs) {
        const emptyArray: CatalogData[] = []
        for (let i = 0; i < currentCatalog.catalogs.length; i++) {
            emptyArray.push(transformCatalog(currentCatalog.catalogs[i], path))
        }
        currentCatalog.catalogs = emptyArray
    }

    return currentCatalog
}

dataInitilization()

export { CATALOG_DATA, DEFAULT_CATALOG, type CatalogData }