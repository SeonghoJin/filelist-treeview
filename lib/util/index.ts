export const isFile = (obj : any) : obj is File => {
    if(obj == null)return false;
    if(obj.webkitRelativePath == null)return false;
    return true;
}
