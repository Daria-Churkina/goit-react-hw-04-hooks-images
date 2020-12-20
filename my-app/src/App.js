import { useState } from 'react';
import './styles.css';
import ImageInfo from './Components/imageInfo';
import { ToastContainer } from 'react-toastify';


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  
   return (
      <div className="App">
        <ImageInfo searchQuery={setSearchQuery} />
        <ToastContainer autoClose={4000} />
      </div>
    );
}

export default App;

