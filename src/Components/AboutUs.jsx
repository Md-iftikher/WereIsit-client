import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <section className="container mx-auto px-4  bg-gradient-to-r from-sky-50 to-blue-50 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image */}
        <Fade direction="left" delay={300} duration={1000}>
          <div className="relative">
            <img
              src="https://i.ibb.co.com/TxM3hNc6/freepik-the-style-is-candid-image-photography-with-natural-83388.jpg"
              alt="Lost and Found"
              className="w-full h-[600px] rounded-lg  transform transition-transform duration-300 hover:scale-105 border-2 border-white shadow-xl"
            />
          </div>
        </Fade>

        {/* text Content */}
        <Fade direction="right" delay={400} duration={1000}>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              About <span className="text-blue-600">Our Platform</span>
            </h2>
            <p className="text-gray-600 mb-4">
              Our mission is to **help people reunite with their lost belongings** by connecting
              finders and owners in a **secure and efficient way**. We provide a user-friendly
              platform where you can report lost or found items, verify claims, and safely return
              them to their rightful owners.
            </p>
            <p className="text-gray-600 mb-6">
              Join our **growing community** and make a difference by helping others find what
              matters most to them.
            </p>

            <Link to="/register">
              <button className="bg-sky-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 hover:from-blue-700 hover:to-sky-700">
                Join Us
              </button>
            </Link>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default AboutUs;
