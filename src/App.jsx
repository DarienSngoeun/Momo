import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PhoneFrame } from "./components/layout/PhoneFrame";
import { BottomNav } from "./components/layout/BottomNav";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Customize from "./pages/Customize";
import Shop from "./pages/Shop";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import Theme from "./pages/Theme";

function App() {
  return (
    <Router>
      <PhoneFrame>
        <div className="flex flex-col min-h-full bg-gray-50 relative">
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/customize" element={<Customize />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/theme" element={<Theme />} />
            </Routes>
          </div>
          <BottomNav />
        </div>
      </PhoneFrame>
    </Router>
  );
}

export default App;
