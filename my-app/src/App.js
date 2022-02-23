import logo from './resources/logo.svg';
import './App.css';
import {Basket} from './Basket.jsx';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import React from "react";

export const App = () => {
    return (

        <DndProvider backend={HTML5Backend}>
            <header className="header"> Deskbrew </header>
            <Basket></Basket>
        </DndProvider>

    )
}

export default App;
