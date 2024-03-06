import React from 'react';
import { Home as HomeIcon, Person as PersonIcon, Message as MessageIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function Component() {
    return (
        <div >
            <div style={{ background: "white" }}>
                <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                    <li className="flex items-center">
                        <Link to="/">
                            <HomeIcon className="w-5 h-5 mr-2 text-blue-500" />
                            ホーム
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <Link to="/profile">
                            <PersonIcon className="w-5 h-5 mr-2 text-blue-500" />
                            プロフィール
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <Link to="/messages">
                            <MessageIcon className="w-5 h-5 mr-2 text-blue-500" />
                            メッセージ
                        </Link>
                    </li>
                    {/* 他のリンクを同様に設定 */}
                </ul>
            </div>
        </div>
    );
}