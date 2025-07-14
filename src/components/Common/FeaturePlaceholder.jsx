import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Construction, ArrowLeft } from 'lucide-react';

export const FeaturePlaceholder = ({ 
  title, 
  description, 
  icon: Icon, 
  features = [], 
  onBack,
  comingSoon = false 
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {comingSoon ? (
                <Construction className="h-16 w-16 text-muted-foreground" />
              ) : (
                Icon && <Icon className="h-16 w-16 text-primary" />
              )}
            </div>
            <CardTitle className="text-3xl">{title}</CardTitle>
            <p className="text-muted-foreground text-lg mt-2">{description}</p>
          </CardHeader>
          <CardContent>
            {comingSoon ? (
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-4">Coming Soon!</h3>
                <p className="text-muted-foreground">
                  This feature is currently under development. We're working hard to bring you the best research tools.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {features.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Key Features:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium">{feature.title}</h4>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-center py-8 border-t">
                  <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
                  <p className="text-muted-foreground mb-6">
                    This feature will be fully functional in the complete version of ScholarMate.
                  </p>
                  <div className="space-x-4">
                    <Button onClick={onBack}>
                      Back to Dashboard
                    </Button>
                    <Button variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

