import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Info } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface EmotionData {
  emotion: string;
  count: number;
  color: string;
}

interface EmotionSummaryChartProps {
  data: EmotionData[];
}

export function EmotionSummaryChart({ data }: EmotionSummaryChartProps) {
  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Emotion Summary
              <UITooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  Shows which emotions your child practiced this week
                </TooltipContent>
              </UITooltip>
            </CardTitle>
            <CardDescription>Emotions practiced in the last 7 days</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis 
              dataKey="emotion" 
              className="text-sm"
              tick={{ fill: '#6B7280' }}
            />
            <YAxis 
              className="text-sm"
              tick={{ fill: '#6B7280' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
