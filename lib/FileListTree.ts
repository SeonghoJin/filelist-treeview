import {groupBy} from "@fxts/core";

interface FileListTreeItem {
    file: File,
    path: string[]
}

type FileListTreeType = {
    [key: string] : File | FileListTreeType
};

export class FileListTree {

    fileListTree : FileListTreeType;

    constructor(fileList: File[]) {
        const fileListTreeItem = this.splitFileList(fileList);
        this.fileListTree = this.toFileListTree(fileListTreeItem);
    }

    public getFileListTree = () => {
        return this.fileListTree;
    }

    private splitFileList = (fileList: File[]) : FileListTreeItem[] => {
        return fileList.map((file: File) => {
            const path = this.getPath(file);
            return {file, path : path.split('/')}
        })
    }

    private getPath = (file: File) => {
        return file.webkitRelativePath === '' ? file.name : file.webkitRelativePath;
    }

    private toFileListTree = (fileListTreeItems: FileListTreeItem[]) : FileListTreeType => {
        let {folder, file} = groupBy((fileListTreeItem: FileListTreeItem) => {
            return fileListTreeItem.path.length > 1 ? 'folder' : 'file';
        }, fileListTreeItems);
        folder = folder ?? [];
        file = file ?? [];
        const groupedItems = groupBy((fileListTreeItem: FileListTreeItem) => {
            const shiftedItem = fileListTreeItem.path.shift();
            if(shiftedItem === undefined){
                throw new Error("can not shifted item");
            }
            return shiftedItem;
        }, folder);
        const items = {};
        const folderEntries = Object.entries(groupedItems);
        for(const [key, value] of folderEntries){
            items[key] = this.toFileListTree(value);
        }
        for(const item of file) {
            items[item.path[0]] = item.file;
        }
        return items;
    }
}
