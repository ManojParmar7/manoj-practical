
import './App.css';
import RoutesComponent from './routes/routes';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
    <RoutesComponent></RoutesComponent>
    <ToastContainer position='top-right'></ToastContainer>
    </Provider>
  );
}

export default App;
