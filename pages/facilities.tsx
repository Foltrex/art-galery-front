import React from 'react';
import FacilityTable from '../components/tables/FacilityTable';
import styles from './facilities.module.css';

const Facilities = () => {
    return (
        <div className={styles.container}>
            <h2>Facilities</h2>
            <FacilityTable />
        </div>
    );
};

export default Facilities;