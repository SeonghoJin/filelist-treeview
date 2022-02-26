import {TreeView} from "@mui/lab";
import React from "react";
import {ExpandMore, ChevronRight} from "@mui/icons-material"

type Props = {
    children?: any
};

export const ReactFileListTreeView = ({children}: Props) => {
    return <TreeView
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        defaultCollapseIcon={<ExpandMore/>}
        defaultExpandIcon={<ChevronRight/>}
    >
        {children}
    </TreeView>
};
