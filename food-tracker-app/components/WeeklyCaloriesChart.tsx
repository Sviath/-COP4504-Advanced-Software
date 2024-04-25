import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useFood } from '../context/FoodContext';  // Adjust the import path as necessary

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface FoodEntry {
    date: string;
    calories: number;
}

const WeeklyCaloriesChart = () => {
    const { entries } = useFood();  // Assuming entries is correctly typed in your context
    const data = prepareWeeklyData(entries);

    const chartData = {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
            {
                label: 'Total Calories',
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    };
    
    return <Bar data={chartData} options={options} />;
}

function prepareWeeklyData(entries: FoodEntry[]): number[] {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);

    const dailyTotals = Array(7).fill(0);
    entries.forEach(entry => {
        const entryDate = new Date(entry.date);
        const diff = entryDate.getDate() - startOfWeek.getDate();
        if (diff >= 0 && diff < 7) {
            dailyTotals[diff] += entry.calories;
        }
    });

    return dailyTotals;
}

export default WeeklyCaloriesChart;
