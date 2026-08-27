import { useState, useEffect } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { 
  ArrowLeft, CreditCard, Smartphone, Wallet, Building2, 
  Tag, CheckCircle2, ChevronRight, Check, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PaymentMethod = "upi" | "card" | "netbanking" | "wallet";
type PaymentState = "checkout" | "processing" | "success" | "failed";

export function PaymentGateway() {
  const router = useRouter();
  
  // States
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [status, setStatus] = useState<PaymentState>("checkout");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  // Mock Invoice Details (would come from state/params in reality)
  const baseFee = 500;
  const taxes = 45;
  const totalAmount = baseFee + taxes - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "SAVE20") {
      setDiscount(100);
      setCouponApplied(true);
    } else {
      alert("Invalid Coupon Code");
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setCouponApplied(false);
    setCouponCode("");
  };

  const handlePayment = () => {
    setStatus("processing");
    // Simulate API delay
    setTimeout(() => {
      // 90% success rate
      if (Math.random() > 0.1) {
        setStatus("success");
      } else {
        setStatus("failed");
      }
    }, 2500);
  };

  // SUCCESS / FAILED SCREENS
  if (status === "success") {
    return (
      <div className="min-h-screen bg-green-500 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
          <CheckCircle2 className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Payment Successful!</h1>
        <p className="text-green-100 font-medium mb-10">₹{totalAmount} paid to Medyora Health.</p>

        <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl mb-10 text-left">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Transaction Details</p>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Transaction ID</span>
              <span className="text-sm font-bold text-slate-900">TXN-{Math.floor(Math.random() * 1000000000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Method</span>
              <span className="text-sm font-bold text-slate-900 capitalize">{method}</span>
            </div>
          </div>
        </div>

        <Link to="/patient" className="w-full max-w-sm h-14 rounded-2xl bg-white text-green-600 font-bold flex items-center justify-center shadow-lg">
          Back to Home
        </Link>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-500 font-sans">
        <div className="h-24 w-24 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center mb-8">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Payment Failed</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium mb-10 text-sm max-w-[280px]">
          We couldn't process your payment. Please check your details and try again.
        </p>
        <Button onClick={() => setStatus("checkout")} className="w-full max-w-sm h-14 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/30">
          Retry Payment
        </Button>
      </div>
    );
  }

  // CHECKOUT SCREEN
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-6 pb-4 shadow-xs border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.history.back()} className="h-10 w-10 shrink-0 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700">
          <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" />
        </Button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Secure Checkout</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-32">
        
        {/* Payment Summary */}
        <section>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-3 px-1">Payment Summary</h2>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs">
            <div className="space-y-3 text-sm font-medium">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Consultation Fee</span>
                <span>₹{baseFee}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Taxes & Fees</span>
                <span>₹{taxes}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-green-600 dark:text-green-400 font-bold">
                  <span>Discount (SAVE20)</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-slate-900 dark:text-white pt-3 border-t border-slate-100 dark:border-slate-800 mt-2 text-lg">
                <span>Total</span>
                <span className="text-blue-600 dark:text-blue-400">₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Coupons & Offers */}
        <section>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-3 px-1">Apply Coupon</h2>
          {!couponApplied ? (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Enter Promo Code" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="pl-9 h-12 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 uppercase font-bold text-slate-700 dark:text-slate-200"
                />
              </div>
              <Button onClick={handleApplyCoupon} className="h-12 rounded-2xl bg-slate-900 dark:bg-blue-600 text-white font-bold px-6">Apply</Button>
            </div>
          ) : (
            <div className="h-12 rounded-2xl bg-green-50 dark:bg-green-950/60 border border-green-200 dark:border-green-800 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-bold text-green-700 dark:text-green-300">SAVE20 Applied</span>
              </div>
              <button onClick={removeCoupon} className="text-xs font-bold text-red-500 hover:underline">Remove</button>
            </div>
          )}
          {!couponApplied && <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-2 px-2">Try code: SAVE20</p>}
        </section>

        {/* Payment Methods */}
        <section>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-3 px-1">Select Payment Method</h2>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs overflow-hidden">
            
            {/* UPI Option */}
            <div className={`border-b border-slate-100 dark:border-slate-800 transition-colors ${method === 'upi' ? 'bg-blue-50/50 dark:bg-blue-950/40' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
              <button onClick={() => setMethod('upi')} className="w-full flex items-center gap-4 p-4 text-left">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${method === 'upi' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  <Smartphone className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">UPI</h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Google Pay, PhonePe, Paytm</p>
                </div>
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${method === 'upi' ? 'border-blue-600' : 'border-slate-300 dark:border-slate-700'}`}>
                  {method === 'upi' && <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
                </div>
              </button>
              {method === 'upi' && (
                <div className="px-4 pb-4 pt-2 ml-14">
                  <Input placeholder="Enter UPI ID (e.g., name@okicici)" className="h-12 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white" />
                </div>
              )}
            </div>

            {/* Card Option */}
            <div className={`border-b border-slate-100 dark:border-slate-800 transition-colors ${method === 'card' ? 'bg-blue-50/50 dark:bg-blue-950/40' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
              <button onClick={() => setMethod('card')} className="w-full flex items-center gap-4 p-4 text-left">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${method === 'card' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Credit / Debit Card</h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Visa, Mastercard, RuPay</p>
                </div>
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${method === 'card' ? 'border-blue-600' : 'border-slate-300 dark:border-slate-700'}`}>
                  {method === 'card' && <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
                </div>
              </button>
              {method === 'card' && (
                <div className="px-4 pb-4 pt-2 ml-14 space-y-3">
                  <Input placeholder="Card Number" className="h-12 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white" />
                  <div className="flex gap-3">
                    <Input placeholder="MM/YY" className="h-12 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white flex-1" />
                    <Input placeholder="CVV" type="password" maxLength={3} className="h-12 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white flex-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Net Banking Option */}
            <div className={`border-b border-slate-100 dark:border-slate-800 transition-colors ${method === 'netbanking' ? 'bg-blue-50/50 dark:bg-blue-950/40' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
              <button onClick={() => setMethod('netbanking')} className="w-full flex items-center gap-4 p-4 text-left">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${method === 'netbanking' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Net Banking</h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">All major Indian banks</p>
                </div>
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${method === 'netbanking' ? 'border-blue-600' : 'border-slate-300 dark:border-slate-700'}`}>
                  {method === 'netbanking' && <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
                </div>
              </button>
            </div>

            {/* Wallet Option */}
            <div className={`transition-colors ${method === 'wallet' ? 'bg-blue-50/50 dark:bg-blue-950/40' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
              <button onClick={() => setMethod('wallet')} className="w-full flex items-center gap-4 p-4 text-left">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${method === 'wallet' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  <Wallet className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Wallets</h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Amazon Pay, Mobikwik</p>
                </div>
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${method === 'wallet' ? 'border-blue-600' : 'border-slate-300 dark:border-slate-700'}`}>
                  {method === 'wallet' && <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
                </div>
              </button>
            </div>

          </div>
        </section>
      </main>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 z-40">
        <Button 
          onClick={handlePayment} 
          disabled={status === 'processing'}
          className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30"
        >
          {status === 'processing' ? (
             <div className="flex items-center gap-2">
               <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
               Processing...
             </div>
          ) : `Pay ₹${totalAmount}`}
        </Button>
      </div>
    </div>
  );
}
