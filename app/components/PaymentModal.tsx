"use client";

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Loader2, Download } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  product: any;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, product, onClose }: PaymentModalProps) {
  const [step, setStep] = useState<'pay' | 'checking' | 'success'>('pay');

  useEffect(() => {
    if (isOpen) setStep('pay');
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleCheckPay = () => {
    setStep('checking');
    // 模拟后端验证支付状态
    setTimeout(() => setStep('success'), 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden transition-all duration-300">
        <div className="p-6 text-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>

          {step === 'pay' && (
            <div className="animate-in fade-in zoom-in duration-200">
              <h2 className="text-xl font-bold text-slate-800 mb-1">解锁商品</h2>
              <p className="text-slate-500 text-sm mb-6 px-4">{product.title}</p>
              
              <div className="bg-slate-50 rounded-2xl p-4 mb-6 inline-block border border-slate-100">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SECURE_PAYMENT_ID_${product.id}`} 
                  alt="支付二维码" 
                  className="mx-auto mix-blend-multiply"
                />
              </div>

              <div className="mb-6">
                <span className="text-3xl font-black text-slate-900 tracking-tight">¥{product.price}</span>
              </div>

              <button 
                onClick={handleCheckPay}
                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition active:scale-95 shadow-lg shadow-indigo-100"
              >
                我已支付
              </button>
            </div>
          )}

          {step === 'checking' && (
            <div className="py-12 animate-in fade-in duration-300 text-center">
              <Loader2 className="animate-spin mx-auto text-indigo-600 mb-4" size={48} />
              <p className="text-slate-600 font-medium">正在验证支付状态...</p>
              <p className="text-slate-400 text-xs mt-2">请勿关闭当前窗口</p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">解锁成功!</h3>
              <p className="text-slate-500 mb-8 px-4 text-sm leading-relaxed">感谢您的支持！资源已准备就绪，您可以点击下方按钮开始下载。</p>
              <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow-xl shadow-slate-200">
                <Download size={20} /> 立即下载资源
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
