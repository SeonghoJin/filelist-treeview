import {isArray}from "@fxts/core";
import { FileType } from "~FileListTree";

export const isFile = (obj : any) : obj is File => {
    if(obj == null)return false;
    if(obj.webkitRelativePath == null)return false;
    return true;
}

export const isNotFile = (obj: any) : obj is unknown => {
    return !isFile(obj);
}

export const isFileArray = (obj: any) : obj is File[] => {
    if(obj == null)return false;
    if(!isArray(obj))return false;
    if(obj.filter(isNotFile).length > 0)return false;
    return true;
}

export const isFileList = (obj: any) : obj is FileList => {
    if(obj == null)return false;
    if(obj.item == null)return false;
    return true;
}

export const isFileType = (obj: any) : obj is FileType => {
    if(obj == null)return false;
    if(obj.fileName == null)return false;
    if(obj.path == null)return false;
    return true;
}

export const isNotFileType = (obj: any) : obj is FileType => {
    return !isFileType(obj);
}

export const isFileTypeArray = (obj: any) : obj is FileType[] => {
    if(obj == null)return false;
    if(!isArray(obj))return false;
    if(obj.filter(isNotFileType).length > 0)return false;
    return true;
}
