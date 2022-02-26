import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
import {ReactFileListTree, FileListTree} from "filelist-treeview/dist/esm/index";

function App() {
  const [fileList, setFileList] = useState<File[]>([]);
  const onChangeFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ?? [];
    setFileList((fileList) => fileList.concat(Array.from(files)));
  }, []);

  const elements = useMemo(() => {
      return new ReactFileListTree(new FileListTree(fileList)).getComponent();
  }, [fileList]);

  return (
      <div>
          <div>
              {elements}
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
