/*{editMode && (
    <form onSubmit={handleEditTodo}>
        <div>
            <label htmlFor="name">Name: </label>
            <input
                type="text"
                id="name"
                name="name"
                value={editTodo.name}
                onChange={(e) =>
                    setEditTodo({
                        ...editTodo,
                        [e.target.name]: e.target.value,
                    })
                }
            />
        </div>
        <div>
            <label htmlFor="description">Description: </label>
            <textarea
                type="text"
                id="description"
                name="description"
                value={editTodo.description}
                rows={4}
                cols={25}
                onChange={(e) =>
                    setEditTodo({
                        ...editTodo,
                        [e.target.name]: e.target.value,
                    })
                }></textarea>
        </div>

        <div>
            <label htmlFor="dueDate">Due date: </label>
            <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={editTodo.dueDate}
                onChange={(e) =>
                    setEditTodo({
                        ...editTodo,
                        [e.target.name]: e.target.value,
                    })
                }
            />
        </div>

        <div>
            <label htmlFor="priority">Important ?</label>
            <input
                type="checkbox"
                name="priority"
                id="priority"
                checked={editTodo.priority}
                onChange={(e) =>
                    setEditTodo({
                        ...editTodo,
                        [e.target.name]: e.target.checked,
                    })
                }
            />
        </div>

        <button>Edit the Todo</button>
    </form>*/