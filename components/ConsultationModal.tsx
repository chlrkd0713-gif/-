
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ConsultationModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    size: '',
    service: '아파트 / 오피스텔 입주 청소'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwvpdyzl";

    try {
      // 1. Submit to Formspree for data collection
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `[더푸른클린 신규 예약] ${formData.name}님`
        })
      });

      if (response.ok) {
        // 2. Construct the SMS message for immediate notification
        const messageBody = `[더푸른클린 상담예약]
이름: ${formData.name}
연락처: ${formData.phone}
평수: ${formData.size}평
주소: ${formData.address}
서비스: ${formData.service}`;

        const encodedMessage = encodeURIComponent(messageBody);
        const targetNumber = '01053067345';
        
        // Trigger SMS app as a secondary notification
        window.location.href = `sms:${targetNumber}?body=${encodedMessage}`;

        setSubmitted(true);
      } else {
        alert("상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
      if (submitted) {
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-zinc-900/90 border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-3xl font-bold mb-2">상담 예약 접수 완료</h3>
                <p className="text-gray-400 leading-relaxed">
                  데이터가 안전하게 수집되었습니다.<br/>
                  문자 전송 확인 후 클린마스터가 즉시 연락드리겠습니다!
                </p>
              </motion.div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-3xl font-black text-white mb-2">상담 예약하기</h3>
                  <p className="text-blue-400 text-sm font-medium">관리자에게 정보가 안전하게 전달됩니다.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">이름</label>
                    <input 
                      required
                      disabled={isSubmitting}
                      type="text" 
                      placeholder="성함을 입력해주세요"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">휴대폰 번호</label>
                    <input 
                      required
                      disabled={isSubmitting}
                      type="tel" 
                      placeholder="010-0000-0000"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">평수</label>
                      <input 
                        required
                        disabled={isSubmitting}
                        type="number" 
                        placeholder="평수 입력"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
                        value={formData.size}
                        onChange={e => setFormData({...formData, size: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">서비스 선택</label>
                      <select 
                        disabled={isSubmitting}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer disabled:opacity-50"
                        value={formData.service}
                        onChange={e => setFormData({...formData, service: e.target.value})}
                      >
                        <option value="아파트 / 오피스텔 입주 청소" className="bg-zinc-900">입주 / 거주 청소</option>
                        <option value="새집증후군" className="bg-zinc-900">새집증후군 케어</option>
                        <option value="외창 청소 및 코팅" className="bg-zinc-900">외창 청소/코팅</option>
                        <option value="방충망 교체" className="bg-zinc-900">방충망 교체</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">주소</label>
                    <input 
                      required
                      disabled={isSubmitting}
                      type="text" 
                      placeholder="상세 주소를 입력해주세요"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-2 transition-all group disabled:bg-blue-800 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> 전송 중...
                      </>
                    ) : (
                      <>
                        상담 신청하기 <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConsultationModal;
