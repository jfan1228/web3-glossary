'use client';

import { useState } from 'react';
import { Coffee, X, ExternalLink } from 'lucide-react';

interface TippingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TippingModal({ isOpen, onClose }: TippingModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'lightning' | 'evm' | 'solana' | null>(null);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ☕ 请我喝杯咖啡
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {!selectedMethod ? (
          <div className="p-6 space-y-4">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              感谢您的支持！选择支付方式：
            </p>

            <button
              onClick={() => setSelectedMethod('lightning')}
              className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-400 transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">⚡</span>
                <div className="text-left flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-yellow-500">
                    Lightning Network
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    快速、无 Gas 费
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button
              onClick={() => setSelectedMethod('evm')}
              className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">🦄</span>
                <div className="text-left flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-500">
                    EVM Chain
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    ETH/BSC/Polygon 等
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button
              onClick={() => setSelectedMethod('solana')}
              className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-400 transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">🌈</span>
                <div className="text-left flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-500">
                    Solana
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    低 Gas、快速确认
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          </div>
        ) : (
          <div className="p-6">
            <button
              onClick={() => setSelectedMethod(null)}
              className="text-purple-600 hover:text-purple-700 font-medium mb-6 transition-colors"
            >
              ← 返回选择
            </button>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-4">
              <div className="flex items-center gap-3 mb-4">
                {selectedMethod === 'lightning' && <span className="text-3xl">⚡</span>}
                {selectedMethod === 'evm' && <span className="text-3xl">🦄</span>}
                {selectedMethod === 'solana' && <span className="text-3xl">🌈</span>}
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedMethod === 'lightning' && 'Lightning Network'}
                  {selectedMethod === 'evm' && 'EVM Wallet (ETH/BSC)'}
                  {selectedMethod === 'solana' && 'Solana Wallet'}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 font-mono text-sm break-all border border-gray-200 dark:border-gray-700">
                {selectedMethod === 'lightning' && 'lnurl1dp68gurn8ghj7ctsdyh0tx...' }
                {selectedMethod === 'evm' && '0x1234...5678' }
                {selectedMethod === 'solana' && '9Ab1...' }
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                * 此为示例地址，实际使用时请替换为真实的钱包地址
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                💬 留言（可选）
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="感谢整理这个术语！"
              />
            </div>

            <button
              onClick={() => {
                alert('打赏功能需要连接钱包，此处为演示。实际部署时请配置真实钱包地址。');
                onClose();
              }}
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <Coffee className="w-5 h-5" />
              发送打赏
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
