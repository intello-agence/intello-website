import React from 'react';

const Stats = ({ t }) => {
  const stats = [t.stats.stat1, t.stats.stat2, t.stats.stat3, t.stats.stat4];

  return (
    <section 
      className="py-20 relative"
      aria-label="Nos chiffres clés"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group cursor-pointer">
              <div 
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300"
                aria-label={`${stat.number} ${stat.label}`}
              >
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm md:text-base" aria-hidden="true">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;