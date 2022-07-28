import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
const API_URL = process.env.REACT_APP_API_URL

const MarketDetails = () => {
    const [detailMarket, setDetailMarket] = useState({})
 
    const [editMode, setEditMode] = useState(false)
    const [editMarket, setEditMarket] = useState({})
    const { marketId } = useParams()
    const navigate = useNavigate()

    const handleDelete = async () => {
        const { data } = await axios.delete(`${API_URL}/markets/${marketId}`)
        
        setTimeout(() => navigate("/profile"), 1000)
    }

    const handleEditMarket = async (e) => {
        e.preventDefault()
        console.log(editMarket)
        const { data } = await axios.put(`${API_URL}/markets/${marketId}`, editMarket)
        console.log(data)
        setDetailMarket(data)
        setEditMode(false)
    }

    const getOneMarket = async () => {
        const { data } = await axios.get(`${API_URL}/markets/${marketId}`)
        // console.log(data)
        setEditMarket(data)
        setDetailMarket(data)
    }
    useEffect(() => {
        getOneMarket()
    }, [])

    return (
        <></>
      /*  <div>
            <div className="DetailsMarket">
				<img src={detailMarket.umgUrl}></img>
				<h4>{detailMarket.name}</h4>
				<p>{detailMarket.description}</p>
				<p>{detailMarket.website}</p>
				<button onClick={handleDelete}>Delete market</button>
				<button onClick={() => setEditMode(!editMode)}>Edit market</button>
			</div>
        
        {editMode && (
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
            </form>
        )}
        
    </div>*/
    )
};

export default MarketDetails;