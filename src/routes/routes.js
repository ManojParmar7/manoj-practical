
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from '../components/User';
function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<User></User>}></Route>
      </Routes>
    </Router>
  );
}
export default RoutesComponent;
