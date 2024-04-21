import { FoodProvider } from '../context/FoodContext';
import FoodList from '../components/FoodList';
import FoodForm from '../components/FoodForm';

const Home: React.FC = () => {
  return (
    <FoodProvider>
      <div>
        <h1>Food Tracker App</h1>
        <FoodForm />
        <FoodList />
      </div>
    </FoodProvider>
  );
};

export default Home;
