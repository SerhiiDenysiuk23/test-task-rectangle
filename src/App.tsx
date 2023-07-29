import React, { useEffect, useState } from 'react'
import { Description } from './components/Description'

function App () {
  const [position, setPosition] = useState<React.CSSProperties>({})
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const elemRef = React.useRef<HTMLDivElement | null>(null)

  const Moving = (e: MouseEvent) => {
    if (!isMouseDown) { return }

    const container = containerRef.current?.getBoundingClientRect()
    const elem = elemRef.current?.getBoundingClientRect()
    if ((container == null) || (elem == null)) { return }

    const bottomLimit = container.height - elem.height / 2
    const rightLimit = container.width - elem.width / 2
    setPosition({
      top: Math.min(Math.max(e.clientY - container.top, elem.height / 2), bottomLimit),
      left: Math.min(Math.max(e.clientX - container.left, elem.width / 2), rightLimit)
    })
  }

  useEffect(() => {
    if (isMouseDown) {
      window.addEventListener('mousemove', Moving)
    }
    return () => { window.removeEventListener('mousemove', Moving) }
  }, [isMouseDown])

  const handleMouseDown = () => {
    setIsMouseDown(true)
  }
  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  return (
    <div className="App">
      <Description />
      <div ref={containerRef} className="container">
        B
        <div
          ref={elemRef}
          style={position}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="target"
        >
          A
        </div>
      </div>
    </div>
  )
}

export default App
