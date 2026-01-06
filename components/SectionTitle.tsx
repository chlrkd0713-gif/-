
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  subtitle: string;
  dark?: boolean;
}

const SectionTitle: React.FC<Props> = ({ title, subtitle, dark }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      <span className={`text-xs font-black tracking-[0.3em] uppercase ${dark ? 'text-blue-600' : 'text-blue-400'}`}>
        {title}
      </span>
      <h2 className={`text-4xl md:text-5xl font-black mt-4 ${dark ? 'text-black' : 'text-white'}`}>
        {subtitle}
      </h2>
      <div className={`w-20 h-1 mx-auto mt-6 rounded-full bg-blue-600`}></div>
    </motion.div>
  );
};

export default SectionTitle;
