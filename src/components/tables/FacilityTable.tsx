import React from 'react';
import styles from './FacilityTable.module.css';

const FacitilyTable = () => {

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Activity</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>Organization</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Lidbeer</td>
                        <td>Active</td>
                        <td>Kulman 27</td>
                        <td>OOO Lidbeerus</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Lidbeer</td>
                        <td>Active</td>
                        <td>Kulman 27</td>
                        <td>OOO Lidbeerus</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default FacitilyTable;