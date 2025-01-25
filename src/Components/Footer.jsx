import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaHandsHelping } from "react-icons/fa"; 

const FooterLink = ({ text }) => (
  <li>
    <Link to="/" className="text-gray-300 hover:text-white transition-colors">
      {text}
    </Link>
  </li>
);

const Footer = () => {
  return (
    <footer className="bg-[#4b5bb8] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaHandsHelping className="w-10 h-10" /> 
              <span className="font-bold text-xl">CrowdCube</span>
            </div>
            <p className="text-sm text-gray-300">
              A crowdfunding platform for projects, ideas, and causes.
            </p>
            <ul className="flex items-center gap-1">
              <li>
                <Link to="/">
                  <FaFacebook className="w-6 h-6" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <FaSquareXTwitter className="w-6 h-6" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink text="About Us" />
              <FooterLink text="How It Works" />
              <FooterLink text="Impact Stories" />
              <FooterLink text="Join As Volunteer" />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <FooterLink text="support@crowdcube.org" />
              <FooterLink text="+880 1234-567890" />
              <FooterLink text="Dhaka, Bangladesh" />
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="border px-4 py-2 rounded-lg"
              />
              <button className="btn bg-blue-600 border-none text-white hover:bg-secondary-dark px-4 py-2 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>© 2024 CrowdCube. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;