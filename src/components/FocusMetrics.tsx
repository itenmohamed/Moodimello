import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Info, TrendingUp } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Badge } from './ui/badge';

interface FocusDataPoint {
  day: string;
  attention: number;
  impulseControl: number;
}

interface FocusMetricsProps {
  data: FocusDataPoint[];
}

export function FocusMetrics({ data }: FocusMetricsProps) {
  // Calculate average improvement
  const firstScore = (data[0]?.attention + data[0]?.impulseControl) / 2;
  const lastScore = (data[data.length - 1]?.attention + data[data.length - 1]?.impulseControl) / 2;
  const improvement = ((lastScore - firstScore) / firstScore * 100).toFixed(0);

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              Focus & Attention Metrics
              <UITooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  Performance tracking in attention-based mini-games
                </TooltipContent>
              </UITooltip>
            </CardTitle>
            <CardDescription>Performance in mini-games over time</CardDescription>
          </div>
          
          {parseFloat(improvement) > 0 && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{improvement}%
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis 
              dataKey="day" 
              className="text-sm"
              tick={{ fill: '#6B7280' }}
            />
            <YAxis 
              domain={[0, 100]}
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
            <Legend />
            <Line 
              type="monotone" 
              dataKey="attention" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              name="Attention Score"
              dot={{ fill: '#8B5CF6', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="impulseControl" 
              stroke="#EC4899" 
              strokeWidth={2}
              name="Impulse Control"
              dot={{ fill: '#EC4899', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
