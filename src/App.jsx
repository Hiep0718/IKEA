import React from 'react';
import { ConfigProvider } from 'antd';
import IkeaHeader from './components/HeaderIKEA';
import IkeaNavLinks from './components/Menu';


function App() {
  return (
    <ConfigProvider>
        <IkeaHeader/>
        <IkeaNavLinks/>
    </ConfigProvider>
  );
}

export default App;