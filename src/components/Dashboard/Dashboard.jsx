import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Brain, 
  Quote, 
  FileText, 
  PenTool, 
  RotateCcw, 
  Calendar,
  Clock,
  TrendingUp,
  BookOpen,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const quickAccessItems = [
  { key: 'aiResearch', icon: Brain, href: '/ai-research', color: 'bg-blue-500' },
  { key: 'citationGenerator', icon: Quote, href: '/citation-generator', color: 'bg-green-500' },
  { key: 'smartSummarizer', icon: FileText, href: '/smart-summarizer', color: 'bg-purple-500' },
  { key: 'essayEnhancer', icon: PenTool, href: '/essay-enhancer', color: 'bg-orange-500' },
  { key: 'paraphraser', icon: RotateCcw, href: '/paraphraser', color: 'bg-pink-500' },
  { key: 'studyPlanner', icon: Calendar, href: '/study-planner', color: 'bg-indigo-500' }
];

export const Dashboard = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { user, recentActivity } = useAuth();

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          {t('welcome')}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t('welcomeMessage')}
        </p>
        {user && (
          <p className="text-lg text-muted-foreground mt-2">
            Welcome back, {user.name}!
          </p>
        )}
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Zap className="mr-2 h-6 w-6" />
          {t('quickAccess')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickAccessItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card 
                key={item.key}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => onNavigate(item.href)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${item.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {t(item.key)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Click to access
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              {t('recentActivity')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      {activity.details && (
                        <p className="text-xs text-muted-foreground">{activity.details}</p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No recent activity. Start using ScholarMate to see your activity here!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Research Questions Asked</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Citations Generated</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Documents Summarized</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Essays Enhanced</span>
                <span className="font-semibold">0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            Getting Started
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">New to ScholarMate?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Start with our AI Research Assistant to ask your first research question.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('/ai-research')}
              >
                Ask Your First Question
              </Button>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Need Citations?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Generate properly formatted citations for your research papers.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('/citation-generator')}
              >
                Generate Citation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

