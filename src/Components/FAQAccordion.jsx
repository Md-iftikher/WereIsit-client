import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fade } from 'react-awesome-reveal'; 

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Lost & Found?",
      answer: "Lost & Found is a platform that helps people report and reclaim lost or found items.",
    },
    {
      question: "How do I report a lost item?",
      answer: "You can report a lost item by clicking on the 'Report Lost Item' button and filling in the required details.",
    },
    {
      question: "How do I check if my lost item has been found?",
      answer: "You can search for your item in the 'Lost & Found Items' section or check your registered email for updates.",
    },
    {
      question: "What should I do if I find an item?",
      answer: "If you find an item, you can report it through the 'Report Found Item' form to help the owner reclaim it.",
    },
    {
      question: "Is my personal information safe?",
      answer: "Yes! We prioritize user privacy and ensure that your data is securely stored and only visible when necessary.",
    },
    {
      question: "Is this service free to use?",
      answer: "Yes! Our platform is completely free for users who need to find or return lost items.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-10">
     
      <Fade duration={1000} delay={200} >
        <h2 className="text-3xl font-bold text-center mb-6">
          Frequently Asked Questions
        </h2>

        <div className="w-full max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-3 border border-gray-200 rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-xl font-medium">{faq.question}</span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-4"
                  >
                    <p className="text-gray-700">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Fade>
    </section>
  );
};

export default FAQAccordion;
