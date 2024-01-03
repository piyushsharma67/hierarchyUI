import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrganisationHierarchy from './hierarchy/view/organisationHierarchy'
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<OrganisationHierarchy />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
