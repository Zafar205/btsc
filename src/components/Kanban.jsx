import { useState } from "react"

export default function Kanban(){
    const [columns, setColums] = useState({
        Dispatched : {
            name : "Dispatched",
            items : [{id: "1", content : "Market Research"}, {id: "2", content : "Another Item"},]
        },
        Inspection : {
            name : "Inspection",
            items : [{id: "3", content : "Inspection Research"}, {id: "4", content : "Another Item"},]

        },
        Repairing : {
            name : "Repairing",
            items : [{id: "5", content : "Repairing Research"}, {id: "6", content : "Another Item"},]
        },
        Completed :{
            name : "Completed",
            items : [{id: "7", content : "Completed Research"}]
        }
    })

    const [newTask, setNewTask] = useState("");
    const [activeColumn, setActiveColumn] = useState("Dispatched");
    const [draggedItem, setDraggedItem] = useState(null); 

    const addNewTask = () => {
        if (addNewTask.trim() === "") return;

        const updatedColums = {...columns};

        updatedColums[activeColumn].items.push({
            id : Date.now().toString(),
            content : newTask
        });

        setColums(updatedColums);
        setNewTask("");
    }

    const removeTask = (columnId, taskId) =>{
        const updatedColums = {...columns};
        updatedColums[columnId].items = updatedColums[columnId].items.filter( (item)=> item.id !== taskId);
        setColums(updatedColums);

    }

    const handleDragStart = (columnId, item) => {
        setDraggedItem({columnId, item})
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e, columnId) => {
        e.preventDefault();

        if(!draggedItem) return;

        const {columnId : sourceColumnId, item} = draggedItem;
        
        if(sourceColumnId === columnId) return;

        const updatedColums = {...columns}
        //remove item
        updatedColums[sourceColumnId].items = updatedColums[sourceColumnId].items.filter( (i)=> i.id !== item.id);
        //add item
        updatedColums[columnId].items.push(item);
        setColums(updatedColums);
        setDraggedItem(null);
    }

    return <div></div>
}