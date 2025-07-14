import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Brain, 
  Quote, 
  FileText, 
  PenTool, 
  RotateCcw, 
  Calendar, 
  BookOpen, 
  StickyNote, 
  MessageCircle, 
  Search, 
  Zap, 
  Download, 
  Users, 
  Newspaper,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigationItems = [
  { key: 'dashboard', icon: Home, href: '/' },
  { key: 'aiResearch', icon: Brain, href: '/ai-research' },
  { key: 'citationGenerator', icon: Quote, href: '/citation-generator' },
  { key: 'smartSummarizer', icon: FileText, href: '/smart-summarizer' },
  { key: 'essayEnhancer', icon: PenTool, href: '/essay-enhancer' },
  { key: 'paraphraser', icon: RotateCcw, href: '/paraphraser' },
  { key: 'studyPlanner', icon: Calendar, href: '/study-planner' },
  { key: 'knowledgeLibrary', icon: BookOpen, href: '/knowledge-library' },
  { key: 'scholarNotes', icon: StickyNote, href: '/scholar-notes' },
  { key: 'scholarChat', icon: MessageCircle, href: '/scholar-chat' },
  { key: 'liveResearch', icon: Search, href: '/live-research' },
  { key: 'automations', icon: Zap, href: '/automations' },
  { key: 'exportCenter', icon: Download, href: '/export-center' },
  { key: 'peerReview', icon: Users, href: '/peer-review' },
  { key: 'journalFinder', icon: Newspaper, href: '/journal-finder' }
];

export const Sidebar = ({ isOpen, onToggle, currentPath, onNavigate }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-50 transition-transform duration-300 ease-in-out",
        "w-64 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-sidebar-primary" />
            <span className="text-xl font-bold text-sidebar-foreground">ScholarMate</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)]">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;
            
            return (
              <Button
                key={item.key}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start text-left",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
                onClick={() => onNavigate(item.href)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {t(item.key)}
              </Button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

