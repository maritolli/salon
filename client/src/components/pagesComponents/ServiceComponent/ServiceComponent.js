import React, {useState} from 'react';

import './ServiceComponent.css'

export default function ServiceComponent(props) {
    const [isChecked, setChecked] = useState(false);
    const currentId = props.id_service
    const setServices = props.setServices;

    const handleChange = (event) => {
        setServices(currentId)
        setChecked(!isChecked)
    }

    return (
        <tr className="all-services-table-line">

            <td className="all-services-table-column all-services-table-column-service">
                {props.name}
            </td>

            <td className="all-services-table-column all-services-table-column-cost">
                {props.cost}
            </td>

            <td className="all-services-table-column all-services-table-column-checkbox">
                <input
                    type="checkbox"
                    className="all-services-choose"
                    onChange={handleChange}
                />
            </td>

        </tr>
    )
}