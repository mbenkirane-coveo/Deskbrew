import React from 'react'
import { useDrag } from 'react-dnd'

export const PackageCard = ({ id, name, script }) => {
    const [{ isDragging }, dragRef] = useDrag({
         type: 'package',
         item: { id, name, script},
         collect: (monitor) => ({
            isDragging: monitor.isDragging()
         })
    })
    return (
        <div className='package-card' ref={dragRef}>
            {name}
            {isDragging && '😱'}
        </div>
    )
}