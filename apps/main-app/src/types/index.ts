export interface MenuItem {
  path: string;
  icon: any;
  label: string;
  subtitle: string;
}

export interface IndexItem {
  id: string;
  name: string;
  time: string;
  status: 'Running' | 'Completed';
  performance: string;
  health: 'healthy' | 'issues';
}

export interface Activity {
  action: string;
  index: string;
  time: string;
  status: 'success' | 'warning' | 'info';
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: JSX.Element;
  iconBgColor?: string;
  subtitleColor?: string;
}