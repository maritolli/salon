import React, {useState} from 'react';

import './ServiceComponent.css'

export default function ServiceComponent(props) {
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
                    value={props.id_service}
                    className="all-services-choose"
                    onChange={props.handleCheckBoxChange}
                />
            </td>

        </tr>
    )
}