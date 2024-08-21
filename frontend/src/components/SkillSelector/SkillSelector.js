import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

import AlertMessage from '../AlertMessage/AlertMessage';

import './SkillSelector.scss';
//import { skills } from './skillsData';  // Import the skills array

import { useApiData } from '../../hooks/apiHooks';

// Component to handle the rendering of individual skills
function Skill({ skill, onAddSkill, isSelected, color }) {

    if(!color.startsWith('#')){
        color = '#' + color;
    }
    
    const style = {
        //backgroundColor: `${color}`, // Ensure the color starts with '#'
        color: `${color}`, 
        borderColor: `${color}`
    };

    // console.log(style)

    return (
        <button
            key={skill.id}
            onClick={() => onAddSkill(skill)}
            className="skill"
            disabled={isSelected}
            style={style}
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
                        <span className='fw-bold'>{group.name} {/* (count:&nbsp;{group.items.length}) */}</span>
                        <button onClick={() => onRemoveGroup(index)} className="btn btn-outline-secondary btn-sm">
                            <i className="fa-solid fa-minus"></i>&nbsp;Remove
                        </button>
                    </div>
                    <div className="cell">
                        {group.items.map((item, index) => (
                            <Draggable key={item.id} draggableId={String(item.id)} index={index}>
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

function SkillTrash() {
    return (
        <Droppable droppableId="bin" isDropDisabled={false}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`d-flex justify-content-center fw-bold drop-bin ${snapshot.isDraggingOver ? 'is-dragging-over' : ''}`}
                >
                    <div className='my-1'>
                        <i className='fa fa-trash'></i> &nbsp;Remove a skill
                    </div>

                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

// Functional component to render the table
const SkillTable = ({ data }) => {
    if (!Array.isArray(data)) {
        // Handle cases where data is not an array
        return <p>Error: Data should be an array.</p>;
    }
    
    return (
        <table border="1" cellPadding="10">
            <thead>
                <tr>
                    <th>Group ID</th>
                    <th>Group Name</th>
                    <th>Item Name</th>
                </tr>
            </thead>
            <tbody>
                {data.map(group => (
                    <React.Fragment key={group.id}>
                        {group.items.length > 0 ? (
                            <>
                                {group.items.map((item, index) => (
                                    <tr key={item.id}>
                                        {index === 0 && (
                                            <>
                                                <td rowSpan={group.items.length}>{group.id}</td>
                                                <td rowSpan={group.items.length}>{group.name}</td>
                                            </>
                                        )}
                                        <td>{item.name}</td>
                                    </tr>
                                ))}
                            </>
                        ) : (
                            <tr>
                                <td>{group.id}</td>
                                <td>{group.name}</td>
                                <td>No items</td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
};

function SkillSelector() {

    const { data : skills, loading, error } = useApiData('/skillList');
    //console.log("1111111111111");
    //console.log(skills);
    //console.log("Loading:", loading);
    //console.log(error)

    //if(skills) {
    //    console.log(skills.skills);
    //}

    // Transforming the array to a new format
    //const transformedSkills = skills.map(skill => ({
    //    skill_id: `skill${skill.id}`, // Prefixing id with 'skill'
    //    skill_name: skill.name,
    //    skill_category: skill.category
    //}));

    //console.log(transformedSkills);
    

    // Track selected skills
    const [selectedSkillIds, setSelectedSkillIds] = useState(new Set()); // Set to track selected skill IDs

    // Groups of skills (an array of skill objects)
    const [groups, setGroups] = useState([]);
    const [activeGroupIndex, setActiveGroupIndex] = useState(null);

    const [alert, setAlert] = useState(null);

    // Function to handle the end of a drag operation
    const onDragEnd = (result) => {
        const { source, destination } = result;

        //console.log(groups);

        // Case 0: Drag to a unsupported area. Do nothing.
        if (!destination) return;

        // Case 1: Drag a skill into trash bin
        if (destination.droppableId === "bin") {

            // Remove it from the selected skills group
            const removedSkill = groups[source.droppableId].items[source.index];
            const newGroups = [...groups];
            newGroups[source.droppableId].items = newGroups[source.droppableId].items.filter(
                item => item.id !== removedSkill.id
            );
            setGroups(newGroups);

            // Enable it again in the skill bank
            const newSelectedSkillIds = new Set(selectedSkillIds);
            newSelectedSkillIds.delete(removedSkill.id)
            setSelectedSkillIds(newSelectedSkillIds);
        }

        // Case 2: Reorder within the same group
        else if (source.droppableId === destination.droppableId) {
            const items = reorder(groups[source.droppableId].items, source.index, destination.index);
            const newGroups = [...groups];
            newGroups[source.droppableId].items = items;
            setGroups(newGroups);
        }

        // Case 3: Move between different groups
        else {
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

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="row">

                    {/* My Skill Bank */}
                    <div className="col-md-6 mb-3">
                        <div className="card">

                            <div className='card-header custom-card-header d-flex align-items-center justify-content-between'>
                                <h5 className='mb-0'>1.&nbsp;Set-up Your Skill Bank</h5>
                                <Link to="/mySkillBank" className="btn btn-outline-primary btn-sm">
                                    <i className="fa-solid fa-screwdriver-wrench"></i>&nbsp;Customize
                                </Link>
                            </div>

                            <div className="card-body">

                                {/*
                                <div className='d-flex justify-content-between'>
                                    <h5 className="card-title fw-bold mb-3">My Skill Bank</h5>
                                    <Link to="/mySkillBank" className="btn btn-outline-primary">
                                        <i className="fa-solid fa-screwdriver-wrench"></i>&nbsp;Customize
                                    </Link>
                                </div>
                                */}

                                <div className="cell my-2">
                                    {skills && skills.skills.map(skill => (
                                        <Skill
                                            key={skill.id}
                                            skill={skill}
                                            onAddSkill={handleAddSkill}
                                            isSelected={selectedSkillIds.has(skill.id)}
                                            color={skill.color}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Selected Skills */}
                    <div className="col-md-6 mb-3">
                        <div className="card">

                            <div className='card-header custom-card-header d-flex align-items-center justify-content-between'>
                                <h5 className='mb-0'>2.&nbsp;Select Your Skills</h5>
                                <button type='button' className='btn btn-outline-primary btn-sm' onClick={addGroup}>
                                    <i className="fa-solid fa-plus"></i>&nbsp;Add Group
                                </button>
                            </div>
                            <div className="card-body">

                                {/*
                                <div className='d-flex justify-content-between'>
                                    <h5 className="card-title fw-bold">Selected Skills</h5>
                                    <button type='button' className='btn btn-outline-primary' onClick={addGroup}>
                                        <i className="fa-solid fa-plus"></i>&nbsp;Add Group
                                    </button>
                                </div>
                                */}

                                {/* Alert Message */}

                                {alert && (
                                    <AlertMessage
                                        type={alert.type}
                                        message={alert.message}
                                        timer={alert.timer}
                                        onClose={() => setAlert(null)}
                                    />
                                )}

                                <div className='my-2'>
                                    {groups.map((group, index) => (
                                        <SkillGroup group={group} index={index} onRemoveGroup={removeGroup} />
                                    ))}
                                </div>

                                <div>
                                    <SkillTrash />
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Re-style Results */}
                    <div className="col-md-6 mb-3">
                        <div className="card">

                            <div className='card-header custom-card-header'>
                                <h5 className='mb-0'>3.&nbsp;Re-style Results (Optional)</h5>
                            </div>
                            <div className="card-body">

                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="col-md-6 mb-3">
                        <div className="card">

                            <div className='card-header custom-card-header'>
                                <h5 className='mb-0'>Preview</h5>
                            </div>
                            <div className="card-body">
                                <SkillTable data={groups} />
                            </div>
                        </div>
                    </div>

                </div>
            </DragDropContext>
        </div>
    );
}

export default SkillSelector;
