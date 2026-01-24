import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-surface py-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">

                {/* Brand Column */}
                <div className="space-y-4">
                    <h3 className="font-bold text-lg text-white">MAGNITUDE</h3>
                    <p className="text-gray-500 leading-relaxed">
                        The high-velocity revision engine designed for the modern cortex.
                        Stop reading. Start connecting.
                    </p>
                    <div className="text-gray-600">© 2026 Magnitude Labs.</div>
                </div>

                {/* Links Column 1 */}
                <div className="space-y-4">
                    <h4 className="font-bold text-white">Platform</h4>
                    <ul className="space-y-2 text-gray-500">
                        <li className="hover:text-mag-2 cursor-pointer">Seismic Engine</li>
                        <li className="hover:text-mag-2 cursor-pointer">Data Heist</li>
                        <li className="hover:text-mag-2 cursor-pointer">Leaderboards</li>
                        <li className="hover:text-mag-2 cursor-pointer">Pricing</li>
                    </ul>
                </div>

                {/* Links Column 2 */}
                <div className="space-y-4">
                    <h4 className="font-bold text-white">Resources</h4>
                    <ul className="space-y-2 text-gray-500">
                        <li className="hover:text-mag-2 cursor-pointer">Methodology</li>
                        <li className="hover:text-mag-2 cursor-pointer">Teacher Portal</li>
                        <li className="hover:text-mag-2 cursor-pointer">API Status</li>
                        <li className="hover:text-mag-2 cursor-pointer">Changelog</li>
                    </ul>
                </div>

                {/* Legal Column */}
                <div className="space-y-4">
                    <h4 className="font-bold text-white">Legal</h4>
                    <ul className="space-y-2 text-gray-500">
                        <li className="hover:text-mag-2 cursor-pointer">Privacy Policy</li>
                        <li className="hover:text-mag-2 cursor-pointer">Terms of Service</li>
                        <li className="hover:text-mag-2 cursor-pointer">Cookie Settings</li>
                    </ul>
                </div>

            </div>
        </footer>
    );
};

export default Footer;