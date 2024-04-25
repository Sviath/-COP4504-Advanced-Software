import React, { useState } from 'react';
import { FoodProvider } from '../context/FoodContext';
import FoodList from '../components/FoodList';
import FoodForm from '../components/FoodForm';
import DatePicker from '../components/DatePicker';
import WeeklyCaloriesChart from '../components/WeeklyCaloriesChart';
import CalorieCalculator from '../components/CalorieCalculator';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

    return (
        <FoodProvider>
            <div className={styles.container}>
                <div className={styles.chartContainer}>
                    <WeeklyCaloriesChart />
                </div>
                <div className={styles.trackerContainer}>
                    <h1 className={styles.title}>Food Tracker App</h1>
                    <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
                    <FoodForm selectedDate={selectedDate} onCancel={() => {}} />
                    <FoodList selectedDate={selectedDate} />
                </div>
                <div className={styles.calorieCalculatorContainer}>
                    <CalorieCalculator />
                </div>
            </div>
        </FoodProvider>
    );
};

export default Home;
