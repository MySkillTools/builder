import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './SkillSelector.scss';
import { skills } from './skillsData';  // Import the skills array

// Component to handle the rendering of individual skills
function Skill({ skill, onAddSkill, isSelected }) {
  return (
    <button
      key={skill.id}
      onClick={() => onAddSkill(skill)}
      className="skill"
      disabled={isSelected}
    >
      {skill.name}
    </button>
  );
}

// Component to handle each group of selected skills
function SkillGroup({ group, index, onRemoveGroup }) {
  return (
    <Droppable droppableId={String(index)}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`droppable-area ${snapshot.isDraggingOver ? 'is-dragging-over' : ''}`}
        >
          <div className="group-header d-flex justify-content-between">
            <h5 className='fw-bold'>{group.name} (count:&nbsp;{group.items.length})</h5>
            <button onClick={() => onRemoveGroup(index)} className="btn btn-outline-danger btn-sm">
              <i className="fa-solid fa-minus"></i>&nbsp;Remove
            </button>
          </div>
          <div className="cell">
            {group.items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="skill"
                  >
                    {item.name}
                  </div>
                )}
              </Draggable>
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

function SkillSelector() {
  // State to store all skills available
  //const [skills, setSkills] = useState([
  //  { id: 'skill1', name: 'HTML' }, { id: 'skill2', name: 'CSS' },
    // Add all other skills here...
 //   { id: 'skill50', name: 'SEO' },
  //]);
  const [skillsState, setSkillsState] = useState(skills);

  // State to track selected skills
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSkillIds, setSelectedSkillIds] = useState(new Set()); // Set to track selected skill IDs

  // State to manage groups of skills
  const [groups, setGroups] = useState([]);
  const [activeGroupIndex, setActiveGroupIndex] = useState(null);

  // Function to handle the end of a drag operation
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // Reorder within the same group
      const items = reorder(groups[source.droppableId].items, source.index, destination.index);
      const newGroups = [...groups];
      newGroups[source.droppableId].items = items;
      setGroups(newGroups);
    } else {
      // Move between different groups
      const result = move(groups[source.droppableId].items, groups[destination.droppableId].items, source.index, destination.index);
      const newGroups = [...groups];
      newGroups[source.droppableId].items = result.source;
      newGroups[destination.droppableId].items = result.destination;
      setGroups(newGroups);
    }
  };

  // Utility function to reorder skills within a group
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // Utility function to move skills between groups
  const move = (source, destination, droppableSourceIndex, droppableDestinationIndex) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSourceIndex, 1);
    destClone.splice(droppableDestinationIndex, 0, removed);

    return {
      source: sourceClone,
      destination: destClone,
    };
  };

  // Function to handle adding a new group
  const addGroup = () => {
    const newGroup = { id: `group-${groups.length}`, name: `Group ${groups.length + 1}`, items: [] };
    setGroups([...groups, newGroup]);
    setActiveGroupIndex(groups.length);
  };

  // Function to handle adding a skill to a group or selected list
  const handleAddSkill = (skill) => {
    setSelectedSkillIds(new Set(selectedSkillIds.add(skill.id)));
    if (activeGroupIndex !== null) {
      const newGroups = [...groups];
      newGroups[activeGroupIndex].items.push(skill);
      setGroups(newGroups);
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Function to handle removing a group
  const removeGroup = (index) => {
    const newGroups = [...groups];
    const removedGroup = newGroups.splice(index, 1)[0];
    setGroups(newGroups);
    const newSelectedSkillIds = new Set(selectedSkillIds);
    removedGroup.items.forEach(skill => newSelectedSkillIds.delete(skill.id));
    setSelectedSkillIds(newSelectedSkillIds);
    if (activeGroupIndex === index) {
      setActiveGroupIndex(null);
    }
  };

  return (
    <div className="skills-container container-fluid">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row">
          <div className="col-md-6">
            <div className="card my-3">
              <div className="card-body">
                <h4 className="card-title fw-bold mb-3">My Skill Bank</h4>
                <div className="cell">
                  {skills.map(skill => (
                    <Skill
                      key={skill.id}
                      skill={skill}
                      onAddSkill={handleAddSkill}
                      isSelected={selectedSkillIds.has(skill.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card my-3">
              <div className="card-body">
                <div className='d-flex justify-content-between'>
                  <h4 className="card-title fw-bold mb-3">Selected Skills</h4>
                  <button type='button' className='btn btn-outline-primary' onClick={addGroup}>
                    <i className="fa-solid fa-plus"></i>&nbsp;Add Group
                  </button>
                </div>
                {groups.map((group, index) => (
                  <SkillGroup group={group} index={index} onRemoveGroup={removeGroup} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default SkillSelector;
