"use client";

import React from 'react';
import { Lock, CheckCircle, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    desc: string;
    price: string;
    image: string;
    isPaid: boolean;
  };
  onBuy: () => void;
}

export default function ProductCard({ product, onBuy }: ProductCardProps) {
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
}
