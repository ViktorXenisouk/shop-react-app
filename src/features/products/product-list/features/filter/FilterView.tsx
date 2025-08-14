import React, { useMemo, Fragment } from "react"
import { Box, Stack, ButtonGroup, Button, Skeleton } from "@mui/material"
import FilterModal from "./UI/FilterModal"
import FilterList from "./UI/FilterList"
import FilterNumber from "./UI/FilterNumber"
import { FilterItem } from "../../../../../types/catalog";
import { MyFilter } from "./types";

type Props = {
    modalOnly?: boolean;
    tags: FilterItem[];
    filterParams: MyFilter;
    addOrRemoveField: (field: string, value: any) => void;
    addOrRemoveTag: (tag: string) => void;
    onResetClick: () => void;
    onSearchClick: () => void
}


const FilterView: React.FC<Props> = ({ tags, modalOnly, filterParams, addOrRemoveTag, addOrRemoveField, onResetClick, onSearchClick }) => {

    const array = useMemo(() => {
        if (tags.length <= 0) {
            return (
                <Skeleton variant="rectangular" width={190} height={42} />
            )
        }
        const t = tags.slice(0, 9)
        return t.map((item) =>
            item.variant === 'tags-vertical' || item.variant === 'tags-horizontal' ?
                <FilterList name={item.title} tags={item.props.tags} direction={item.variant === 'tags-horizontal' ? "row" : "column"} filterParams={filterParams} addOrRemoveTag={addOrRemoveTag} />
                :
                <FilterNumber id={item.title.replace(' ', '_')} props={item.props} title={item.title} filter={filterParams} addOrRemoveField={addOrRemoveField} />
        )

    }, [tags, filterParams, filterParams.tags])

    if (modalOnly)
        return (
            <Box>
                <FilterModal
                    addOrRemoveField={addOrRemoveField}
                    onReset={onResetClick}
                    onSearchClick={onSearchClick}
                    data={tags}
                    addOrRemoveTag={addOrRemoveTag}
                    filter={filterParams} />
            </Box>
        )

    return (
        <Fragment>
            <Box
                sx={{
                    minWidth: "112px",
                    dispaly: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'flex-start',
                    borderRightWidth: '1px',
                    borderRightStyle: 'solid',
                    borderRightColor: 'divider'
                }}>
                <Stack>
                    {array}
                    <FilterModal
                        addOrRemoveField={addOrRemoveField}
                        onReset={onResetClick}
                        onSearchClick={onSearchClick}
                        data={tags}
                        addOrRemoveTag={addOrRemoveTag}
                        filter={filterParams} />
                </Stack>
                <ButtonGroup sx={{ width: '100%' }}>
                    <Button sx={{ width: '50%' }} onClick={onSearchClick}>
                        Show
                    </Button>
                    <Button sx={{ width: '50%' }} onClick={onResetClick}>
                        Reset Filter
                    </Button>
                </ButtonGroup>
            </Box>
        </Fragment>
    )
}

export default FilterView