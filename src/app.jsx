import { useState } from 'react'
import DesignUpload from './components/DesignUpload'
import Visualizer from './components/Visualizer'

export default function App() {
  const [buildingImage, setBuildingImage] = useState(null)
  const [designs, setDesigns] = useState([])

  return (
    <div className="app">
      <header>
        <img src="/ET.jpg" alt="ERAM TECH" className="logo" />
      </header>
      
      <DesignUpload onAddDesign={setDesigns} />
      <Visualizer 
        buildingImage={buildingImage} 
        designs={designs} 
      />
    </div>
  )
}