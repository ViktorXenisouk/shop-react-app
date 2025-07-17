import { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { ViewList, ViewModule } from "@mui/icons-material"
import { ViewType } from "../types";

const ViewSwitcher = ({ onChange }: { onChange?: (value: ViewType) => void }) => {
    const [view, setView] = useState<'grid' | 'list'>('grid')

    const changeHandler = (_: any, val: ViewType) => {
        if(val){
            setView(val);
            onChange && onChange(val)
        }
    }

    return (
        <ToggleButtonGroup
            value={view}
            exclusive
            onChange={changeHandler}
            sx={{ mb: 2 }}
            size="small"
        >
            <ToggleButton value="list" aria-label="list view">
                <ViewList />
            </ToggleButton>
            <ToggleButton value="grid" aria-label="grid view">
                <ViewModule />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default ViewSwitcher