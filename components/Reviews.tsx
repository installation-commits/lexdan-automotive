
import React from 'react';
import { MOCK_REVIEWS } from '../constants';

interface ReviewsProps {
  onWrite?: () => void;
}

const Reviews: React.FC<ReviewsProps> = ({ onWrite }) => {
  return (
    <section className="bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="text-left">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-black text-white">4.9</span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Google Rating</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white italic">The Lexdan Experience</h2>
          </div>
          <button 
            onClick={onWrite}
            className="mt-6 md:mt-0 bg-blue-600 text-white px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition active:scale-95 shadow-lg shadow-blue-900/40"
          >
            Write Review (+2,000 PTS)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_REVIEWS.map((review) => (
            <div key={review.id} className="bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 text-9xl text-white/5 font-serif italic group-hover:text-blue-500/10 transition">"</div>
              <div className="flex text-yellow-400 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-lg text-slate-200 mb-8 leading-relaxed font-medium italic">"{review.text}"</p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-xl">
                  {review.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-white">{review.author}</h4>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
