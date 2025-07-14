import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';
import { FeaturePlaceholder } from '@/components/Common/FeaturePlaceholder';

export const SmartSummarizer = ({ onNavigate }) => {
  const { t } = useTranslation();

  const features = [
    {
      title: "Multiple Input Types",
      description: "Summarize PDFs, research papers, website URLs, and YouTube videos."
    },
    {
      title: "Flexible Output Formats",
      description: "Choose from one-liner, paragraph, or bullet point summaries."
    },
    {
      title: "Explain Like I'm 5",
      description: "Toggle for simplified explanations of complex topics."
    },
    {
      title: "Key Points Highlighting",
      description: "Highlight and save the most important points from summaries."
    }
  ];

  return (
    <FeaturePlaceholder
      title={t('smartSummarizer')}
      description="Intelligently summarize documents, papers, and videos with AI"
      icon={FileText}
      features={features}
      onBack={() => onNavigate('/')}
    />
  );
};

