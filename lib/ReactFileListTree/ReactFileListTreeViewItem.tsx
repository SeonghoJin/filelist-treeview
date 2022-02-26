import {TreeItem} from "@mui/lab";
import React from "react";

type Props = {
    nodeId: number;
    label: string;
    children?: any;
};
export const ReactFileListTreeViewItem = ({nodeId, label, children}: Props) => {
    return (
        <TreeItem nodeId={nodeId.toString()} label={label}>
            {children}
        </TreeItem>
    );
};
