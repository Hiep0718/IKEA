import React from 'react';
import { ConfigProvider } from 'antd';
import IkeaHeader from './components/HeaderIKEA';
import IkeaFooter from './components/IkeaFooter';
import IkeaNavigation from './components/IkeaNavigation';


function App() {
  return (
    <ConfigProvider>
        <div className="w-screen">
        <IkeaHeader />
        <IkeaNavigation/>
        <IkeaFooter/>
      </div>
    </ConfigProvider>
  );
}

export default App;