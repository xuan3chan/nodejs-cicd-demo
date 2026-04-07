const http = require('http');
const os = require('os');

const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || '1.0.0';
const NODE_ENV = process.env.NODE_ENV || 'development';

const getHealthInfo = () => ({
  status: 'healthy',
  version: APP_VERSION,
  environment: NODE_ENV,
  timestamp: new Date().toISOString(),
  uptime: `${Math.floor(process.uptime())}s`,
  hostname: os.hostname(),
  memory: {
    used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
    total: `${Math.round(os.totalmem() / 1024 / 1024)}MB`,
  },
});

const HTML_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Node.js CI/CD Demo</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
      color: #e0e0e0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 40px;
      max-width: 600px;
      width: 90%;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
    h1 {
      font-size: 2rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }
    .badge {
      display: inline-block;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-bottom: 24px;
    }
    .info-grid {
      display: grid;
      gap: 12px;
      margin-top: 20px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.06);
    }
    .info-label {
      color: #9ca3af;
      font-size: 0.85rem;
    }
    .info-value {
      color: #e5e7eb;
      font-weight: 500;
      font-size: 0.9rem;
    }
    .status-dot {
      display: inline-block;
      width: 8px; height: 8px;
      background: #34d399;
      border-radius: 50%;
      margin-right: 6px;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    .footer {
      margin-top: 24px;
      text-align: center;
      color: #6b7280;
      font-size: 0.8rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 Node.js CI/CD Demo</h1>
    <span class="badge">v{{VERSION}}</span>
    <div class="info-grid">
      <div class="info-row">
        <span class="info-label">Status</span>
        <span class="info-value"><span class="status-dot"></span>Healthy</span>
      </div>
      <div class="info-row">
        <span class="info-label">Environment</span>
        <span class="info-value">{{ENV}}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Hostname</span>
        <span class="info-value">{{HOSTNAME}}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Uptime</span>
        <span class="info-value">{{UPTIME}}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Memory Used</span>
        <span class="info-value">{{MEMORY}}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Timestamp</span>
        <span class="info-value">{{TIMESTAMP}}</span>
      </div>
    </div>
    <div class="footer">
      Deployed via CI/CD Pipeline 🔄
    </div>
  </div>
</body>
</html>
`;

const renderHTML = (info) => {
  return HTML_TEMPLATE
    .replace('{{VERSION}}', info.version)
    .replace('{{ENV}}', info.environment)
    .replace('{{HOSTNAME}}', info.hostname)
    .replace('{{UPTIME}}', info.uptime)
    .replace('{{MEMORY}}', info.memory.used)
    .replace('{{TIMESTAMP}}', info.timestamp);
};

const server = http.createServer((req, res) => {
  const info = getHealthInfo();

  if (req.url === '/health' || req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(info, null, 2));
    return;
  }

  if (req.url === '/api/info') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      app: 'nodejs-cicd-demo',
      ...info,
    }, null, 2));
    return;
  }

  // Serve HTML for all other routes
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(renderHTML(info));
});

server.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║   🚀 Node.js CI/CD Demo Server          ║
║   Version: ${APP_VERSION.padEnd(29)}║
║   Port:    ${String(PORT).padEnd(29)}║
║   Env:     ${NODE_ENV.padEnd(29)}║
╚══════════════════════════════════════════╝
  `);
});

module.exports = { getHealthInfo, server };
