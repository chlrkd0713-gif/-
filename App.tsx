
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Clock, 
  Award, 
  Users, 
  Wrench, 
  CheckCircle2, 
  ArrowRight,
  PhoneCall,
  MapPin,
  Star,
  Quote,
  Sparkles
} from 'lucide-react';

// Components
import Scene3D from './components/Scene3D';
import Navbar from './components/Navbar';
import SectionTitle from './components/SectionTitle';
import ConsultationModal from './components/ConsultationModal';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const reviews = [
    {
      name: "김민준 고객님",
      target: "신축 아파트 입주청소",
      text: "7년 경력이라는 말이 허투루가 아니네요. 보이지 않는 구석 먼지까지 완벽하게 제거해주셔서 기분 좋게 입주했습니다. 전문 장비 포스가 남다르더라구요.",
      rating: 5
    },
    {
      name: "이서연 고객님",
      target: "오피스텔 거주청소",
      text: "창틀이랑 외창이 너무 지저분해서 걱정했는데, 새 것처럼 만들어주셨어요. 애프터서비스까지 확실하게 챙겨주시는 모습에 감동했습니다.",
      rating: 5
    },
    {
      name: "박지훈 고객님",
      target: "상가 입주 및 코팅",
      text: "작업 인원이 많이 오셔서 그런지 생각보다 훨씬 빨리 끝났어요. 시간 약속도 칼같으시고, 작업 퀄리티는 말할 것도 없습니다. 주변에도 추천하고 싶네요.",
      rating: 5
    }
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black text-white">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
            />
            <h1 className="text-2xl font-bold tracking-widest text-blue-400">THE PUREUN CLEAN</h1>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="fixed inset-0 z-0">
        <Canvas shadows>
          <Suspense fallback={null}>
            {/* Pages adjusted to 5.2 for balanced spacing */}
            <ScrollControls pages={5.2} damping={0.2}>
              <Scene3D />
              
              <Scroll html>
                <div className="w-screen">
                  {/* Hero Section */}
                  <section id="home" className="h-screen flex flex-col items-start justify-center px-10 md:px-24">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <span className="inline-block px-4 py-1 rounded-full border border-blue-500 text-blue-400 text-sm font-bold mb-4 bg-blue-500/10">
                        2025 소비자 만족도 1위
                      </span>
                      <h1 className="text-6xl md:text-8xl font-black leading-tight mb-4">
                        공간의 가치를<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">더 푸르게</span>
                      </h1>
                      <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl font-light leading-relaxed">
                        7년 이상의 클린마스터가 선사하는 차원이 다른 프리미엄 입주청소 서비스. 더푸른클린이 당신의 시작을 완벽하게 만듭니다.
                      </p>
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105"
                      >
                        상담 예약하기 <ArrowRight size={20} />
                      </button>
                    </motion.div>
                  </section>

                  {/* About Section - Middle-ground spacing py-44 */}
                  <section id="about" className="py-44 flex flex-col items-center justify-center px-10 md:px-24 bg-black/40 backdrop-blur-sm">
                    <SectionTitle title="ABOUT US" subtitle="현장경력 7년 이상의 전문성" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                      {[
                        { icon: <Award className="w-10 h-10" />, title: "소비자만족 1위", desc: "2025년 기준 고객 만족도 조사 최상위 랭크" },
                        { icon: <ShieldCheck className="w-10 h-10" />, title: "7년+ 클린마스터", desc: "검증된 경력과 노하우의 정직한 전문가" },
                        { icon: <Clock className="w-10 h-10" />, title: "시간 단축 시스템", desc: "1인~3인 이상 동시 투입으로 신속한 작업" }
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 hover:border-blue-500/50 transition-colors group"
                        >
                          <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                          <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                          <p className="text-gray-400 leading-relaxed font-light">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  {/* Services Section - Middle-ground spacing py-44 */}
                  <section id="services" className="py-44 flex flex-col items-center justify-center px-10 md:px-24">
                    <SectionTitle title="OUR SERVICES" subtitle="공간별 맞춤 케어 솔루션" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
                      {[
                        { title: "아파트 / 오피스텔 입주 청소", tag: "Main Service", points: ["전문 인력 상주", "친환경 세제 사용"] },
                        { title: "새집증후군 케어", tag: "Health First", points: ["포름알데히드 제거", "피톤치드 분사"] },
                        { title: "외창 청소 및 코팅", tag: "Crystal Clear", points: ["선명한 시야 확보", "오염 방지 코팅"] },
                        { title: "방충망 교체", tag: "Practical Life", points: ["미세 벌레 차단", "고급 소재 사용"] }
                      ].map((service, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          whileHover={{ y: -5 }}
                          className="relative overflow-hidden group bg-gradient-to-br from-zinc-900 to-black p-10 rounded-3xl border border-white/5"
                        >
                          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
                          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">{service.tag}</span>
                          <h3 className="text-3xl font-black mt-2 mb-6">{service.title}</h3>
                          <ul className="space-y-3">
                            {service.points.map((p, i) => (
                              <li key={i} className="flex items-center gap-2 text-gray-400 font-light">
                                <CheckCircle2 size={16} className="text-blue-500" /> {p}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  {/* Strengths Section - Middle-ground spacing py-44 */}
                  <section className="py-44 flex flex-col items-center justify-center px-10 md:px-24 bg-white text-black">
                    <SectionTitle title="WHY CHOOSE US" subtitle="더푸른클린만의 차별화된 가치" dark />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
                      {[
                        { icon: <Users size={32} />, title: "다수 인력 투입", desc: "팀워크로 빠른 작업" },
                        { icon: <Wrench size={32} />, title: "전문 장비 사용", desc: "고출력 프리미엄 장비" },
                        { icon: <Sparkles size={32} />, title: "철저한 AS", desc: "만족할 때까지 책임" },
                        { icon: <Star size={32} />, title: "정품 세제", desc: "자재 손상 없는 정품" }
                      ].map((strength, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex flex-col items-center text-center p-6 border-b-2 border-transparent hover:border-blue-600 transition-all"
                        >
                          <div className="bg-blue-50 p-4 rounded-full text-blue-600 mb-6">{strength.icon}</div>
                          <h4 className="text-xl font-bold mb-2">{strength.title}</h4>
                          <p className="text-gray-600 font-medium text-sm">{strength.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  {/* Reviews Section - Middle-ground spacing py-44 */}
                  <section className="py-44 flex flex-col items-center justify-center px-10 md:px-24 bg-black">
                    <SectionTitle title="REVIEWS" subtitle="고객님들이 증명하는 만족도" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
                      {reviews.map((review, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ delay: idx * 0.1 }}
                          className="relative p-10 rounded-[2.5rem] bg-zinc-900/80 border border-white/5 flex flex-col h-full group hover:border-blue-500/40 transition-all"
                        >
                          <Quote className="absolute top-6 right-8 text-blue-500/20 w-12 h-12" />
                          <div className="flex gap-1 mb-6">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} size={18} fill="#3b82f6" className="text-blue-500" />
                            ))}
                          </div>
                          <p className="text-lg text-gray-300 mb-8 flex-grow italic leading-relaxed font-light">
                            "{review.text}"
                          </p>
                          <div className="border-t border-white/10 pt-6">
                            <h5 className="text-xl font-bold text-white">{review.name}</h5>
                            <p className="text-blue-400 text-sm font-medium">{review.target}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  {/* Contact Section - Final padding */}
                  <section id="contact" className="py-44 flex flex-col items-center justify-center px-10 md:px-24">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <h2 className="text-5xl md:text-7xl font-black mb-12 leading-tight">당신의 새로운 시작을<br />응원합니다</h2>
                      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <div 
                          className="flex items-center gap-4 bg-zinc-900 px-10 py-6 rounded-2xl border border-blue-500/30 cursor-pointer hover:bg-zinc-800 transition-colors shadow-xl"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <PhoneCall className="text-blue-500 w-6 h-6" />
                          <div>
                            <p className="text-xs text-gray-500 text-left uppercase tracking-tighter">24시간 견적 문의</p>
                            <p className="text-2xl font-black">010-5306-7345</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 bg-zinc-900 px-10 py-6 rounded-2xl border border-blue-500/30 shadow-xl">
                          <MapPin className="text-blue-500 w-6 h-6" />
                          <div>
                            <p className="text-xs text-gray-500 text-left uppercase tracking-tighter">방문 가능 지역</p>
                            <p className="text-2xl font-black">서울 / 경기 전지역</p>
                          </div>
                        </div>
                      </div>
                      <footer className="mt-28 text-gray-700 text-xs font-medium tracking-widest">
                        &copy; 2025 THE PUREUN CLEAN. PREMIUM MOVE-IN CLEANING SERVICE.
                      </footer>
                    </motion.div>
                  </section>
                </div>
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
