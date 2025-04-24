import { ConfigProvider } from "antd"
import IkeaHeader from "./components/HeaderIKEA"
import IkeaNavigation from "./components/IkeaNavigation"
import IkeaFooter from "./components/IkeaFooter"
import HomePage from "./pages/homePage"

function App() {
  return (
    <ConfigProvider>
      <div className="w-full min-h-screen flex flex-col">
        <IkeaHeader />
        <IkeaNavigation />
        <main className="flex-grow">
          <HomePage />
        </main>
        <IkeaFooter />
      </div>
    </ConfigProvider>
  )
}

export default App
