
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onOpenModal: () => void;
}

const Navbar: React.FC<Props> = ({ onOpenModal }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 px-10 py-8 flex justify-between items-center mix-blend-difference"
    >
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => scrollToSection('home')}
      >
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white text-xl italic">D</div>
        <span className="text-2xl font-black tracking-tighter text-white">더푸른클린</span>
      </div>
      
      <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase text-white">
        <button 
          onClick={() => scrollToSection('home')}
          className="hover:text-blue-500 transition-colors uppercase"
        >
          Home
        </button>
        <button 
          onClick={() => scrollToSection('about')}
          className="hover:text-blue-500 transition-colors uppercase"
        >
          About
        </button>
        <button 
          onClick={() => scrollToSection('services')}
          className="hover:text-blue-500 transition-colors uppercase"
        >
          Service
        </button>
        <button 
          onClick={() => scrollToSection('contact')}
          className="hover:text-blue-500 transition-colors uppercase"
        >
          Contact
        </button>
      </div>

      <button 
        onClick={onOpenModal}
        className="px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-blue-600 hover:text-white transition-all"
      >
        견적 문의
      </button>
    </motion.nav>
  );
};

export default Navbar;
