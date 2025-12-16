import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles, TrendingUp, AlertCircle } from 'lucide-react';

interface WeeklyReportProps {
  report: {
    summary: string;
    highlights: string[];
    concerns: string[];
    recommendations: string[];
  };
}

export function WeeklyReport({ report }: WeeklyReportProps) {
  return (
    <Card className="border-2 bg-gradient-to-br from-purple-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          AI-Generated Weekly Report
        </CardTitle>
        <CardDescription>Natural language summary of emotional trends</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div className="bg-white rounded-lg p-4 border">
          <p className="text-sm text-gray-700 leading-relaxed">
            {report.summary}
          </p>
        </div>

        {/* Highlights */}
        {report.highlights.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-700">Key Highlights</span>
            </div>
            <div className="space-y-2">
              {report.highlights.map((highlight, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-green-100">
                  <p className="text-sm text-gray-700">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Concerns */}
        {report.concerns.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-gray-700">Areas to Watch</span>
            </div>
            <div className="space-y-2">
              {report.concerns.map((concern, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-orange-100">
                  <p className="text-sm text-gray-700">{concern}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {report.recommendations.length > 0 && (
          <div className="space-y-2">
            <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
              AI Recommendations
            </Badge>
            <ul className="space-y-2">
              {report.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-purple-500">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
