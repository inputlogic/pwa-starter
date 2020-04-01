import { useState } from 'react'
import { useVariantState } from '@app-elements/use-variant-state'

import './file-upload.less'

const FileListType = x => x.toString().includes('FileList')

export const FileInput = ({
  accept = 'image/*',
  disabled,
  onChange,
  label
}) =>
  <label className={`file-input${disabled ? ' disabled' : ''}`}>
    {label}
    <input type='file' accept={accept} onChange={onChange} disabled={disabled} />
  </label>

/*
const onChange = (file) => {
  const { promise } = makeRequest({
    endpoint: 'files',
    method: 'post',
    data: {
      fileName: file.name,
      contentType: file.type
    }
  })
  promise
    .then(({ url, fileId, contentType, s3Data }) => {
      let formData = new window.FormData()
      for (const key in s3Data.fields) {
        formData.append(key, s3Data.fields[key])
      }
      formData.append('file', file)
      return makeExternalRequest(s3Data.url, { data: formData, method: 'POST' })
    })
    .catch()
}

function makeExternalRequest (url, opts = {}) {
  const { method, data: body } = opts
  return new Promise((resolve, reject) =>
    window.fetch(url, { method, body })
      .then(res => resolve(res))
      .catch(e => console.error(e) || reject(e))
  )
}
*/

export function FileUpload ({
  formName,
  name,
  accept,
  disabled,
  onChange,
  Initial: InitialComponent,
  Uploading: UploadingComponent,
  Uploaded: UploadedComponent,
  Failed: FailedComponent,
}) {
  const [files, setFiles] = useState()

  const {
    current,
    checkState,
    transitionTo,
    Uploading,
    Uploaded,
    Failed
  } = useVariantState({
    initial: 'Initial',
    states: {
      Initial: [],
      Uploading: [FileListType],
      Uploaded: [],
      Failed: [String]
    },
    transitions: {
      Initial: ['Uploading'],
      Uploading: ['Uploaded', 'Failed'],
      Failed: ['Initial']
    },
    effects: {
      Uploading: (fs) => {
        setFiles(fs)
        console.log('Uploading', { fs })
      },
      Uploaded: () => {
      },
      Failed: (reason) => {
      }
    }
  })

  const handleChange = event => transitionTo(Uploading(event.target.files))

  console.log({ current })

  if (checkState('Initial')) {
    const FileInputWrapper = ({ label }) =>
      <FileInput
        name={name}
        accept={accept}
        disabled={disabled}
        uploading={checkState(Uploading)}
        onChange={handleChange}
        label={label}
      />
    return <InitialComponent FileInput={FileInputWrapper} />
  } else if (checkState('Uploading') && files != null) {
    return <UploadingComponent files={files} />
  }
}
