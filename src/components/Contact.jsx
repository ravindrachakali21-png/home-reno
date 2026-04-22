import { useState } from 'react';
import { CheckCircle, AlertCircle, ChevronRight, ChevronLeft, Send, User, Mail, Phone, Home, MessageSquare } from 'lucide-react';
import { useRipple } from '../hooks';

const STEPS = ['Your Info', 'Project Details', 'Schedule'];

const SERVICES_LIST = ['Kitchen', 'Bedroom', 'Living Room', 'Bathroom', 'Office', 'Full Home', 'Outdoor', 'Other'];
const BUDGETS = ['Under ₹2L', '₹2L – ₹5L', '₹5L – ₹10L', '₹10L – ₹25L', '₹25L+'];
const TIMELINES = ['ASAP', 'Within 1 month', '1–3 months', '3–6 months', 'Flexible'];

const init = {
  name: '', email: '', phone: '',
  service: '', budget: '', message: '',
  timeline: '', date: '', city: '',
};

function validate(step, data) {
  const errs = {};
  if (step === 0) {
    if (!data.name.trim()) errs.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Valid email required';
    if (!/^\+?[\d\s\-]{10,}$/.test(data.phone)) errs.phone = 'Valid phone required';
  }
  if (step === 1) {
    if (!data.service) errs.service = 'Select a service';
    if (!data.budget) errs.budget = 'Select a budget';
  }
  if (step === 2) {
    if (!data.city.trim()) errs.city = 'City is required';
    if (!data.timeline) errs.timeline = 'Select a timeline';
  }
  return errs;
}

function Field({ label, icon: Icon, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
        {Icon && <Icon size={14} className="text-brand-500" />}
        {label}
      </label>
      {children}
      {error && (
        <span className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </span>
      )}
    </div>
  );
}

export default function Contact() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(init);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const ripple = useRipple();

  const set = (k, v) => {
    setData(d => ({ ...d, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }));
  };

  const next = () => {
    const errs = validate(step, data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(s => s + 1);
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(2, data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  const inputCls = (field) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-white/5 text-gray-900 dark:text-white
     placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all duration-200
     focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 ${
      errors[field]
        ? 'border-red-400 bg-red-50 dark:bg-red-500/10'
        : 'border-gray-200 dark:border-white/10 hover:border-brand-300'
    }`;

  return (
    <section id="contact" className="py-24 bg-white dark:bg-[#0f0e0d]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left info */}
          <div data-aos="fade-right">
            <span className="text-brand-500 font-semibold tracking-widest uppercase text-sm">Contact Us</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
              Let's Build Your<br /><span className="text-gradient">Dream Space</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              Tell us about your project and our design experts will get back to you
              within 24 hours with a free consultation.
            </p>

            {/* Contact cards */}
            <div className="flex flex-col gap-4 mb-8">
              {[
                { icon: '📞', label: 'Call Us', val: '+91 9391216535' },
                { icon: '✉️', label: 'Email', val: 'hello@renovatepro.in' },
                { icon: '📍', label: 'Head Office', val: 'Bangalore, India' },
                { icon: '🕐', label: 'Working Hours', val: 'Mon–Sat, 9AM – 7PM' },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{c.label}</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{c.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp */}
            <a href="https://wa.me/919391216535?text=Hi%2C%20I%27m%20interested%20in%20a%20renovation%20consultation"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold
                         px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div data-aos="fade-left">
            {submitted ? (
              <div className="bg-gradient-to-br from-brand-50 to-orange-50 dark:from-brand-500/10 dark:to-orange-500/10
                              border border-brand-200 dark:border-brand-500/30 rounded-3xl p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-brand-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-500/30">
                  <CheckCircle size={36} className="text-white" />
                </div>
                <h3 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-3">Request Submitted!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                  Thank you <strong>{data.name}</strong>! Our team will contact you at <strong>{data.email}</strong> within 24 hours.
                </p>
                <button onClick={() => { setSubmitted(false); setData(init); setStep(0); }}
                  className="btn-primary">
                  Submit Another Request
                </button>
              </div>
            ) : (
              <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 shadow-xl">
                {/* Progress steps */}
                <div className="flex items-center gap-2 mb-8">
                  {STEPS.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 flex-1">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        i < step ? 'bg-brand-500 text-white' :
                        i === step ? 'bg-brand-500 text-white ring-4 ring-brand-500/20' :
                        'bg-gray-100 dark:bg-white/10 text-gray-400'
                      }`}>
                        {i < step ? '✓' : i + 1}
                      </div>
                      <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-brand-500' : 'text-gray-400'}`}>{s}</span>
                      {i < STEPS.length - 1 && (
                        <div className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${i < step ? 'bg-brand-500' : 'bg-gray-100 dark:bg-white/10'}`} />
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={submit}>
                  {/* Step 0 */}
                  {step === 0 && (
                    <div className="flex flex-col gap-4">
                      <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2">Personal Information</h3>
                      <Field label="Full Name" icon={User} error={errors.name}>
                        <input value={data.name} onChange={e => set('name', e.target.value)}
                          placeholder="Ravi Kumar" className={inputCls('name')} />
                      </Field>
                      <Field label="Email Address" icon={Mail} error={errors.email}>
                        <input type="email" value={data.email} onChange={e => set('email', e.target.value)}
                          placeholder="ravi@email.com" className={inputCls('email')} />
                      </Field>
                      <Field label="Phone Number" icon={Phone} error={errors.phone}>
                        <input value={data.phone} onChange={e => set('phone', e.target.value)}
                          placeholder="+91 9391216535" className={inputCls('phone')} />
                      </Field>
                    </div>
                  )}

                  {/* Step 1 */}
                  {step === 1 && (
                    <div className="flex flex-col gap-5">
                      <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2">Project Details</h3>
                      <Field label="Service Required" icon={Home} error={errors.service}>
                        <div className="grid grid-cols-2 gap-2">
                          {SERVICES_LIST.map(s => (
                            <button type="button" key={s} onClick={() => set('service', s)}
                              className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                                data.service === s
                                  ? 'bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/20'
                                  : 'border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-brand-400'
                              }`}>
                              {s}
                            </button>
                          ))}
                        </div>
                        {errors.service && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.service}</span>}
                      </Field>
                      <Field label="Budget Range" error={errors.budget}>
                        <div className="flex flex-wrap gap-2">
                          {BUDGETS.map(b => (
                            <button type="button" key={b} onClick={() => set('budget', b)}
                              className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200 ${
                                data.budget === b
                                  ? 'bg-brand-500 text-white border-brand-500'
                                  : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-brand-400'
                              }`}>
                              {b}
                            </button>
                          ))}
                        </div>
                        {errors.budget && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.budget}</span>}
                      </Field>
                      <Field label="Additional Notes" icon={MessageSquare}>
                        <textarea value={data.message} onChange={e => set('message', e.target.value)}
                          rows={3} placeholder="Tell us more about your project..."
                          className={inputCls('message') + ' resize-none'} />
                      </Field>
                    </div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <div className="flex flex-col gap-4">
                      <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2">Schedule & Location</h3>
                      <Field label="Your City" icon={Home} error={errors.city}>
                        <input value={data.city} onChange={e => set('city', e.target.value)}
                          placeholder="Bangalore, Hyderabad, Mumbai..." className={inputCls('city')} />
                      </Field>
                      <Field label="Preferred Timeline" error={errors.timeline}>
                        <div className="flex flex-wrap gap-2">
                          {TIMELINES.map(t => (
                            <button type="button" key={t} onClick={() => set('timeline', t)}
                              className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200 ${
                                data.timeline === t
                                  ? 'bg-brand-500 text-white border-brand-500'
                                  : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-brand-400'
                              }`}>
                              {t}
                            </button>
                          ))}
                        </div>
                        {errors.timeline && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.timeline}</span>}
                      </Field>
                      <Field label="Preferred Consultation Date (optional)">
                        <input type="date" value={data.date} onChange={e => set('date', e.target.value)}
                          className={inputCls('date')} min={new Date().toISOString().split('T')[0]} />
                      </Field>

                      {/* Summary */}
                      <div className="bg-brand-50 dark:bg-brand-500/10 rounded-2xl p-4 text-sm">
                        <p className="font-semibold text-brand-700 dark:text-brand-300 mb-2">Summary</p>
                        <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 dark:text-gray-400">
                          <span>Name:</span><span className="font-medium text-gray-900 dark:text-white">{data.name}</span>
                          <span>Service:</span><span className="font-medium text-gray-900 dark:text-white">{data.service}</span>
                          <span>Budget:</span><span className="font-medium text-gray-900 dark:text-white">{data.budget}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex gap-3 mt-7">
                    {step > 0 && (
                      <button type="button" onClick={() => setStep(s => s - 1)}
                        className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 dark:border-white/20
                                   text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <ChevronLeft size={16} /> Back
                      </button>
                    )}
                    {step < STEPS.length - 1 ? (
                      <button type="button" onClick={(e) => { ripple(e); next(); }}
                        className="btn-primary flex-1 flex items-center justify-center gap-2">
                        Continue <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button type="submit" onClick={(e) => ripple(e)}
                        disabled={loading}
                        className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-70">
                        {loading ? (
                          <>
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <><Send size={16} /> Submit Request</>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
