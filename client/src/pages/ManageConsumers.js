import { useState } from 'react'
import ConsumerDetails from '../components/ConsumerDetails'
import { GetConsumers } from '../api/GetConsumers'

const ManageConsumer = () => {
    const [query, setQuery] = useState("")

    let consumers = GetConsumers().consumers
    
    return (
        <div className="manageConsumers">
            <h2>Consumers</h2>
            <input placeholder="Enter Username..." onChange={event => setQuery(event.target.value)}/>
            {consumers && consumers.filter(consumer => {
                if (query === '') {
                    return consumer
                }
                else if (consumer.username.toLowerCase().includes(query.toLowerCase())) {
                    return consumer
                }
                return false
            }).map((consumer) => (
                <ConsumerDetails key={consumer._id} consumer={consumer} />
            ))}
        </div>
    )
}

export default ManageConsumer