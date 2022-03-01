import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
import {ReactFileListTree, FileListTree, FileType, isFileList} from "filelist-treeview/dist/esm/index";

function App() {
  const [fileArray, setFileArray] = useState<File[]>([]);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [fileTypeArray, setFileTypeArray] = useState<FileType[]>([]);
  const onChangeFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ?? [];
    setFileArray((fileList) => fileList.concat(Array.from(files)));

    if(isFileList(files)){
        setFileList(files)
    }

    setFileTypeArray((prev) => {
        return Array.from(files).map((file) => {
            return {
                fileName: file.name,
                path: file.webkitRelativePath,
                data: file.name
            }
        })
    });

  }, []);

  const fileListTree = useMemo(() => {
      return new FileListTree(fileArray);
  }, [fileArray]);

  const fileListTree2 = useMemo(() => {
      if(fileList !== null){
          return new FileListTree(fileList)
      }
      return null;
  }, [fileList]);

  const fileListTree3 = useMemo(() => {
      return new FileListTree(fileTypeArray);
  }, [fileTypeArray])

  return (
      <div>
          <div>
              <ReactFileListTree
                  onClick={(file) => {
                      console.log(file);
                  }}
                  fileListTree={fileListTree}
              />
              {fileListTree2 && <ReactFileListTree
                  onClick={(file) => {
                      console.log(file);
                  }}
                  fileListTree={fileListTree2}
              />}
              <ReactFileListTree
                  baseStyle={{
                      sx: {
                          width: 500,
                      }
                  }}
                  onClick={(file) => {
                      console.log(file);
                  }}
                  fileListTree={fileListTree3}
              />
          </div>
        <input
            {...{
                directory : "",
                webkitdirectory: "",
            }}
               type="file"
               accept={".zip,.tar"}
               onChange={onChangeFile}
        />
        <input type="file"
               onChange={onChangeFile}
        />
      </div>
  );
}

export default App;
