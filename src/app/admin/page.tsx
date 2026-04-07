"use client";

import { useEffect, useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { GoldButton } from "@/components/GoldButton";
import { Check, Lock, Settings, MailOpen, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    groomName: "",
    brideName: "",
    weddingDate: "",
    location: "",
    countdownTargetDate: "",
    countdownVideoUrl: "",
    lagunDate: "",
    lagunTime: "",
    lagunLocation: "",
    haldiDate: "",
    haldiTime: "",
    haldiLocation: "",
    sangeetDate: "",
    sangeetTime: "",
    sangeetLocation: "",
    weddingEventTime: "",
    weddingLocation: "",
    venue1Name: "",
    venue1Description: "",
    venue1Events: "",
    venue1MapUrl: "",
    venue1DirectionsUrl: "",
    venue2Name: "",
    venue2Description: "",
    venue2Events: "",
    venue2MapUrl: "",
    venue2DirectionsUrl: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [uploadingMusic, setUploadingMusic] = useState(false);

  const [rsvps, setRsvps] = useState<any[]>([]);
  const [loadingRsvps, setLoadingRsvps] = useState(false);

  useEffect(() => {
    // Fetch initial data
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setFormData({
         groomName: data.groomName || "",
         brideName: data.brideName || "",
         weddingDate: data.weddingDate || "",
         location: data.location || "",
         countdownTargetDate: data.countdownTargetDate?.split('T')[0] || "",
         countdownVideoUrl: data.countdownVideoUrl || "",
         lagunDate: data.lagunDate || "NOVEMBER 26, 2025",
         lagunTime: data.lagunTime || "10:00 AM onwards",
         lagunLocation: data.lagunLocation || "Family Residence",
         haldiDate: data.haldiDate || "NOVEMBER 27, 2025",
         haldiTime: data.haldiTime || "9:00 AM onwards",
         haldiLocation: data.haldiLocation || "Family Residence",
         sangeetDate: data.sangeetDate || "NOVEMBER 28, 2025",
         sangeetTime: data.sangeetTime || "7:00 PM onwards",
         sangeetLocation: data.sangeetLocation || "Royal Ballroom",
         weddingEventTime: data.weddingEventTime || "4:00 PM onwards",
         weddingLocation: data.weddingLocation || "St. Patrick's Cathedral",
         venue1Name: data.venue1Name || "Family Residence",
         venue1Description: data.venue1Description || "Groom's Home, Mumbai",
         venue1Events: data.venue1Events || "LAGUN & HALDI",
         venue1MapUrl: data.venue1MapUrl || "https://maps.google.com/maps?q=Mumbai,+India&t=m&z=10&ie=UTF8&iwloc=&output=embed&z=10",
         venue1DirectionsUrl: data.venue1DirectionsUrl || "https://maps.google.com/?q=Mumbai",
         venue2Name: data.venue2Name || "The Royal Palace",
         venue2Description: data.venue2Description || "Mumbai",
         venue2Events: data.venue2Events || "SANGEET & WEDDING",
         venue2MapUrl: data.venue2MapUrl || "https://maps.google.com/maps?q=Mumbai,+India&t=m&z=10&ie=UTF8&iwloc=&output=embed&z=10",
         venue2DirectionsUrl: data.venue2DirectionsUrl || "https://maps.google.com/?q=Mumbai",
      }));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Step 1: Save the standard text parameters
      const submissionData = { ...formData };
      if (submissionData.countdownTargetDate) {
         // Re-add the time portion so the JS clock counts down to exactly midnight
         submissionData.countdownTargetDate = `${submissionData.countdownTargetDate}T00:00:00`;
      }

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: loginPassword, data: submissionData }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Save failed");

      setMessage({ text: "Settings successfully updated!", isError: false });
    } catch (err: any) {
       setMessage({ text: err.message, isError: true });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleMusicUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!musicFile) return;
    setUploadingMusic(true);
    setMessage(null);
    
    const formDataObj = new FormData();
    formDataObj.append("file", musicFile);
    formDataObj.append("password", loginPassword);
    
    try {
       const res = await fetch("/api/upload-music", {
          method: "POST",
          body: formDataObj
       });
       const json = await res.json();
       if (!res.ok) throw new Error(json.error || "Upload failed");
       setMessage({ text: "Music successfully uploaded and mapped globally!", isError: false });
       setMusicFile(null); // Clear input visibly if possible or just state 
    } catch (err: any) {
       // Allow visual feedback for failures such as 413 Payload Too Large
       setMessage({ text: err.message, isError: true });
    } finally {
       setUploadingMusic(false);
       setTimeout(() => setMessage(null), 3000);
    }
  };

  const loadRSVPs = async () => {
    setLoadingRsvps(true);
    try {
      const res = await fetch(`/api/rsvp?password=${encodeURIComponent(loginPassword)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load RSVPs");
      setRsvps(json.rsvps.reverse()); // latest first
      setMessage({ text: `Successfully loaded ${json.rsvps.length} RSVPs!`, isError: false });
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    } finally {
      setLoadingRsvps(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (loginUsername === "owner" && loginPassword === "Hl5tmrj9fi5") ||
      (loginUsername === "admin" && loginPassword === "Hl5tmrj9fi5")
    ) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
       setLoginError("Invalid username or password");
    }
  };

  if (!isLoggedIn) {
     return (
        <div className="min-h-screen bg-dark-700 py-24 px-4 flex items-center justify-center text-foreground font-sans">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-500/10 via-dark-700 to-dark-700 pointer-events-none z-0"></div>
            
            <div className="max-w-md w-full relative z-10">
               <FadeIn>
                  <div className="glass-card rounded-2xl border border-gold-500/20 box-glow overflow-hidden p-8 text-center">
                     <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-6 border border-gold-500/20 box-glow">
                        <Lock className="w-8 h-8 text-gold-400" />
                     </div>
                     <h1 className="font-serif text-3xl text-gold-200 mb-2">Security Gateway</h1>
                     <p className="tracking-widest uppercase text-xs text-gold-500/50 mb-8">Admin Access Required</p>
                     
                     <form onSubmit={handleLogin} className="space-y-6 text-left">
                        <div className="space-y-2">
                           <label className="text-xs uppercase tracking-widest text-gold-200">Username</label>
                           <input type="text" value={loginUsername} onChange={e=>setLoginUsername(e.target.value)} className="w-full bg-dark-600/50 border border-gold-500/30 rounded-md px-4 py-3 focus:border-gold-500 focus:outline-none transition-colors text-sm" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs uppercase tracking-widest text-gold-200">Password</label>
                           <input type="password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} className="w-full bg-dark-600/50 border border-gold-500/30 rounded-md px-4 py-3 focus:border-gold-500 focus:outline-none transition-colors text-sm" />
                        </div>
                        {loginError && <p className="text-red-400 text-xs text-center">{loginError}</p>}
                        <GoldButton type="submit" className="w-full">Secure Login</GoldButton>
                     </form>
                  </div>
               </FadeIn>
            </div>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-dark-700 py-24 px-4 flex justify-center text-foreground font-sans">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-500/10 via-dark-700 to-dark-700 pointer-events-none z-0"></div>

       <div className="max-w-xl w-full relative z-10">
         <FadeIn>
           <div className="text-center mb-10">
             <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-6 border border-gold-500/20 box-glow">
                <Settings className="w-8 h-8 text-gold-400" />
             </div>
             <h1 className="font-serif text-3xl md:text-5xl text-gold-200 mb-2">Admin Dashboard</h1>
             <p className="tracking-widest uppercase text-xs text-gold-500/50">Manage Site Configuration</p>
           </div>
         </FadeIn>

         <FadeIn delay={0.2}>
            <div className="glass-card rounded-2xl border border-gold-500/20 box-glow overflow-hidden p-8">
              <form onSubmit={handleSave} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-gold-200">Groom Name</label>
                     <input
                      type="text"
                      className="w-full bg-dark-600/50 border border-gold-500/30 rounded-md px-4 py-3 focus:border-gold-500 focus:outline-none transition-colors placeholder:text-foreground/20 text-sm"
                      value={formData.groomName}
                      onChange={e => setFormData({ ...formData, groomName: e.target.value })}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-gold-200">Bride Name</label>
                     <input
                      type="text"
                      className="w-full bg-dark-600/50 border border-gold-500/30 rounded-md px-4 py-3 focus:border-gold-500 focus:outline-none transition-colors placeholder:text-foreground/20 text-sm"
                      value={formData.brideName}
                      onChange={e => setFormData({ ...formData, brideName: e.target.value })}
                     />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-gold-200">Wedding Date <span className="text-gray-500 lowercase tracking-normal">(e.g. November 29, 2025)</span></label>
                     <input
                      type="text"
                      className="w-full bg-dark-600/50 border border-gold-500/30 rounded-md px-4 py-3 focus:border-gold-500 focus:outline-none transition-colors placeholder:text-foreground/20 text-sm"
                      value={formData.weddingDate}
                      onChange={e => setFormData({ ...formData, weddingDate: e.target.value })}
                     />
                     <p className="text-[10px] text-foreground/40 mt-1">This is the stylized text shown on the first page.</p>
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-gold-200">Countdown Target</label>
                     <input
                      type="date"
                      className="w-full bg-dark-600/50 border border-gold-500/30 rounded-md px-4 py-3 focus:border-gold-500 focus:outline-none transition-colors text-foreground text-sm"
                      value={formData.countdownTargetDate}
                      onChange={e => setFormData({ ...formData, countdownTargetDate: e.target.value })}
                     />
                     <p className="text-[10px] text-foreground/40 mt-1">The exact calendar date the timer counts down to.</p>
                  </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs uppercase tracking-widest text-gold-200">Global Location</label>
                   <input
                    type="text"
                    className="w-full bg-dark-600/50 border border-gold-500/30 rounded-md px-4 py-3 focus:border-gold-500 focus:outline-none transition-colors placeholder:text-foreground/20 text-sm"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                   />
                </div>

                 <div className="h-px bg-gold-gradient opacity-30 my-8"></div>
                 
                 <h3 className="font-serif text-xl text-gold-300">Events Configuration</h3>
                 
                 <div className="space-y-6">
                   {/* Lagun */}
                   <div className="bg-dark-600/40 p-4 rounded-xl border border-gold-500/10 space-y-4">
                      <h4 className="font-sans text-sm tracking-widest text-gold-400 font-bold">LAGUN</h4>
                      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Date</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.lagunDate} onChange={e => setFormData({...formData, lagunDate: e.target.value})} />
                         </div>
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Time</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.lagunTime} onChange={e => setFormData({...formData, lagunTime: e.target.value})} />
                         </div>
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Location</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.lagunLocation} onChange={e => setFormData({...formData, lagunLocation: e.target.value})} />
                         </div>
                      </div>
                   </div>

                   {/* Haldi */}
                   <div className="bg-dark-600/40 p-4 rounded-xl border border-gold-500/10 space-y-4">
                      <h4 className="font-sans text-sm tracking-widest text-gold-400 font-bold">HALDI</h4>
                      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Date</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.haldiDate} onChange={e => setFormData({...formData, haldiDate: e.target.value})} />
                         </div>
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Time</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.haldiTime} onChange={e => setFormData({...formData, haldiTime: e.target.value})} />
                         </div>
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Location</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.haldiLocation} onChange={e => setFormData({...formData, haldiLocation: e.target.value})} />
                         </div>
                      </div>
                   </div>

                   {/* Sangeet */}
                   <div className="bg-dark-600/40 p-4 rounded-xl border border-gold-500/10 space-y-4">
                      <h4 className="font-sans text-sm tracking-widest text-gold-400 font-bold">SANGEET</h4>
                      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Date</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.sangeetDate} onChange={e => setFormData({...formData, sangeetDate: e.target.value})} />
                         </div>
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Time</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.sangeetTime} onChange={e => setFormData({...formData, sangeetTime: e.target.value})} />
                         </div>
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Location</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.sangeetLocation} onChange={e => setFormData({...formData, sangeetLocation: e.target.value})} />
                         </div>
                      </div>
                   </div>

                   {/* Wedding */}
                   <div className="bg-dark-600/40 p-4 rounded-xl border border-gold-500/10 space-y-4">
                      <h4 className="font-sans text-sm tracking-widest text-gold-400 font-bold">WEDDING</h4>
                      <p className="text-[10px] text-foreground/50 -mt-2">Date is pulled from the main Wedding Date setting above.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Time</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.weddingEventTime} onChange={e => setFormData({...formData, weddingEventTime: e.target.value})} />
                         </div>
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Location</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.weddingLocation} onChange={e => setFormData({...formData, weddingLocation: e.target.value})} />
                         </div>
                      </div>
                   </div>
                 </div>

                 <div className="h-px bg-gold-gradient opacity-30 my-8"></div>
                 
                 <h3 className="font-serif text-xl text-gold-300">Venue Cards Configuration</h3>
                 
                 <div className="space-y-6">
                   {/* Venue 1 */}
                   <div className="bg-dark-600/40 p-4 rounded-xl border border-gold-500/10 space-y-4">
                      <h4 className="font-sans text-sm tracking-widest text-gold-400 font-bold">VENUE CARD 1</h4>
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Name</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.venue1Name} onChange={e => setFormData({...formData, venue1Name: e.target.value})} />
                         </div>
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Description (sub-text)</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.venue1Description} onChange={e => setFormData({...formData, venue1Description: e.target.value})} />
                         </div>
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Events Tags</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.venue1Events} onChange={e => setFormData({...formData, venue1Events: e.target.value})} />
                         </div>
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Direct Map Link URL</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.venue1DirectionsUrl} onChange={e => setFormData({...formData, venue1DirectionsUrl: e.target.value})} />
                         </div>
                      </div>
                      <div className="space-y-1 pt-2">
                         <label className="text-[10px] uppercase text-gold-200">Google Map Embed SRC URL (From HTML)</label>
                         <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.venue1MapUrl} onChange={e => setFormData({...formData, venue1MapUrl: e.target.value})} />
                      </div>
                   </div>

                   {/* Venue 2 */}
                   <div className="bg-dark-600/40 p-4 rounded-xl border border-gold-500/10 space-y-4">
                      <h4 className="font-sans text-sm tracking-widest text-gold-400 font-bold">VENUE CARD 2</h4>
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Name</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.venue2Name} onChange={e => setFormData({...formData, venue2Name: e.target.value})} />
                         </div>
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Description (sub-text)</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.venue2Description} onChange={e => setFormData({...formData, venue2Description: e.target.value})} />
                         </div>
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Events Tags</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.venue2Events} onChange={e => setFormData({...formData, venue2Events: e.target.value})} />
                         </div>
                         <div className="space-y-1">
                           <label className="text-[10px] uppercase text-gold-200">Direct Map Link URL</label>
                           <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.venue2DirectionsUrl} onChange={e => setFormData({...formData, venue2DirectionsUrl: e.target.value})} />
                         </div>
                      </div>
                      <div className="space-y-1 pt-2">
                         <label className="text-[10px] uppercase text-gold-200">Google Map Embed SRC URL (From HTML)</label>
                         <input type="text" className="w-full bg-dark-700/80 border border-gold-500/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 text-foreground" value={formData.venue2MapUrl} onChange={e => setFormData({...formData, venue2MapUrl: e.target.value})} />
                      </div>
                   </div>
                 </div>

                 <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`text-sm text-center py-3 rounded-md border ${message.isError ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}
                    >
                      {message.isError ? message.text : (
                         <span className="flex items-center justify-center gap-2">
                           <Check className="w-4 h-4" /> {message.text}
                         </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-4">
                   <GoldButton type="submit" disabled={isSubmitting} className="w-full">
                     {isSubmitting ? "Saving..." : "Save Configuration"}
                   </GoldButton>
                </div>
              </form>

               <div className="mt-6 text-center text-[10px] text-foreground/30 uppercase tracking-widest">
                  Changes are applied instantly on page refresh
               </div>
             </div>

             {/* RSVP DATA TABLE SECTION */}
             <div className="mt-8 glass-card rounded-2xl border border-gold-500/20 box-glow overflow-hidden p-8">
               <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                 <div className="text-center md:text-left">
                   <h2 className="font-serif text-2xl text-gold-300">RSVP Responses</h2>
                   <p className="text-[10px] tracking-widest uppercase text-foreground/50 mt-1">
                     Total Guests Attending: <span className="text-gold-400 font-bold ml-1">{rsvps.filter(r => r.attendance === 'yes').reduce((sum, r) => sum + r.guests, 0)}</span>
                   </p>
                 </div>
                 <div className="flex-shrink-0">
                    <GoldButton onClick={loadRSVPs} type="button" disabled={loadingRsvps} className="!py-2 !px-4 text-[10px]">
                      {loadingRsvps ? "Loading Data..." : "Load RSVPs"}
                    </GoldButton>
                 </div>
               </div>
               
               {rsvps.length > 0 ? (
                 <div className="overflow-x-auto rounded-xl border border-gold-500/10 hidden-scrollbar">
                   <table className="w-full text-left text-sm text-foreground whitespace-nowrap">
                     <thead className="bg-dark-600/80 text-gold-200 text-[9px] uppercase tracking-widest font-sans border-b border-gold-500/10">
                       <tr>
                         <th className="px-5 py-4 font-semibold">Guest Name</th>
                         <th className="px-5 py-4 font-semibold">Attendance</th>
                         <th className="px-5 py-4 font-semibold text-center">Party Size</th>
                         <th className="px-5 py-4 font-semibold text-right">Date Submitted</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gold-500/5 bg-dark-700/50">
                       {rsvps.map(rsvp => (
                         <tr key={rsvp.id} className="hover:bg-dark-600/50 transition-colors">
                           <td className="px-5 py-4 font-serif text-gold-100">{rsvp.name}</td>
                           <td className="px-5 py-4">
                              <span className={`px-2 py-1 rounded-[4px] text-[8px] uppercase tracking-widest font-bold ${rsvp.attendance === 'yes' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                {rsvp.attendance}
                              </span>
                           </td>
                           <td className="px-5 py-4 text-center font-sans text-xs text-white/80">{rsvp.attendance === 'yes' ? rsvp.guests : '-'}</td>
                           <td className="px-5 py-4 text-right font-sans text-[10px] text-white/40 tracking-wider">
                             {new Date(rsvp.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               ) : (
                 <div className="text-center py-12 bg-dark-700/50 border border-dashed border-gold-500/20 rounded-xl">
                   <MailOpen className="w-8 h-8 text-gold-500/40 mx-auto mb-3" />
                   <p className="text-foreground/50 text-sm font-serif mb-1">No RSVPs loaded</p>
                   <p className="text-foreground/30 text-[10px] uppercase tracking-widest">Click 'Load RSVPs' to view the guest list</p>
                 </div>
               )}
             </div>

          </FadeIn>
        </div>
     </div>
   );
}
