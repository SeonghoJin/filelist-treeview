import React, {useCallback, useEffect, useState} from "react";
import {FileListTree, FileListTreeType, FileType} from "~FileListTree";
import {ReactFileListTreeView} from "./ReactFileListTreeView";
import {ReactFileListTreeViewItem} from "./ReactFileListTreeViewItem";
import {isFileType} from "../util";
import {TreeViewPropsBase} from "@mui/lab/TreeView/TreeView";

type ReactFileListTreeProps = {
    fileListTree : FileListTree
    onClick?: (fileType: FileType) => void;
    baseStyle? : TreeViewPropsBase;
}

export const ReactFileListTree = ({fileListTree, onClick, baseStyle} : ReactFileListTreeProps) => {

    const [fileListTreeObj, setFileListTreeObj] = useState<null | FileListTreeType>(null);

    useEffect(() => {
        setFileListTreeObj(fileListTree.getFileListTree());
    }, [fileListTree]);

    const makeReactComponent = useCallback((fileListTreeObj: FileListTreeType, nodeIndex = [1]) => {
        const componentArray = [];

        for(const pathName in fileListTreeObj){

            const value = fileListTreeObj[pathName];

            if(isFileType(value)){
                const key = nodeIndex[0]++;
                componentArray.push(<ReactFileListTreeViewItem
                    item={value}
                    label={value.fileName}
                    nodeId={key}
                    key={key}
                    onClick={onClick}
                />);
            } else {
                const key = nodeIndex[0]++
                componentArray.push(
                    <ReactFileListTreeViewItem label={pathName} nodeId={key} key={key}>
                        {makeReactComponent(value, nodeIndex)}
                    </ReactFileListTreeViewItem>
                )
            }
        }

        return componentArray;
    }, [])

    return <ReactFileListTreeView baseStyle={baseStyle}>
        {fileListTreeObj && makeReactComponent(fileListTreeObj)}
    </ReactFileListTreeView>;
}
