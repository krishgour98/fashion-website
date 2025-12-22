import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t-4 border-gradient-to-r from-purple-500 to-pink-500">
      <div className="max-w-7xl mx-auto py-10 px-6 md:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Company</h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-medium">
            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Careers</a></li>
            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Press</a></li>
            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Blog</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Support</h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-medium">
            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Warranty</a></li>
            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Returns</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Legal</h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-medium">
            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Cookie Policy</a></li>
            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Security</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-2xl transition"><i className="bx bxl-facebook-circle"></i></a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400 text-2xl transition"><i className="bx bxl-twitter"></i></a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 text-2xl transition"><i className="bx bxl-instagram"></i></a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 text-2xl transition"><i className="bx bxl-linkedin-square"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-200 dark:bg-gray-800 text-center py-4 text-gray-700 dark:text-gray-300 text-sm font-medium">
        © {new Date().getFullYear()} Fashion Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
