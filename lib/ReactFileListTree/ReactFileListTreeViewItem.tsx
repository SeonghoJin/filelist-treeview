import {TreeItem} from "@mui/lab";
import React from "react";
import {FileType} from "~FileListTree";

type Props = {
    nodeId: number;
    label: string;
    children?: any;
    onClick?: (fileType: FileType) => void;
    item?: FileType;
};
export const ReactFileListTreeViewItem = ({nodeId, label, children, onClick, item}: Props) => {
    return (
        <TreeItem nodeId={nodeId.toString()} label={label} onClick={() => {
            item && onClick?.(item);
        }}>
            {children}
        </TreeItem>
    );
};
