import { useEffect, useRef, useState } from 'react';

interface TradingViewChartProps {
  symbol?: string;
  theme?: 'light' | 'dark';
  interval?: string;
  width?: string | number;
  height?: string | number;
  allowSymbolChange?: boolean;
  hideSideToolbar?: boolean;
  hideTopToolbar?: boolean;
  hideLegend?: boolean;
  hideVolume?: boolean;
  backgroundColor?: string;
  gridColor?: string;
  locale?: string;
  timezone?: string;
  style?: string;
  saveImage?: boolean;
  calendar?: boolean;
  details?: boolean;
  hotlist?: boolean;
  withdateranges?: boolean;
  autosize?: boolean;
}

const TradingViewChart = ({
  symbol = 'IDX:BRMS',
  theme = 'dark',
  interval = 'D',
  width = '100%',
  height = 400,
  allowSymbolChange = true,
  hideSideToolbar = true,
  hideTopToolbar = false,
  hideLegend = false,
  hideVolume = false,
  backgroundColor = theme === 'dark' ? '#0F0F0F' : '#FFFFFF',
  gridColor = theme === 'dark'
    ? 'rgba(242, 242, 242, 0.06)'
    : 'rgba(0, 0, 0, 0.06)',
  locale = 'en',
  timezone = 'Etc/UTC',
  style = '1',
  saveImage = true,
  calendar = false,
  details = false,
  hotlist = false,
  withdateranges = false,
  autosize = true,
}: TradingViewChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure component only renders on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const container = containerRef.current;
    if (!container) return;

    // Generate unique ID for this chart instance
    const chartId = `tradingview-chart-${Math.random().toString(36).substr(2, 9)}`;
    container.setAttribute('data-chart-id', chartId);

    // Clear container completely before creating new chart
    container.innerHTML = '';

    // Create new widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container';
    widgetContainer.setAttribute('data-chart-id', chartId);

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = 'calc(100% - 32px)';
    widgetDiv.style.width = '100%';

    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'tradingview-widget-copyright';
    copyrightDiv.innerHTML = `<a href="https://www.tradingview.com/symbols/${symbol.replace(':', '-')}/" rel="noopener nofollow" target="_blank"><span class="blue-text">${symbol} stock chart</span></a><span class="trademark"> by TradingView</span>`;

    widgetContainer.appendChild(widgetDiv);
    widgetContainer.appendChild(copyrightDiv);

    container.appendChild(widgetContainer);

    // Create and inject script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.setAttribute('data-chart-id', chartId);

    const config = {
      allow_symbol_change: allowSymbolChange,
      calendar,
      details,
      hide_side_toolbar: hideSideToolbar,
      hide_top_toolbar: hideTopToolbar,
      hide_legend: hideLegend,
      hide_volume: hideVolume,
      hotlist,
      interval,
      locale,
      save_image: saveImage,
      style,
      symbol,
      theme,
      timezone,
      backgroundColor,
      gridColor,
      withdateranges,
      autosize,
    };

    script.innerHTML = JSON.stringify(config);
    container.appendChild(script);

    // Cleanup function
    return () => {
      if (container) {
        container.innerHTML = ''; // Clear everything
      }
    };
  }, [
    isClient,
    symbol,
    theme,
    interval,
    allowSymbolChange,
    hideSideToolbar,
    hideTopToolbar,
    hideLegend,
    hideVolume,
    backgroundColor,
    gridColor,
    locale,
    timezone,
    style,
    saveImage,
    calendar,
    details,
    hotlist,
    withdateranges,
    autosize,
  ]);

  return (
    <div
      key={`${symbol}-${theme}-${interval}`} // Unique key for React reconciliation
      ref={containerRef}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      className='tradingview-chart-container my-12'
    />
  );
};

export default TradingViewChart;
