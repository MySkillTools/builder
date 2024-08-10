import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const SelectedSkills = () => {
  // Sample skills data
  const initialSkills = [
    { id: 'skill-1', name: 'JavaScript' },
    { id: 'skill-2', name: 'React' },
    { id: 'skill-3', name: 'Node.js' }
  ];

  // State to hold the skills
  const [skills, setSkills] = useState(initialSkills);

  // Function to handle reorder
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // Handling the end of the dragging
  const onDragEnd = (result) => {
    // If dropped outside the list
    if (!result.destination) {
      return;
    }

    const newSkills = reorder(
      skills,
      result.source.index,
      result.destination.index
    );

    setSkills(newSkills);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppableSkills">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ backgroundColor: '#f4f4f4', padding: '20px', width: '250px' }}
          >
            {skills.map((skill, index) => (
              <Draggable key={skill.id} draggableId={skill.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      userSelect: 'none',
                      padding: '10px',
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
    </DragDropContext>
  );
};

export default SelectedSkills;
