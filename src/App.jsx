import React from 'react';
import { ConfigProvider } from 'antd';
import IkeaHeader from './components/HeaderIKEA';
import IkeaNavLinks from './components/Menu';


function App() {
  return (
    <ConfigProvider>
        <div className="w-full">
        <IkeaHeader />
        <IkeaNavLinks />
      </div>
    </ConfigProvider>
  );
}

export default App;