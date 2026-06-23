One-line: dashed file dropzone with a cloud icon, prompt copy, and a Select File button.

```jsx
<FileUpload label="Supporting documents" onSelect={openPicker} />
<FileUpload state="dragover" />
```
States: default, hover, dragover, error, success (pass `state` to force).
