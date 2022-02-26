import {groupBy} from "@fxts/core";
import {isFileArray, isFileList, isFileTypeArray} from "./util";

export type FileType<T = unknown> = {
    fileName: string,
    path: string,
    data?: T,
}

export type FileListTreeItem = {
    file: FileType,
    path: string[]
}

export type FileListTreeType = {
    [key: string] : FileType | FileListTreeType
};

export class FileListTree {

    fileListTree : FileListTreeType;

    constructor(fileList: File[] | FileList | FileType[]) {
        let fileListTreeItem : null | FileListTreeItem[] = null;

        if(isFileList(fileList)){
            fileListTreeItem = this.fileListToFileListTreeItem(fileList);
        }

        if(isFileArray(fileList)){
            fileListTreeItem = this.fileArrayToFileListTreeItem(fileList);
        }

        if(isFileTypeArray(fileList)){
            fileListTreeItem = this.fileTypeArrayToFileListTreeItem(fileList);
        }

        if(fileListTreeItem === null){
            throw new Error('not support type');
        }

        this.fileListTree = this.toFileListTree(fileListTreeItem);
    }

    public getFileListTree = () => {
        return this.fileListTree;
    }

    private fileTypeArrayToFileListTreeItem = (fileTypeArray: FileType[]) : FileListTreeItem[] => {
        return fileTypeArray.map((fileType: FileType) => {
            const path = this.getPath(fileType);
            return {
                path : path.split('/'),
                file: fileType,
            }
        })
    }

    private fileListToFileListTreeItem = (fileList: FileList) : FileListTreeItem[] => {
        return Array.from(fileList).map((file: File) => {
            const path = this.getPath({fileName: file.name, path: file.webkitRelativePath});
            return {file : {
                    fileName: file.name,
                    path: file.webkitRelativePath,
                    data: file
                },
                path : path.split('/')}
        })
    }

    private fileArrayToFileListTreeItem = (fileList: File[]) : FileListTreeItem[] => {
        return fileList.map((file: File) => {
            const path = this.getPath({fileName: file.name, path: file.webkitRelativePath});
            return {file : {
                            fileName: file.name,
                            path: file.webkitRelativePath,
                            data: file
                        },
                path : path.split('/')}
        })
    }

    private getPath = (file: FileType) => {
        return file.path === '' ? file.fileName: file.path;
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
