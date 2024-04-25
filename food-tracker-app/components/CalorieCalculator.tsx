import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

const CalorieCalculator = () => {
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [goal, setGoal] = useState('');
    const [calories, setCalories] = useState(0);

    const calculateCalories = () => {
        // Basal Metabolic Rate (BMR) calculation using the Mifflin-St Jeor Equation
        let BMR;
        if (gender === 'male') {
            BMR = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            BMR = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // Adjust BMR based on the goal
        switch (goal) {
            case 'lose':
                setCalories(BMR - 500); // 500 calories deficit to lose weight
                break;
            case 'gain':
                setCalories(BMR + 500); // 500 calories surplus to gain weight
                break;
            default:
                setCalories(BMR); // Maintenance
                break;
        }
    };

    return (
        <div className={styles.calculatorForm}>
            <h2>Calorie Needs Calculator</h2>
            <div className={styles.inputGroup}>
                <label htmlFor="weight" className={styles.label}>Weight (kg)</label>
                <input type="number" id="weight" value={weight} onChange={e => setWeight(+e.target.value)} placeholder="Enter your weight" className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="height" className={styles.label}>Height (cm)</label>
                <input type="number" id="height" value={height} onChange={e => setHeight(+e.target.value)} placeholder="Enter your height" className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="age" className={styles.label}>Age</label>
                <input type="number" id="age" value={age} onChange={e => setAge(+e.target.value)} placeholder="Enter your age" className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="gender" className={styles.label}>Gender</label>
                <select id="gender" value={gender} onChange={e => setGender(e.target.value)} className={styles.input}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="goal" className={styles.label}>Goal</label>
                <select id="goal" value={goal} onChange={e => setGoal(e.target.value)} className={styles.input}>
                    <option value="">Select Goal</option>
                    <option value="lose">Lose Weight</option>
                    <option value="gain">Gain Weight</option>
                    <option value="maintain">Maintain Weight</option>
                </select>
            </div>
            <button onClick={calculateCalories} className={styles.button}>Calculate</button>
            {calories > 0 && <div className={styles.result}>Daily Caloric Intake: {calories} kcal</div>}
        </div>
    );
};

export default CalorieCalculator;
