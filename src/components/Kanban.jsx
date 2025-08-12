import { useState } from "react";

export default function App() {
  const [columns, setColumns] = useState({
    Dispatched: {
      name: "Dispatched",
      items: [{ id: "1", content: "Market Research" }, { id: "2", content: "Another Item" }]
    },
    Inspection: {
      name: "Inspection",
      items: [{ id: "3", content: "Inspection Research" }, { id: "4", content: "Another Item" }]
    },
    Repairing: {
      name: "Repairing",
      items: [{ id: "5", content: "Repairing Research" }, { id: "6", content: "Another Item" }]
    },
    Completed: {
      name: "Completed",
      items: [{ id: "7", content: "Completed Research" }]
    }
  });

  const [newTask, setNewTask] = useState("");
  const [activeColumn, setActiveColumn] = useState("Dispatched");
  const [draggedItem, setDraggedItem] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addNewTask = () => {
    if (newTask.trim() === "") return;

    const updatedColumns = { ...columns };
    updatedColumns[activeColumn].items.push({
      id: Date.now().toString(),
      content: newTask
    });

    setColumns(updatedColumns);
    setNewTask("");
  };

  const removeTask = (columnId, taskId) => {
    const updatedColumns = { ...columns };
    updatedColumns[columnId].items = updatedColumns[columnId].items.filter(item => item.id !== taskId);
    setColumns(updatedColumns);
  };

  const startEditingTask = (columnId, taskId, currentContent) => {
    setEditingTask({ columnId, taskId });
    setEditingText(currentContent);
  };

  const saveEditedTask = () => {
    if (!editingTask || editingText.trim() === "") return;

    const updatedColumns = { ...columns };
    const { columnId, taskId } = editingTask;
    const taskIndex = updatedColumns[columnId].items.findIndex(item => item.id === taskId);
    
    if (taskIndex !== -1) {
      updatedColumns[columnId].items[taskIndex].content = editingText.trim();
      setColumns(updatedColumns);
    }
    
    setEditingTask(null);
    setEditingText("");
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setEditingText("");
  };

  const handleDragStart = (columnId, item) => {
    setDraggedItem({ columnId, item });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    if (!draggedItem) return;

    const { columnId: sourceColumnId, item } = draggedItem;
    if (sourceColumnId === columnId) return;

    const updatedColumns = { ...columns };
    updatedColumns[sourceColumnId].items = updatedColumns[sourceColumnId].items.filter(i => i.id !== item.id);
    updatedColumns[columnId].items.push(item);

    setColumns(updatedColumns);
    setDraggedItem(null);
  };

  const columnStyles = {
    Dispatched: {
      header: "bg-gradient-to-r from-blue-600 to-blue-400",
      border: "border-blue-400"
    },
    Inspection: {
      header: "bg-gradient-to-r from-green-600 to-green-400",
      border: "border-green-400"
    },
    Repairing: {
      header: "bg-gradient-to-r from-violet-600 to-violet-400",
      border: "border-violet-400"
    },
    Completed: {
      header: "bg-gradient-to-r from-yellow-600 to-yellow-400",
      border: "border-yellow-400"
    }
  };

  return (
    <div className="p-6 w-full min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-700 flex items-center justify-center">
      <div className="flex items-center justify-center flex-col gap-4 w-full max-w-6xl">
        <h1 className="text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-rose-400">
          Projects
        </h1>
        <div className="mb-8 flex w-full max-w-lg shadow-lg rounded-lg overflow-hidden">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new Task..."
            className="flex-grow p-3 bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === "Enter" && addNewTask()}
          />
          <select
            value={activeColumn}
            onChange={(e) => setActiveColumn(e.target.value)}
            className="p-3 bg-zinc-700 text-white border-l border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.keys(columns).map((columnId) => (
              <option value={columnId} key={columnId}>
                {columns[columnId].name}
              </option>
            ))}
          </select>
          <button
            onClick={addNewTask}
            className="px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium cursor-pointer transition-all duration-200"
          >
            Add
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 w-full">
          {Object.keys(columns).map((columnId) => (
            <div
              key={columnId}
              className={`flex flex-col w-80 bg-zinc-800 rounded-lg shadow-lg border-2 ${columnStyles[columnId].border}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, columnId)}
            >
              <div className={`p-4 text-white font-semibold text-lg rounded-t-lg ${columnStyles[columnId].header}`}>
                {columns[columnId].name}
                <span className="ml-2 bg-black bg-opacity-30 text-sm px-2 py-1 rounded-full">
                  {columns[columnId].items.length}
                </span>
              </div>
              <div className="flex-1 p-4 space-y-3 min-h-[300px]">
                {columns[columnId].items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-zinc-700 text-white rounded-lg shadow-md cursor-move hover:bg-zinc-600 transition-colors duration-200 group"
                    draggable={!editingTask || editingTask.taskId !== item.id}
                    onDragStart={() => handleDragStart(columnId, item)}
                  >
                    <div className="flex justify-between items-center">
                      {editingTask && editingTask.columnId === columnId && editingTask.taskId === item.id ? (
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            type="text"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="flex-1 p-2 bg-zinc-600 text-white rounded border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveEditedTask();
                              if (e.key === "Escape") cancelEditing();
                            }}
                            autoFocus
                          />
                          <button
                            onClick={saveEditedTask}
                            className="text-green-400 hover:text-green-300 transition-colors duration-200"
                            title="Save changes"
                          >
                            ✓
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="text-red-400 hover:text-red-300 transition-colors duration-200"
                            title="Cancel editing"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="flex-1">{item.content}</span>
                          <div className="ml-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              onClick={() => startEditingTask(columnId, item.id, item.content)}
                              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                              title="Edit task"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => removeTask(columnId, item.id)}
                              className="text-red-400 hover:text-red-300 transition-colors duration-200"
                              title="Remove task"
                            >
                              ✕
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                {columns[columnId].items.length === 0 && (
                  <div className="text-zinc-400 text-center py-8 italic">
                    No tasks yet
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
