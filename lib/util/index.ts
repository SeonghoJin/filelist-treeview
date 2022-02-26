export const isFile = (obj : any) : obj is File => {
    if(obj == null)return false;
    if(obj instanceof File)return true;
    return false;
}
