import { useEffect, useState, useRef } from 'react';
import { CartItem } from '@/types/product';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { CheckCircle, Sparkles, Printer, Download } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import html2canvas from 'html2canvas';
import whiteCrumpledPaper from '@/assets/background/white-crumpled-paper-texture.jpg';

interface ReceiptProps {
  items: CartItem[];
  total: number;
  discount?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const Receipt = ({ items, total, discount = 0, isOpen, onClose }: ReceiptProps) => {
  const [printProgress, setPrintProgress] = useState(0);
  const [receiptDetails, setReceiptDetails] = useState({ number: '', date: '', time: '' });
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isOpen) {
      // Generate new receipt details when opened
      setReceiptDetails({
        number: `STK-${Date.now().toString().slice(-8)}`,
        date: format(new Date(), 'MMMM d, yyyy'),
        time: format(new Date(), 'h:mm a')
      });

      setPrintProgress(0);
      // Delay before starting
      const startTimeout = setTimeout(() => {
        // Increment progress in discrete steps
        interval = setInterval(() => {
          setPrintProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            // Move 2% every 100ms for a mechanical feel
            return Math.min(prev + 2, 100);
          });
        }, 100);
      }, 500);

      return () => {
        clearTimeout(startTimeout);
        clearInterval(interval);
      };
    } else {
      setPrintProgress(0);
    }
  }, [isOpen]);

  const handleDownload = async () => {
    if (!receiptRef.current) return;

    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2, // Higher quality
        backgroundColor: null,
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `receipt-${receiptDetails.number}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating receipt image:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-[340px] sm:max-w-[425px] bg-transparent border-none shadow-none p-0 overflow-visible">
        {/* Printer styling */}
        <div className="relative flex flex-col items-center">
          
          {/* Printer Top Slot (Visual Only) */}
          <div className="z-20 w-full h-14 sm:h-16 bg-gray-800 rounded-t-lg shadow-lg flex items-center justify-between px-4 sm:px-6 border-b-4 border-gray-900">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
             <div className="text-gray-400 font-mono text-xs flex items-center gap-2">
                <Printer className="w-4 h-4" />
                PRINTING...
             </div>
          </div>

          {/* Paper Container (Hides the receipt until "printed") */}
          <div className="relative w-[95%] overflow-hidden bg-transparent z-10 transition-all">
             {/* The Receipt Paper */}
             <div 
                ref={receiptRef}
                className="bg-white text-black p-4 sm:p-6 pb-10 sm:pb-12 shadow-md w-full"
                style={{
                    transform: `translateY(-${100 - printProgress}%)`,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    transition: 'transform 0.1s ease-out', // Small smoothing between steps
                    backgroundImage: `url(${whiteCrumpledPaper})`,
                    backgroundSize: 'cover',
                }}
             >
                {/* Header with success icon */}
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="font-handwritten text-xl sm:text-3xl text-black leading-tight">
                        Download this receipt and DM <a href="https://instagram.com/plslorr" target="_blank" rel="noopener noreferrer" className="underline">@plslorr</a>
                    </h2>
                    <p className="font-mono text-xs text-gray-500 uppercase mt-4 sm:mt-5">Thank You!</p>
                </div>

                {/* Receipt Content using Monospace font for realism */}
                <div className="font-mono text-xs space-y-4">
                    {/* Store Info */}
                    <div className="text-center border-b border-black/10 pb-3 border-dashed">
                        <h3 className="text-sm font-handwritten uppercase flex items-center justify-center gap-2">
                            PLSLORR SHOP
                        </h3>
                        <p className="text-gray-500 mt-1">{receiptDetails.date}</p>
                        <p className="text-gray-500">{receiptDetails.time}</p>
                        <p className="text-gray-500">#{receiptDetails.number}</p>
                    </div>

                    {/* Items Table */}
                    <div className="space-y-2">
                    {items.map((item) => (
                        <div key={item.product.id} className="flex justify-between items-start">
                        <span className="text-black flex-1 pr-2">
                            {item.quantity}x {item.product.name}
                        </span>
                        <span>
                            ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        </div>
                    ))}
                    </div>

                    {/* Totals Divider */}
                    <div className="border-t border-black/20 border-dashed my-2" />

                    {/* Totals */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-gray-500">
                            <span>Subtotal</span>
                            <span>${(total - discount).toFixed(2)}</span>
                        </div>
                        {discount < 0 && (
                            <div className="flex justify-between text-gray-500">
                                <span>Discount</span>
                                <span>${discount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-base font-bold text-black pt-2">
                            <span>TOTAL</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                    
                    {/* Barcode Mockup */}
                    <div className="pt-6 pb-2 flex flex-col items-center opacity-80">
                        <div className="h-8 w-3/4 bg-repeat-x" style={{
                            backgroundImage: "linear-gradient(90deg, #000 0%, #000 2px, transparent 2px, transparent 4px, #000 4px, #000 8px, transparent 8px, transparent 9px)",
                            backgroundSize: "10px 100%"
                        }}></div>
                        <p className="text-[10px] mt-1 text-center">THANK YOU FOR YOUR PURCHASE</p>
                    </div>
                </div>

                {/* Jagged Edge Bottom */}
                <div 
                    className="absolute bottom-[-10px] left-0 right-0 w-full"
                    style={{
                        height: '10px',
                        backgroundImage: `url(${whiteCrumpledPaper})`,
                        backgroundSize: 'cover',
                        maskImage: 'linear-gradient(to bottom right, black 50%, transparent 0), linear-gradient(to bottom left, black 50%, transparent 0)',
                        maskSize: '20px 10px',
                        maskRepeat: 'repeat-x',
                        WebkitMaskImage: 'linear-gradient(to bottom right, black 50%, transparent 0), linear-gradient(to bottom left, black 50%, transparent 0)',
                        WebkitMaskSize: '20px 10px',
                        WebkitMaskRepeat: 'repeat-x',
                    }}
                />
             </div>
          </div>
          
          {/* Action Buttons (Fade in after printing) */}
           <div 
             className={cn(
               "mt-8 transition-opacity duration-500 flex flex-row gap-3",
               printProgress === 100 ? "opacity-100" : "opacity-0"
             )}
           >
              <Button
                    onClick={handleDownload}
                    className="rounded-full bg-black text-white hover:bg-gray-800 shadow-lg border border-gray-700 flex items-center gap-2"
                >
                    <Download className="w-4 h-4" />
                    Save Receipt
              </Button>
              <Button
                    onClick={onClose}
                    className="rounded-full bg-white text-black hover:bg-gray-100 shadow-lg border border-gray-200"
                >
                    Close
              </Button>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
