import {groupBy} from "@fxts/core";

export interface FileListTreeItem {
    file: File,
    path: string[]
}

export type FileListTreeType = {
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

    private getFileAndFolder = (fileListTreeItems: FileListTreeItem[]) => {
        let {folder, file} = groupBy((fileListTreeItem: FileListTreeItem) => {
            return fileListTreeItem.path.length > 1 ? 'folder' : 'file';
        }, fileListTreeItems);
        folder = folder ?? [];
        file = file ?? [];
        return {folder, file};
    }

    private groupingFolder = (folder: FileListTreeItem[]) => {
        const grouped = groupBy((fileListTreeItem: FileListTreeItem) => {
            const shiftedItem = fileListTreeItem.path.shift();
            if(shiftedItem === undefined){
                throw new Error("can not shifted item");
            }
            return shiftedItem;
        }, folder);
        return grouped;
    }

    private mergeFileAndFolder = (folder: {[p: string] : FileListTreeItem[]}, file: FileListTreeItem[]) => {
        const items = {};
        const folderEntries = Object.entries(folder);
        for(const [key, value] of folderEntries){
            items[key] = this.toFileListTree(value);
        }
        for(const item of file) {
            items[item.path[0]] = item.file;
        }
        return items;
    }

    private toFileListTree = (fileListTreeItems: FileListTreeItem[]) : FileListTreeType => {
        const {folder, file} = this.getFileAndFolder(fileListTreeItems);
        const groupedFolder = this.groupingFolder(folder);
        return this.mergeFileAndFolder(groupedFolder, file);
    }
}
