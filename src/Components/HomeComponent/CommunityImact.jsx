import { FaHandsHelping, FaUsers, FaClipboardList } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';

const CommunityImpactSection = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <Fade duration={1000}>
          <h2 className="text-4xl font-bold mb-8 text-gray-800">
            Our Community Impact
          </h2>
        </Fade>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <Fade duration={1000} delay={300}>
            <div className="p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 border border-gray-200 bg-white">
              <div className="flex items-center justify-center mb-4">
                <FaHandsHelping className="h-12 w-12 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">50,000+</h3>
              <p className="text-gray-600">Total Items Reclaimed</p>
            </div>
          </Fade>
          <Fade duration={1000} delay={400}>
            <div className="p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 border border-gray-200 bg-white">
              <div className="flex items-center justify-center mb-4">
                <FaUsers className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">10,000+</h3>
              <p className="text-gray-600">People Helped</p>
            </div>
          </Fade>
          <Fade duration={1000} delay={600}>
            <div className="p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 border border-gray-200 bg-white">
              <div className="flex items-center justify-center mb-4">
                <FaClipboardList className="h-12 w-12 text-yellow-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">500+</h3>
              <p className="text-gray-600">Lost & Found Reports Filed</p>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default CommunityImpactSection;
