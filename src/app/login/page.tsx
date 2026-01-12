"use client";
import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formState, setFormState] = useState('idle'); // 'idle' | 'sending'
  const { auth } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const controls = useAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;

    // Client-side validation
    if (!email.endsWith('@gmail.com') || password.length < 8) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "A condition for login was not met.",
      });
      controls.start({
        x: [-10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      });
      return;
    }

    setFormState('sending');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard');
    } catch (error: any) {
      controls.start({
        x: [-10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      });
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Your credentials could not be verified.",
      });
      setFormState('idle');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-32 px-6 md:px-12 min-h-screen flex flex-col items-center"
    >
      <motion.div 
        animate={controls}
        className="w-full max-w-sm relative z-10"
      >
        <header className="mb-12 text-center">
           <div className="inline-flex items-center justify-center bg-neutral-900 border border-neutral-800 p-3 rounded-full mb-6">
              <Lock className="text-neutral-500" />
           </div>
           <h1 className="text-2xl font-medium text-white mb-2">Admin Access</h1>
           <p className="text-neutral-500 font-light leading-relaxed">
             This area is restricted. It is used for managing site content and is not intended for public access.
           </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-neutral-600 uppercase tracking-widest mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-neutral-800 py-2 text-neutral-200 focus:outline-none focus:border-white transition-colors rounded-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-600 uppercase tracking-widest mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-neutral-800 py-2 text-neutral-200 focus:outline-none focus:border-white transition-colors rounded-none"
            />
          </div>

          <button 
            type="submit"
            disabled={formState === 'sending'}
            className="w-full bg-neutral-900 border border-neutral-800 text-white py-3 px-6 text-sm font-medium hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4"
          >
            {formState === 'sending' ? (
               <span className="w-4 h-4 border border-neutral-500 border-t-transparent rounded-full animate-spin" />
            ) : 'Sign In'}
             <ArrowRight size={16} />
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};
