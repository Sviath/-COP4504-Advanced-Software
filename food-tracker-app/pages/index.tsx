import React, { useState } from 'react';
import { FoodProvider } from '../context/FoodContext';
import FoodList from '../components/FoodList';
import FoodForm from '../components/FoodForm';
import DatePicker from '../components/DatePicker';
import WeeklyCaloriesChart from '../components/WeeklyCaloriesChart';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

    return (
        <FoodProvider>
            <main className={styles.main}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
                    <div style={{ position: 'absolute', left: 100, width: '400px', height: '700px' }}>  {/* Increased width and height */}
                        <WeeklyCaloriesChart />
                    </div>
                    <div className={styles.content}>
                        <h1 className={styles.title}>Food Tracker App</h1>
                        <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
                        <FoodForm selectedDate={selectedDate} onCancel={() => {}} />
                        <FoodList selectedDate={selectedDate} />
                    </div>
                </div>
            </main>
        </FoodProvider>
    );
};

export default Home;


