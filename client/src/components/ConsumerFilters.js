import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useConsumersContext } from "../hooks/useConsumersContext"

const ConsumerFilters = ({ consumer }) => {
    const { dispatch } = useConsumersContext()
    const { user } = useAuthContext()

    const [allergens, setAllergens] = useState(consumer.allergens)
    const [caloriesUpper, setCaloriesUpper] = useState(consumer.caloriesUpper)
    const [caloriesLower, setCaloriesLower] = useState(consumer.caloriesLower)
    const [price, setPrice] = useState(consumer.price)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const update = async (e) => {
        e.preventDefault()

        if (!user) {
            return
        }

        const c = {allergens, caloriesUpper, caloriesLower, price}

        c.allergens = c.allergens.toString().split(',')

        if (caloriesUpper < 0) {
            setError('Please enter a valid value for calories upper limit')
            return
        }

        if (caloriesLower < 0) {
            setError('Please enter a valid value for calories lower limit')
            return
        }

        if (caloriesUpper < caloriesLower) {
            setError('Your calories upper limit may not be lower than your calories lower limit')
            return
        }

        if (price < 0) {
            setError('Please enter a valid value for price limit')
            return
        }

        window.location.reload()

        const response = await fetch('api/consumers/' + consumer._id, {
            method: 'PATCH',
            body: JSON.stringify(c),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            dispatch({type: 'UPDATE_CONSUMER', payload: json})
        }

        closeForm()
    }

    // Hide/unhide form
    const [open, setOpen] = useState(false)

    const openForm = () => {
        setOpen(true)
    }

    const closeForm = () => {
        setOpen(false)
    }

    return (
        <div className="consumer-details">
            {!open && (<>
                <p><strong>Allergens: </strong></p>
                <ul>{consumer.allergens.map(a => <li key={a}>{a}</li>)}</ul>
                <p><strong>Calories Upper Limit: </strong>{consumer.caloriesUpper}</p>
                <p><strong>Calories Lower Limit: </strong>{consumer.caloriesLower}</p>
                <p><strong>Price Limit: </strong>{"$" + consumer.price.toFixed(2)}</p>
                <button onClick={openForm}>Edit</button>
        </>)}
        {open && <form onSubmit={update}>
            <label htmlFor="allergens">Allergens:</label>
            <input
                id="allergens"
                type="text"
                placeholder="Ensure comma-space between allergens"
                onChange={(e) => setAllergens(e.target.value)}
                value={allergens}
                className={emptyFields.includes('allergens') ? 'error' : ''}
            />
            
            <label htmlFor="caloriesUpper">Calories Upper Limit:</label>
            <input
                id="caloriesUpper"
                type="number"
                onChange={(e) => setCaloriesUpper(e.target.value)}
                value={caloriesUpper}
                className={emptyFields.includes('caloriesUpper') ? 'error' : ''}
            />
            
            <label htmlFor="caloriesLower">Calories Lower Limit:</label>
            <input
                id="caloriesLower"
                type="number"
                onChange={(e) => setCaloriesLower(e.target.value)}
                value={caloriesLower}
                className={emptyFields.includes('caloriesLower') ? 'error' : ''}
            />
            
            <label htmlFor="price">Price Limit ($):</label>
            <input
                id="price"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className={emptyFields.includes('price') ? 'error' : ''}
            />
            
            <button>Save</button>
            {error && <div className="error">{error}</div>}
            <button id="close" onClick={closeForm}>Close</button>  
        </form>}
        </div>
    )
}

export default ConsumerFilters