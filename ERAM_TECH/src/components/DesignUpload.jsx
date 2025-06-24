import { useRef } from 'react'

export default function DesignUpload({ onAddDesign }) {
  const fileInputRef = useRef()

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        onAddDesign(prev => [...prev, event.target.result])
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="upload-section">
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        hidden
      />
      <button onClick={() => fileInputRef.current.click()}>
        Upload Custom Design
      </button>
    </div>
  )
}