import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Search, 
  Heart, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  ShieldCheck, 
  BookOpen, 
  Award, 
  Menu, 
  X, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { db } from '../services/db';
import { User, Course } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth: (initialMode?: 'login' | 'register') => void;
  onSelectCourse: (course: Course) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAuth,
  onSelectCourse
}) => {
  const [user, setUser] = useState<User | null>(db.getCurrentUser());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Sync state with database changes
  useEffect(() => {
    const handleDbChange = () => {
      const currentUser = db.getCurrentUser();
      setUser(currentUser);
      setWishlistCount(currentUser ? currentUser.wishlistCourseIds.length : 0);
    };

    handleDbChange();
    window.addEventListener('eduversity_db_change', handleDbChange);
    return () => window.removeEventListener('eduversity_db_change', handleDbChange);
  }, []);

  // Handle Search autocomplete
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const allCourses = db.getCourses();
      const filtered = allCourses.filter(c => 
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.instructor.name.toLowerCase().includes(q)
      ).slice(0, 5);
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  // Click outside listener for search & user menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('courses', searchQuery.trim());
      setShowSearchResults(false);
    }
  };

  const handleSelectSearchResult = (course: Course) => {
    onSelectCourse(course);
    setShowSearchResults(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-navy-900 via-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-navy-900 group-hover:text-brand-600 transition-colors">
                EDU<span className="text-brand-600">VERSITY</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1 hidden sm:block">
                Learn Skills. Build Future.
              </span>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-slate-600">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentView === 'home' 
                  ? 'text-brand-600 bg-brand-50/80 font-bold' 
                  : 'hover:text-navy-900 hover:bg-slate-100/70'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('courses')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentView === 'courses' 
                  ? 'text-brand-600 bg-brand-50/80 font-bold' 
                  : 'hover:text-navy-900 hover:bg-slate-100/70'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => onNavigate('categories')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentView === 'categories' 
                  ? 'text-brand-600 bg-brand-50/80 font-bold' 
                  : 'hover:text-navy-900 hover:bg-slate-100/70'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => onNavigate('instructors')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentView === 'instructors' 
                  ? 'text-brand-600 bg-brand-50/80 font-bold' 
                  : 'hover:text-navy-900 hover:bg-slate-100/70'
              }`}
            >
              Instructors
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentView === 'about' 
                  ? 'text-brand-600 bg-brand-50/80 font-bold' 
                  : 'hover:text-navy-900 hover:bg-slate-100/70'
              }`}
            >
              About
            </button>
          </nav>

          {/* Search Bar with live autocomplete */}
          <div ref={searchContainerRef} className="relative hidden md:block flex-1 max-w-xs lg:max-w-sm xl:max-w-md">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search courses, skills, instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.length > 1 && setShowSearchResults(true)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder-slate-400 rounded-full border border-slate-200/80 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-hidden transition-all"
                />
              </div>
            </form>

            {/* Live Autocomplete Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium px-3">
                  <span>Matching Courses</span>
                  <span className="text-brand-600">{searchResults.length} found</span>
                </div>
                <div className="divide-y divide-slate-50 max-h-80 overflow-y-auto">
                  {searchResults.map(c => (
                    <div
                      key={c.id}
                      onClick={() => handleSelectSearchResult(c)}
                      className="p-3 hover:bg-slate-50 cursor-pointer flex items-center gap-3 transition-colors"
                    >
                      <img src={c.thumbnail} alt={c.title} className="w-12 h-9 rounded object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-slate-900 truncate">{c.title}</h4>
                        <p className="text-[11px] text-slate-500 truncate">{c.instructor.name} • {c.category}</p>
                      </div>
                      <span className="text-xs font-bold text-brand-600 shrink-0">
                        {c.price === 0 ? 'FREE' : `$${c.price}`}
                      </span>
                    </div>
                  ))}
                </div>
                <div 
                  onClick={handleSearchSubmit}
                  className="p-2.5 bg-slate-50 text-center text-xs font-semibold text-brand-600 hover:text-brand-700 cursor-pointer border-t border-slate-100"
                >
                  View all results for "{searchQuery}"
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Wishlist Button */}
            {user && (
              <button
                onClick={() => onNavigate('dashboard', 'wishlist')}
                title="Saved Courses"
                className="relative p-2.5 rounded-full text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </button>
            )}

            {/* Auth State */}
            {user ? (
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors border border-slate-200/80"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/30"
                  />
                  <div className="hidden sm:flex flex-col text-left pr-1">
                    <span className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[100px]">
                      {user.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-semibold text-brand-600 uppercase tracking-wider">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-100 text-brand-700">
                        {user.role === 'admin' ? 'Platform Administrator' : 'Verified Student'}
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          onNavigate('dashboard');
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-400" />
                        Student Dashboard
                      </button>

                      <button
                        onClick={() => {
                          onNavigate('dashboard', 'courses');
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                      >
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        My Enrolled Courses
                      </button>

                      <button
                        onClick={() => {
                          onNavigate('dashboard', 'certificates');
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                      >
                        <Award className="w-4 h-4 text-slate-400" />
                        Certificates
                      </button>

                      <button
                        onClick={() => {
                          onNavigate('admin');
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-amber-600 font-semibold hover:bg-amber-50 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-500" />
                        Admin Dashboard
                      </button>
                    </div>

                    {/* Quick Demo Switcher */}
                    <div className="p-2 mx-2 bg-slate-50 rounded-xl my-1 border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Quick Demo Switcher
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => {
                            db.loginAsDemoStudent();
                            setUserMenuOpen(false);
                          }}
                          className={`text-xs py-1 px-2 rounded-lg font-medium transition-colors ${
                            user.role === 'student' ? 'bg-brand-600 text-white' : 'bg-white hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          Student Demo
                        </button>
                        <button
                          onClick={() => {
                            db.loginAsDemoAdmin();
                            setUserMenuOpen(false);
                          }}
                          className={`text-xs py-1 px-2 rounded-lg font-medium transition-colors ${
                            user.role === 'admin' ? 'bg-amber-600 text-white' : 'bg-white hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          Admin Demo
                        </button>
                      </div>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          db.logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-navy-900 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-4 py-2 text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-md shadow-brand-500/20 hover:shadow-lg transition-all"
                >
                  Sign Up Free
                </button>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-navy-900 hover:bg-slate-100 lg:hidden transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          {/* Mobile Search */}
          <form onSubmit={(e) => { handleSearchSubmit(e); setMobileMenuOpen(false); }}>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-100 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </form>

          {/* Links */}
          <div className="flex flex-col space-y-1 text-sm font-semibold text-slate-700">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Home
            </button>
            <button
              onClick={() => { onNavigate('courses'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              All Courses
            </button>
            <button
              onClick={() => { onNavigate('categories'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Browse Categories
            </button>
            <button
              onClick={() => { onNavigate('instructors'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Top Instructors
            </button>
            <button
              onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              About Eduversity
            </button>
            {user && (
              <>
                <button
                  onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
                  className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-brand-600 font-bold"
                >
                  Student Dashboard
                </button>
                <button
                  onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
                  className="text-left px-3 py-2 rounded-lg hover:bg-amber-50 text-amber-600 font-bold"
                >
                  Admin Portal
                </button>
              </>
            )}
          </div>

          {/* Mobile Auth action */}
          {!user && (
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-800 bg-slate-100 rounded-xl hover:bg-slate-200"
              >
                Log In
              </button>
              <button
                onClick={() => { onOpenAuth('register'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 text-center text-sm font-bold text-white bg-brand-600 rounded-xl hover:bg-brand-700 shadow-md shadow-brand-500/20"
              >
                Sign Up Free
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
