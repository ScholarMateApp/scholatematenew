import React from 'react';
import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';
import { FeaturePlaceholder } from '@/components/Common/FeaturePlaceholder';

export const CitationGenerator = ({ onNavigate }) => {
  const { t } = useTranslation();

  const features = [
    {
      title: "Multiple Input Methods",
      description: "Input via URL, PDF upload, DOI, or manual entry for maximum flexibility."
    },
    {
      title: "All Citation Styles",
      description: "Support for APA, MLA, Chicago, Harvard, BibTeX, and more citation formats."
    },
    {
      title: "Auto-Detection",
      description: "Automatically detect existing citation style in your document."
    },
    {
      title: "Export Options",
      description: "Copy to clipboard, download as file, or email citations directly."
    }
  ];

  return (
    <FeaturePlaceholder
      title={t('citationGenerator')}
      description="Generate properly formatted citations in multiple academic styles"
      icon={Quote}
      features={features}
      onBack={() => onNavigate('/')}
    />
  );
};

