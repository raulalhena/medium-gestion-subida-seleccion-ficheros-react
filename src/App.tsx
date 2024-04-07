import { useState } from "react";
import './App.css';

const App = () => {
  
  
  const [ file, setFile ] = useState<string | undefined>();
  const [ inputFile, setInputFile ] = useState<EventTarget | { target: HTMLInputElement; } | undefined>(undefined);
  const [ uploadedFiles, setUploadFiles ] = useState<Array<string | undefined>>([]);
  const [ selectedFiles, setSelectedFiles ] = useState<Array<string | undefined>>([]);

  const handleUploadFiles = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if(typeof file === 'undefined') return;
    setUploadFiles(files => 
      [
        ...files,
        file
      ]
    );
    setFile(undefined);
    (inputFile as HTMLInputElement).value = '';
  }

  const handleDeleteFiles = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setUploadFiles(uploadedFiles.filter(file => !selectedFiles.includes(file)));
    setSelectedFiles([]);
    return;
  }

  const handleSelectFiles = (e: React.SyntheticEvent) => {
    if(selectedFiles.includes(e.currentTarget.id)){
        const id = e.currentTarget.id;
        setSelectedFiles(selectedFiles => {
          return selectedFiles.filter(file => file !== id)
        });
        return;
    }
    setSelectedFiles([
      ...selectedFiles,
      e.currentTarget.id
    ]);
  }

  const handleInputFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { files: FileList };
    if(target.files[0] !== undefined) setFile(target.files[0].name);
    setInputFile(e.currentTarget);
  }

  return (
    <div className="main">
        <h2>Uploaded Files</h2>
        <div className="uploaded-files">
          { uploadedFiles &&
            uploadedFiles.map((file, index) => (
              <div key={index} onClick={handleSelectFiles} className={selectedFiles.includes(file) ? "selected-file" : "uploaded-file"} id={file}>{file}</div>
            ))
          }
       </div>
       <input type="file" name="doc" onChange={handleInputFileChange} />
       <div className="form-buttons">
         <button onClick={handleUploadFiles}>Upload files</button>
         <button onClick={handleDeleteFiles}>Delete files</button>
       </div> 
    </div> 
  )
}

export default App;
