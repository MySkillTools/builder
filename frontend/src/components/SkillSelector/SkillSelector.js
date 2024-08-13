import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './SkillSelector.scss';

function SkillSelector() {
    const [skills, setSkills] = useState([
        { id: 'skill1', name: 'HTML' },
        { id: 'skill2', name: 'CSS' },
        { id: 'skill3', name: 'JavaScript' },
        { id: 'skill4', name: 'React' },
        { id: 'skill5', name: 'Node.js' },
        { id: 'skill6', name: 'Express.js' },
        { id: 'skill7', name: 'MongoDB' },
        { id: 'skill8', name: 'SQL' },
        { id: 'skill9', name: 'Python' },
        { id: 'skill10', name: 'Django' },
        { id: 'skill11', name: 'Flask' },
        { id: 'skill12', name: 'Java' },
        { id: 'skill13', name: 'Spring Boot' },
        { id: 'skill14', name: 'C#' },
        { id: 'skill15', name: '.NET' },
        { id: 'skill16', name: 'Angular' },
        { id: 'skill17', name: 'Vue.js' },
        { id: 'skill18', name: 'TypeScript' },
        { id: 'skill19', name: 'GraphQL' },
        { id: 'skill20', name: 'REST API' },
        { id: 'skill21', name: 'Docker' },
        { id: 'skill22', name: 'Kubernetes' },
        { id: 'skill23', name: 'AWS' },
        { id: 'skill24', name: 'Azure' },
        { id: 'skill25', name: 'Google Cloud' },
        { id: 'skill26', name: 'Machine Learning' },
        { id: 'skill27', name: 'TensorFlow' },
        { id: 'skill28', name: 'PyTorch' },
        { id: 'skill29', name: 'OpenCV' },
        { id: 'skill30', name: 'Data Science' },
        { id: 'skill31', name: 'Big Data' },
        { id: 'skill32', name: 'Hadoop' },
        { id: 'skill33', name: 'Spark' },
        { id: 'skill34', name: 'Scala' },
        { id: 'skill35', name: 'Go' },
        { id: 'skill36', name: 'Rust' },
        { id: 'skill37', name: 'Swift' },
        { id: 'skill38', name: 'Kotlin' },
        { id: 'skill39', name: 'Objective-C' },
        { id: 'skill40', name: 'iOS Development' },
        { id: 'skill41', name: 'Android Development' },
        { id: 'skill42', name: 'React Native' },
        { id: 'skill43', name: 'Flutter' },
        { id: 'skill44', name: 'UI/UX Design' },
        { id: 'skill45', name: 'Figma' },
        { id: 'skill46', name: 'Sketch' },
        { id: 'skill47', name: 'Adobe XD' },
        { id: 'skill48', name: 'Photoshop' },
        { id: 'skill49', name: 'Illustrator' },
        { id: 'skill50', name: 'SEO' },
    ]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedSkillIds, setSelectedSkillIds] = useState(new Set());  // Set to track selected skill IDs
    const [groups, setGroups] = useState([]);
    const [activeGroupIndex, setActiveGroupIndex] = useState(null);

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(groups[source.droppableId].items, source.index, destination.index);
            const newGroups = [...groups];
            newGroups[source.droppableId].items = items;
            setGroups(newGroups);
        } else {
            const result = move(groups[source.droppableId].items, groups[destination.droppableId].items, source.index, destination.index);
            const newGroups = [...groups];
            newGroups[source.droppableId].items = result.source;
            newGroups[destination.droppableId].items = result.destination;
            setGroups(newGroups);
        }
    };

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

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

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

    const addGroup = () => {
        const newGroup = { id: `group-${groups.length}`, name: `Group ${groups.length + 1}`, items: [] };
        setGroups([...groups, newGroup]);
        setActiveGroupIndex(groups.length);
    };

    //const selectGroup = (index) => {
    //    setActiveGroupIndex(index);
    //};

    const removeGroup = (index) => {
        const newGroups = [...groups];
        const removedGroup = newGroups.splice(index, 1)[0];
        setGroups(newGroups);

        // Release skills back to the pool by removing them from the selectedSkillIds set
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
                            {skills.map((skill) => (
                                <button
                                    key={skill.id}
                                    onClick={() => handleAddSkill(skill)}
                                    className="skill"
                                    disabled={selectedSkillIds.has(skill.id)}
                                >
                                    {skill.name}
                                </button>
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
                            <button type='button' className='btn btn-outline-primary' onClick={addGroup} >
                                <i className="fa-solid fa-plus"></i>&nbsp;Add Group
                            </button>
                        </div>                       
                        {groups.map((group, index) => (
                            <Droppable droppableId={String(index)} key={group.id}>
                                {(provided, snapshot) => (
                                    <div 
                                        ref={provided.innerRef} 
                                        {...provided.droppableProps}
                                        className={`droppable-area ${snapshot.isDraggingOver ? 'is-dragging-over' : ''}`}
                                    >
                                        <div className="group-header d-flex justify-content-between">
                                            <h5 className='fw-bold'>{group.name} (count:&nbsp;{group.items.length})</h5>
                                            <button onClick={() => removeGroup(index)} className="btn btn-outline-danger btn-sm">
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