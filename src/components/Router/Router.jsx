import React from 'react';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { AIResearch } from '@/pages/AIResearch';
import { CitationGenerator } from '@/pages/CitationGenerator';
import { SmartSummarizer } from '@/pages/SmartSummarizer';
import { FeaturePlaceholder } from '@/components/Common/FeaturePlaceholder';
import { 
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
  Newspaper 
} from 'lucide-react';

export const Router = ({ currentPath, onNavigate }) => {
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Dashboard onNavigate={onNavigate} />;
      case '/ai-research':
        return <AIResearch onNavigate={onNavigate} />;
      case '/citation-generator':
        return <CitationGenerator onNavigate={onNavigate} />;
      case '/smart-summarizer':
        return <SmartSummarizer onNavigate={onNavigate} />;
      case '/essay-enhancer':
        return (
          <FeaturePlaceholder
            title="Essay Enhancer & Rewriter"
            description="Improve grammar, tone, coherence, and logic in your academic writing"
            icon={PenTool}
            features={[
              { title: "Grammar & Style", description: "Advanced grammar checking and style improvements" },
              { title: "Tone Adjustment", description: "Make your writing more academic, simple, or persuasive" },
              { title: "Logic Analysis", description: "Detect weak arguments and get improvement suggestions" },
              { title: "Coherence Check", description: "Ensure your ideas flow logically throughout your essay" }
            ]}
            onBack={() => onNavigate('/')}
          />
        );
      case '/paraphraser':
        return (
          <FeaturePlaceholder
            title="Paraphraser & Anti-Plagiarism"
            description="Rewrite text to avoid plagiarism while maintaining meaning"
            icon={RotateCcw}
            features={[
              { title: "Smart Paraphrasing", description: "AI-powered text rewriting that preserves meaning" },
              { title: "Side-by-side View", description: "Compare original and paraphrased text easily" },
              { title: "Plagiarism Detection", description: "Real-time plagiarism scoring and feedback" },
              { title: "Multiple Variations", description: "Generate multiple paraphrased versions to choose from" }
            ]}
            onBack={() => onNavigate('/')}
          />
        );
      case '/study-planner':
        return (
          <FeaturePlaceholder
            title="Study & Research Planner"
            description="Organize your research goals, tasks, and deadlines effectively"
            icon={Calendar}
            features={[
              { title: "Goal Setting", description: "Create and track research goals with deadlines" },
              { title: "Auto Task Creation", description: "Automatically generate to-do lists from your goals" },
              { title: "Calendar Integration", description: "Daily and weekly views with smart suggestions" },
              { title: "Reminders", description: "Email and push notifications for important deadlines" }
            ]}
            onBack={() => onNavigate('/')}
          />
        );
      case '/knowledge-library':
        return (
          <FeaturePlaceholder
            title="Knowledge Library"
            description="Save, organize, and share your research findings"
            icon={BookOpen}
            features={[
              { title: "Smart Organization", description: "Tag, folder, and search your saved content" },
              { title: "Collaboration", description: "Share with co-authors and collaborators" },
              { title: "Advanced Search", description: "Find content quickly with powerful search filters" },
              { title: "Export Options", description: "Export your library in various formats" }
            ]}
            onBack={() => onNavigate('/')}
          />
        );
      case '/scholar-notes':
        return (
          <FeaturePlaceholder
            title="Scholar Notes AI"
            description="Transform voice notes and drafts into structured academic content"
            icon={StickyNote}
            features={[
              { title: "Voice to Text", description: "Upload voice notes and get structured text" },
              { title: "Auto-Structure", description: "Organize content into paragraphs, topics, and arguments" },
              { title: "Citation Integration", description: "Automatically add relevant citations to your notes" },
              { title: "Essay Conversion", description: "Convert notes to essay format with AI enhancement" }
            ]}
            onBack={() => onNavigate('/')}
          />
        );
      case '/scholar-chat':
        return (
          <FeaturePlaceholder
            title="ScholarChat"
            description="Interactive AI chat trained on your research content"
            icon={MessageCircle}
            features={[
              { title: "Context-Aware Chat", description: "AI trained on your uploaded PDFs and notes" },
              { title: "Follow-up Questions", description: "Continue conversations for deeper insights" },
              { title: "Memory Integration", description: "Chat remembers your research context" },
              { title: "Tailored Responses", description: "Answers customized to your research focus" }
            ]}
            onBack={() => onNavigate('/')}
          />
        );
      case '/live-research':
        return (
          <FeaturePlaceholder
            title="Live Research Tool"
            description="Search academic databases and web sources in real-time"
            icon={Search}
            features={[
              { title: "Academic Search", description: "Search across academic databases and journals" },
              { title: "Smart Filtering", description: "Filter by date, source type, and domain" },
              { title: "Trust Scoring", description: "Get reliability scores for sources" },
              { title: "Quick Citations", description: "Easily cite top results from your searches" }
            ]}
            onBack={() => onNavigate('/')}
          />
        );
      case '/automations':
        return (
          <FeaturePlaceholder
            title="Custom Automations"
            description="Automate your research workflow with smart triggers"
            icon={Zap}
            features={[
              { title: "Workflow Automation", description: "Create custom research workflows" },
              { title: "Calendar Integration", description: "Connect with your calendar and email" },
              { title: "Scheduled Tasks", description: "Run automations on schedule or triggers" },
              { title: "Notion Integration", description: "Sync with your Notion workspace" }
            ]}
            onBack={() => onNavigate('/')}
          />
        );
      case '/export-center':
        return (
          <FeaturePlaceholder
            title="Export Center"
            description="Export your research in multiple formats"
            icon={Download}
            features={[
              { title: "Multiple Formats", description: "Export as PDF, Word Doc, Plain Text, BibTeX" },
              { title: "Bundle Export", description: "Combine citations, summaries, and notes" },
              { title: "Custom Templates", description: "Use predefined or custom export templates" },
              { title: "Batch Export", description: "Export multiple items at once" }
            ]}
            onBack={() => onNavigate('/')}
          />
        );
      case '/peer-review':
        return (
          <FeaturePlaceholder
            title="AI Peer Review Tool"
            description="Get AI-powered feedback on your research papers"
            icon={Users}
            features={[
              { title: "Comprehensive Review", description: "Analysis of logic, clarity, depth, and structure" },
              { title: "Section Feedback", description: "Detailed feedback for each section of your paper" },
              { title: "Scoring System", description: "Quantitative scores for different aspects" },
              { title: "Improvement Suggestions", description: "Actionable recommendations for enhancement" }
            ]}
            onBack={() => onNavigate('/')}
          />
        );
      case '/journal-finder':
        return (
          <FeaturePlaceholder
            title="Journal Finder"
            description="Find the perfect journal for your research paper"
            icon={Newspaper}
            features={[
              { title: "Smart Matching", description: "AI suggests journals based on your paper topic" },
              { title: "Impact Factor Filter", description: "Filter by impact factor and rankings" },
              { title: "Open Access Options", description: "Find open-access publication opportunities" },
              { title: "Submission Guidelines", description: "Direct links to submission requirements" }
            ]}
            onBack={() => onNavigate('/')}
          />
        );
      default:
        return <Dashboard onNavigate={onNavigate} />;
    }
  };

  return renderPage();
};

