import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'chart.js/auto';
import Sidebar from '../../components/Sidebar/Sidebar';
import { fetchAnalytics } from '../../redux/chatSlice';
import './AnalyticsStyle.css';

const Analytics = () => {
  const dispatch = useDispatch();
  const { analytics, loading, error } = useSelector((state) => state.chat);
  const chartRef = useRef(null);

  // Fetch analytics data on mount
  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  // Render the chart when analytics data is available
  useEffect(() => {
    if (analytics && analytics.missedChats) {
      const missedChatsData = Object.values(analytics.missedChats);
      const ctx = document.getElementById('missedChatsChart');

      // Ensure canvas exists
      if (!ctx) return;

      try {
        // Destroy previous chart if it exists
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        // Create new chart and store reference
        chartRef.current = new Chart(ctx.getContext('2d'), {
          type: 'line',
          data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5',
                    'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10'],
            datasets: [{
              label: 'Chats',
              data: missedChatsData,
              borderColor: '#34C759',
              backgroundColor: '#34C759',
              fill: false,
              tension: 0.4,
              pointRadius: 5,
              pointBackgroundColor: '#34C759',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 25,
                ticks: {
                  stepSize: 5,
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `Chats: ${context.parsed.y}`;
                  }
                }
              }
            },
          }
        });
      } catch (err) {
        console.error('Failed to create chart:', err);
      }
    }

    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [analytics]);

  // Format average reply time
  const formatReplyTime = (secondsStr) => {
    const seconds = parseFloat(secondsStr);
    if (isNaN(seconds)) return '0 sec';
    if (seconds < 60) return `${Math.round(seconds)} sec`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    if (minutes < 60) return `${minutes}m ${remainingSeconds}s`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="analytics-page">
      <Sidebar />
      <div className="main-content">
        <h3>Analytics</h3>
        {error && <div className="error-message">{error}</div>}
        
        <div className="analytics-section">
          <div className="analytics-chart-item">
            <h4>Missed Chats</h4>
            {loading ? (
              <div className="chart-loading">Loading chart data...</div>
            ) : (
              <div className="chart-container">
                <canvas id="missedChatsChart" height="200"></canvas>
              </div>
            )}
          </div>
          
          <div className="analytics-item">
            <div className="metric-average-reply-time">
            <h4>Average Reply time</h4>
            <p>For the highest customer satisfaction rates you should aim to reply to an incoming customer's message in 15 seconds or less.</p>
            </div>
            <span className="metric-value">
              {loading ? 'Loading...' : analytics ? formatReplyTime(analytics.averageReplyTime) : 'N/A'}
            </span>
          </div>
          
          <div className="analytics-item">
            <div className="metric-ticket">
            <h4>Resolved Tickets</h4>
            <p>A callback system on a website, as well as proactive invitations, help to attract even MORE customers.</p>
            </div>
            
            <div className="progress-circle">
              <svg width="100" height="100">
                <circle cx="50" cy="50" r="40" stroke="#e0e0e0" strokeWidth="10" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#34C759"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="251.2"
                  strokeDashoffset={loading || !analytics ? 251.2 : 251.2 * (1 - parseFloat(analytics.resolvedTicketsPercentage) / 100)}
                />
                <text x="50" y="55" textAnchor="middle" fill="#34C759" fontSize="20">
                  {loading ? '...' : analytics ? `${parseFloat(analytics.resolvedTicketsPercentage)}%` : '0%'}
                </text>
              </svg>
            </div>
          </div>
          
          <div className="analytics-item">
            <div className="metric-chats">
            <h4>Total Chats</h4>
            <p>This metric SHOWS the total number of chats for ALL Channels for the selected period.</p>
            </div>
            
            <span className="metric-value">
              {loading ? 'Loading...' : analytics ? `${analytics.totalChats} Chats` : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;