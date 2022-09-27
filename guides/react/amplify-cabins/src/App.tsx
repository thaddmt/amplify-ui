import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './lessons/03 - Auth+DataStore/Part 1/Login';
import EditProperty from './lessons/03 - Auth+DataStore/Part 2/EditProperty';
import Properties from './lessons/03 - Auth+DataStore/Part 3/Properties';
import Theme from './routes/Theme';
import { RequireAuth } from './RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Properties />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <EditProperty />
            </RequireAuth>
          }
        />
        <Route path="/theme" element={<Theme />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
