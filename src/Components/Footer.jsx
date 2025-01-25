import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter } from "react-icons/fa"; // Use FaTwitter instead of FaSquareXTwitter
import { FaHandsHelping } from "react-icons/fa"; 

const FooterLink = ({ text, to }) => (
  <li>
    <Link to={to} className="text-gray-300 hover:text-white transition-colors">
      {text}
    </Link>
  </li>
);

const Footer = () => {
  return (
    <footer className="bg-[#1d3557] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaHandsHelping className="w-10 h-10" /> 
              <span className="font-bold text-xl">WhereIsIt</span>
            </div>
            <p className="text-sm text-gray-300">
              A platform to help you find lost items and connect with your community.
            </p>
            <ul className="flex items-center gap-2">
              <li>
                <Link to="/" aria-label="Facebook">
                  <FaFacebook className="w-6 h-6" />
                </Link>
              </li>
              <li>
                <Link to="/" aria-label="Twitter">
                  <FaTwitter className="w-6 h-6" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink text="About Us" to="/about" />
              <FooterLink text="How It Works" to="/how-it-works" />
              <FooterLink text="Impact Stories" to="/impact-stories" />
              <FooterLink text="Join As Volunteer" to="/volunteer" />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <FooterLink text="support@whereisit.org" to="/contact" />
              <FooterLink text="+880 1234-567890" to="/contact" />
              <FooterLink text="Dhaka, Bangladesh" to="/contact" />
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
              <button  className="inline-block cursor-pointer rounded-lg bg-sky-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-sky-900">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>© 2024 WhereIsIt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;