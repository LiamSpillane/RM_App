import ConsumerProfileSettings from '../components/ConsumerProfileSettings'
import ConsumerFilters from '../components/ConsumerFilters'
import { GetConsumer } from '../api/GetConsumer'

const ConsumerSettings = () => {

    let consumer = GetConsumer().consumer

    return (
        <div>
            <h1>Settings</h1>
            <div>
                {consumer && (
                    <>
                        <ConsumerProfileSettings consumer={consumer}/>
                        <h3>Search Filters</h3>
                        <ConsumerFilters consumer={consumer}/>
                    </>
                )}
            </div>
        </div>
    )
}

export default ConsumerSettings