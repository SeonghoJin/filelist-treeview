import {TreeView} from "@mui/lab";
import React from "react";
import {ExpandMore, ChevronRight} from "@mui/icons-material"
import {TreeViewProps, TreeViewPropsBase} from "@mui/lab/TreeView/TreeView";

type Props = {
    children?: any
    baseStyle? : TreeViewPropsBase;
} & TreeViewProps;

export const ReactFileListTreeView = ({children, baseStyle}: Props) => {
    return <TreeView
        {...baseStyle}
        defaultCollapseIcon={baseStyle?.defaultCollapseIcon ?? <ExpandMore/>}
        defaultExpandIcon={baseStyle?.defaultExpandIcon ?? <ChevronRight/>}
    >
        {children}
    </TreeView>
};
