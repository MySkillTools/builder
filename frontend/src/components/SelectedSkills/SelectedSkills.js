import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialSkills = [
    [
      [{ id: 'skill-1', name: 'JavaScript' }, { id: 'skill-2', name: 'React' }],
      [{ id: 'skill-3', name: 'Node.js' }],
      [{ id: 'skill-4', name: 'Python' }],
    ],
    [
      [{ id: 'skill-5', name: 'Django' }],
      [{ id: 'skill-6', name: 'Flask' }, { id: 'skill-7', name: 'Ruby' }],
      [{ id: 'skill-8', name: 'Rails' }],
    ],
    [
      [{ id: 'skill-9', name: 'Java' }],
      [{ id: 'skill-10', name: 'Spring Boot' }],
      [{ id: 'skill-11', name: 'Angular' }],
    ]
];

const SelectedSkills = () => {
  const [skillsMatrix, setSkillsMatrix] = useState(initialSkills);

  const reorderSkills = (source, destination) => {
    const sourceIndices = source.droppableId.split('-').map(Number);
    const destIndices = destination.droppableId.split('-').map(Number);
    const current = [...skillsMatrix];
    const sourceClone = [...current[sourceIndices[0]][sourceIndices[1]]];
    const destClone = [...current[destIndices[0]][destIndices[1]]];
    const [removed] = sourceClone.splice(source.index, 1);

    if (source.droppableId !== destination.droppableId) {
      destClone.splice(destination.index, 0, removed);
      current[destIndices[0]][destIndices[1]] = destClone;
    }
    current[sourceIndices[0]][sourceIndices[1]] = sourceClone;
    
    return current;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newSkillsMatrix = reorderSkills(result.source, result.destination);
    setSkillsMatrix(newSkillsMatrix);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {skillsMatrix.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} style={{ display: 'flex', gap: '10px' }}>
            {row.map((cell, cellIndex) => (
              <Droppable droppableId={`${rowIndex}-${cellIndex}`} key={`cell-${rowIndex}-${cellIndex}`} direction="vertical">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ minWidth: '150px', minHeight: '50px', padding: '10px', backgroundColor: '#f4f4f4' }}
                  >
                    {cell.map((skill, index) => (
                      <Draggable key={skill.id} draggableId={skill.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: 'none',
                              padding: '5px',
                              margin: '0 0 8px 0',
                              backgroundColor: '#fff',
                              border: '1px solid #ccc',
                              ...provided.draggableProps.style
                            }}
                          >
                            {skill.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default SelectedSkills;
