import React from 'react';
import { ConfigProvider } from 'antd';
import IkeaHeader from './components/HeaderIKEA';
import IkeaNavLinks from './components/Menu';
import IkeaFooter from './components/IkeaFooter';


function App() {
  return (
    <ConfigProvider>
        <div className="w-screen">
        <IkeaHeader />
        <IkeaNavLinks />
        <IkeaFooter/>
      </div>
    </ConfigProvider>
  );
}

export default App;