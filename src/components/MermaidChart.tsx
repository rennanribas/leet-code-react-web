import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

const MermaidChart: React.FC<{ chart: string }> = ({ chart }) => {
  const chartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      mermaid.contentLoaded()
    }
  }, [chart])

  return (
    <div className='mermaid' ref={chartRef}>
      {chart}
    </div>
  )
}

export default MermaidChart
