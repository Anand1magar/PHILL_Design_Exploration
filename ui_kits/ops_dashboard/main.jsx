import React from 'react';
import ReactDOM from 'react-dom/client';
import { Agentation } from 'agentation';
import PADashboard from './PADashboard.jsx';
import '../../styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <PADashboard />
    {import.meta.env.DEV && <Agentation />}
  </>
);
