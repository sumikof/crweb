import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationPane from './navigation';
import Dashboard from './dashboard';
import DetailPane from './detail';
import Profile from '@/module/profile/profile';

export default function Component() {
    return (
        <div className=" mx-auto flex">
            <Router>
                <div className="w-1/5 p-4 border-r border-gray-300">
                    <NavigationPane />
                </div>

                <div className="w-4/5 p-4 border-r border-l border-gray-300">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
            </Router>

        </div>
    );
}