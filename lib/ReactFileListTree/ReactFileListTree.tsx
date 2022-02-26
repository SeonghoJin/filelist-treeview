import React from "react";
import {FileListTree, FileListTreeType} from "~FileListTree";
import {ReactFileListTreeView} from "./ReactFileListTreeView";
import {ReactFileListTreeViewItem} from "./ReactFileListTreeViewItem";
import {isFile} from "../util";

export class ReactFileListTree {

    private fileListTreeObj : FileListTreeType

    constructor(fileListTree: FileListTree) {
        this.fileListTreeObj = fileListTree.getFileListTree();
    }

    private makeReactComponent = (fileListTreeObj: FileListTreeType, nodeIndex = [1] ) => {

        const componentArray = [];

        for(const pathName in fileListTreeObj){

            const value = fileListTreeObj[pathName];
            if(isFile(value)){
                componentArray.push(<ReactFileListTreeViewItem label={value.name} nodeId={nodeIndex[0]++}/>);
            } else {
                componentArray.push(
                    <ReactFileListTreeViewItem label={pathName} nodeId={nodeIndex[0]++}>
                        {this.makeReactComponent(value, nodeIndex)}
                    </ReactFileListTreeViewItem>
                )
            }
        }

        return componentArray;
    }

    public getComponent = () => {
        return (<ReactFileListTreeView>
            {this.makeReactComponent(this.fileListTreeObj)}
        </ReactFileListTreeView>)
    }

}
