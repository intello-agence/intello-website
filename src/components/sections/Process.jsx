import React from 'react';
import { Target, Palette, Code } from 'lucide-react';

const Process = ({ t }) => {
  const steps = [
    { icon: Target, title: t.process.step1.title, desc: t.process.step1.desc },
    { icon: Palette, title: t.process.step2.title, desc: t.process.step2.desc },
    { icon: Code, title: t.process.step3.title, desc: t.process.step3.desc }
  ];

  return (
    <section 
      className="py-32 px-6 relative overflow-hidden"
      aria-labelledby="process-title"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10" aria-hidden="true" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 id="process-title" className="text-5xl md:text-6xl font-bold mb-6">
            {t.process.title} <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t.process.titleHighlight}</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8" role="list">
          {steps.map((step, i) => {
            const IconComponent = step.icon;
            return (
              <article 
                key={i} 
                className="text-center group"
                role="listitem"
              >
                <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-6 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;