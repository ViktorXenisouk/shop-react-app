import { Filter, FilterItem } from "../../../../types/catalog"

const FilterItemToFilter = (filterItems: FilterItem[]) => {
    const filter: Filter = {}
    filterItems.forEach((item) => {
        filter[item.title] = { variant: item.variant, props: item.props }
    })
    return filter
}

const FilterToFilterItems = (filter: Filter) => {
    const filters: FilterItem[] = []

    for (let field in filter) {
        filters.push({ title: field, props: filter[field].props, variant: filter[field].variant })
    }
    return filters
}

export {FilterItemToFilter,FilterToFilterItems}