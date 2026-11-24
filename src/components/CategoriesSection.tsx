import React from 'react';
import { 
  Code2, 
  Cpu, 
  BarChart3, 
  Briefcase, 
  Layout, 
  Palette, 
  Megaphone, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { Category } from '../types';

interface CategoriesSectionProps {
  categories: Category[];
  onSelectCategory: (categoryName: string) => void;
  onViewAll?: () => void;
}

export const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Code2': return <Code2 className="w-6 h-6" />;
    case 'Cpu': return <Cpu className="w-6 h-6" />;
    case 'BarChart3': return <BarChart3 className="w-6 h-6" />;
    case 'Briefcase': return <Briefcase className="w-6 h-6" />;
    case 'Layout': return <Layout className="w-6 h-6" />;
    case 'Palette': return <Palette className="w-6 h-6" />;
    case 'Megaphone': return <Megaphone className="w-6 h-6" />;
    case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
    case 'TrendingUp': return <TrendingUp className="w-6 h-6" />;
    case 'Sparkles': return <Sparkles className="w-6 h-6" />;
    default: return <BookOpen className="w-6 h-6" />;
  }
};

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  onSelectCategory,
  onViewAll
}) => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider mb-2">
              Explore Disciplines
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              Top Course Categories
            </h2>
            <p className="text-slate-600 mt-2 max-w-xl text-sm sm:text-base">
              Choose from high-impact domains curated by industry veterans. Learn at your own pace with hands-on projects.
            </p>
          </div>

          {onViewAll && (
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 hover:gap-3 transition-all shrink-0 self-start md:self-end"
            >
              Browse All Categories
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Grid (10 categories) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="group relative bg-slate-50/80 hover:bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-brand-300 shadow-xs hover:shadow-xl hover:shadow-brand-500/10 cursor-pointer transition-all duration-300 flex flex-col justify-between"
            >
              {/* Category Icon */}
              <div>
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 bg-gradient-to-br ${cat.gradient} shadow-md group-hover:scale-110 transition-transform`}
                >
                  {getCategoryIcon(cat.icon)}
                </div>
                
                <h3 className="font-bold text-base text-navy-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Footer info */}
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-brand-600">
                <span>{cat.courseCount} Courses</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
