import React from 'react';
import FetchExample from './components/FetchExample';
import './App.css';

const App: React.FC = () => {
    return (
        <div>
            <h1>My React + ASP.NET Core App</h1>
            <p>Branchi1です<br>また編集したよ</p>
            <FetchExample />
        </div>
    );
};

export default App;