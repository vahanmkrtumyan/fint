import { ChangeEvent, useState } from 'react'
import { addTransactions } from '../api/transactions'
import { Button } from '../button/button'
import { FileInput, FileInputWrapper } from './file-upload.style'

function FileUpload({ showSuccessToast, showErrorToast }) {
  const [file, setFile] = useState<File>()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUploadClick = async () => {
    if (!file) {
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await addTransactions(formData)
      showSuccessToast(response.data)
    } catch (e) {
      showErrorToast(e.message)
    }
  }

  return (
    <FileInputWrapper>
      <FileInput type="file" id="file" accept="application/JSON" title="" onChange={handleFileChange} />
      <label htmlFor="file">Choose a file</label>
      <div>{file && `${file.name} - ${file.type}`}</div>
      <Button onClick={handleUploadClick} size="sm">
        Upload
      </Button>
    </FileInputWrapper>
  )
}

export default FileUpload
