import React from 'react';
import { useTranslation } from 'react-i18next';
import { Brain } from 'lucide-react';
import { FeaturePlaceholder } from '@/components/Common/FeaturePlaceholder';

export const AIResearch = ({ onNavigate }) => {
  const { t } = useTranslation();

  const features = [
    {
      title: "Intelligent Research Questions",
      description: "Ask complex research questions and get AI-powered responses with credible sources."
    },
    {
      title: "Multiple Perspectives",
      description: "Toggle to see different viewpoints and counter-arguments for balanced research."
    },
    {
      title: "Source Citations",
      description: "Automatically generated citations for all sources used in responses."
    },
    {
      title: "Follow-up Questions",
      description: "Continue the conversation with follow-up questions for deeper insights."
    }
  ];

  return (
    <FeaturePlaceholder
      title={t('aiResearch')}
      description="Get intelligent research assistance with AI-powered responses and credible sources"
      icon={Brain}
      features={features}
      onBack={() => onNavigate('/')}
    />
  );
};

