"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Lock, CheckCircle, ArrowRight, X, ShieldCheck, Loader2, Download } from 'lucide-react';

// --- 类型定义 ---
interface Product {
  id: number;
  title: string;
  desc: string;
  price: string;
  image: string;
  isPaid: boolean;
}

// --- 子组件 1：商品卡片 (ProductCard) ---
const ProductCard = ({ product, onBuy }: { product: Product, onBuy: () => void }) => {
  return (
    <div 
      className="break-inside-avoid group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer mb-6" 
      onClick={onBuy}
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-3 left-3">
          {product.isPaid ? (
            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow-lg">
              <CheckCircle size={10} /> 已解锁
            </span>
          ) : (
            <span className="bg-slate-900/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
              <Lock size={10} /> 待解锁
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">{product.title}</h3>
        <p className="text-slate-500 text-xs line-clamp-2 mb-4">{product.desc}</p>
        <div className="flex justify-between items-center border-t border-slate-50 pt-3">
          <span className="text-indigo-600 font-bold">¥{product.price}</span>
          <div className="text-slate-400 group-hover:text-indigo-600 transition-colors">
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 子组件 2：支付弹窗 (PaymentModal) ---
const PaymentModal = ({ isOpen, product, onClose }: { isOpen: boolean, product: Product | null, onClose: () => void }) => {
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
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 text-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>

          {step === 'pay' && (
            <div>
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
            <div className="py-12 text-center">
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
};

// --- 主页面组件 (App) ---
const PRODUCTS: Product[] = [
  { id: 1, title: 'AI 绘画大师模版', desc: '包含 50+ 顶级提示词，一键生成艺术大片。', price: '19.9', image: 'https://picsum.photos/400/600?r=1', isPaid: false },
  { id: 2, title: 'Python 爬虫实战', desc: '自动化获取电商数据，含完整源代码。', price: '29.9', image: 'https://picsum.photos/400/300?r=2', isPaid: false },
  { id: 3, title: '设计师图标库 3D', desc: '超高质量 3D 图标，适配所有 UI 设计。', price: '39.9', image: 'https://picsum.photos/400/500?r=3', isPaid: false },
  { id: 4, title: '个人财务看板', desc: 'Notion 极简财务模版，让开支一目了然。', price: '9.9', image: 'https://picsum.photos/400/400?r=4', isPaid: true },
  { id: 5, title: '跨境选品指南', desc: '2024 年度热销品分析报告。', price: '49.9', image: 'https://picsum.photos/400/450?r=5', isPaid: false },
  { id: 6, title: '自动化邮件营销脚本', desc: '提高转化率的必备利器。', price: '15.0', image: 'https://picsum.photos/400/550?r=6', isPaid: false },
];

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPayment = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 导航栏 */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <ShoppingBag size={20} />
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">数字集市</span>
          </div>
          <button className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition">我的订单</button>
        </div>
      </nav>

      {/* 主体 */}
      <main className="pt-24 pb-12 max-w-7xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">精选生产力工具</h1>
          <p className="text-slate-600 text-lg">自动化交付，解锁无限可能。</p>
        </header>

        {/* 瀑布流列布局 */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onBuy={() => handleOpenPayment(product)} 
            />
          ))}
        </div>
      </main>

      {/* 支付弹窗 */}
      <PaymentModal 
        isOpen={isModalOpen} 
        product={selectedProduct} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
