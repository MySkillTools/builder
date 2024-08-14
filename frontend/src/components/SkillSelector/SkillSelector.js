import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import AlertMessage from '../AlertMessage/AlertMessage';

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
    //const [skillsState, setSkillsState] = useState(skills);

    // State to track selected skills
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedSkillIds, setSelectedSkillIds] = useState(new Set()); // Set to track selected skill IDs

    // State to manage groups of skills
    // groups is an array of skill objects
    const [groups, setGroups] = useState([]);
    const [activeGroupIndex, setActiveGroupIndex] = useState(null);

    const [alert, setAlert] = useState(null);

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
        // Add the skill ID to the set of selected skill IDs
        // setSelectedSkillIds(new Set(selectedSkillIds.add(skill.id)));

        //console.log(activeGroupIndex);
    
        // Check if at least one group is selected.
        if (activeGroupIndex !== null) {

            setSelectedSkillIds(new Set(selectedSkillIds.add(skill.id)));

            // Create a new array of groups to avoid mutating the existing state directly
            const newGroups = [...groups];
            
            // Add the skill to the items of the active group
            newGroups[activeGroupIndex].items.push(skill);
            
            // Update the state with the new groups array
            setGroups(newGroups);
        } 
        
        // Otherwise, display an alert box
        else {
            // If no active group, add the skill to the list of selected skills
            //setSelectedSkills([...selectedSkills, skill]);

            // TODO: USE MY ALER BOX
            //alert("Please select at least 1 group!");

            setAlert({
                type: 'warning',
                message: 'Please add at least 1 group!',
                timer: 2500 // Optional: Dismiss after 5 seconds
            });
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

        {alert && (
                <AlertMessage
                type={alert.type}
                message={alert.message}
                timer={alert.timer}
                onClose={() => setAlert(null)}
                />
            )}

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="row">

                    {/* My Skill Bank */}
                    <div className="col-md-6">
                        <div className="card">
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
                        <div className="card">
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
