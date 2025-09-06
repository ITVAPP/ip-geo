# 🌍 IP Geolocation API

一个简单、快速、免费的 IP 地理位置查询 API，支持 Cloudflare Workers、Vercel Edge Functions 和 Netlify Edge Functions 三大平台部署。

## ✨ 特性

- 🚀 **极速响应** - 基于边缘计算，全球节点就近响应
- 🆓 **完全免费** - 使用平台免费额度，零成本运行
- 🌐 **全球覆盖** - 准确识别全球 IP 地理位置
- 🔒 **隐私安全** - 不记录任何访问日志
- 📦 **零依赖** - 无需数据库，无需维护
- 🎯 **三平台支持** - 任选其一或同时部署实现高可用

## 🚀 一键部署

### Cloudflare Workers
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ITVAPP/ip-geo)

### Vercel Edge Functions
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ITVAPP/ip-geo)

### Netlify Edge Functions
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ITVAPP/ip-geo)

## 📖 手动部署指南

### 🟠 Cloudflare Workers（推荐）

1. **登录 Cloudflare Dashboard**
   - 访问 [dash.cloudflare.com](https://dash.cloudflare.com)
   - 使用邮箱注册/登录（免费）

2. **创建 Worker**
   - 点击左侧菜单 `Workers & Pages`
   - 点击 `Create Application` → `Create Worker`
   - 输入名称（如 `ip-api`）→ 点击 `Deploy`

3. **添加代码**
   - 点击 `Quick Edit` 按钮
   - 删除默认代码
   - 复制 [`Cloudflare/worker.js`](./Cloudflare/worker.js) 的内容粘贴
   - 点击 `Save and Deploy`

4. **完成！**
   - 你的 API 地址：`https://ip-api.[你的子域名].workers.dev`

> **注意**：如果使用 Cloudflare Pages 部署，会自动使用根目录的 `_worker.js` 文件

### 🔺 Vercel Edge Functions

1. **Fork 本仓库**
   - 点击本页面右上角的 `Fork` 按钮

2. **导入到 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 `New Project`
   - 选择 `Import Git Repository`
   - 选择你 Fork 的仓库

3. **部署**
   - 无需任何配置，直接点击 `Deploy`
   - 等待部署完成（约 1 分钟）

4. **完成！**
   - 你的 API 地址：`https://[项目名].vercel.app`

### 🟦 Netlify Edge Functions

1. **Fork 本仓库**
   - 点击本页面右上角的 `Fork` 按钮

2. **导入到 Netlify**
   - 访问 [app.netlify.com](https://app.netlify.com)
   - 点击 `Add new site` → `Import an existing project`
   - 选择 GitHub 并授权
   - 选择你 Fork 的仓库

3. **配置部署**
   - Build command: 留空
   - Publish directory: 留空或填 `.`
   - 点击 `Deploy site`

4. **完成！**
   - 你的 API 地址：`https://[项目名].netlify.app`

## 📡 API 使用说明

### 端点说明

| 端点 | 方法 | 返回格式 | 说明 |
|------|------|----------|------|
| `/` | GET | 纯文本 | 返回访问者 IP 地址 |
| `/geo` | GET | JSON | 返回 IP 和地理位置信息 |

### 响应示例

#### 获取 IP 地址
```bash
curl https://your-api.workers.dev/
```
响应：
```
8.8.8.8
```

#### 获取地理位置信息
```bash
curl https://your-api.workers.dev/geo
```
响应：
```json
{
  "ip": "8.8.8.8",
  "country": "US",
  "countryRegion": "CA",
  "city": "Mountain View",
  "region": "SJC",
  "latitude": "37.386",
  "longitude": "-122.084",
  "asOrganization": "Google LLC"
}
```

## 💻 代码示例

### JavaScript
```javascript
// 获取 IP
fetch('https://your-api.workers.dev/')
  .then(res => res.text())
  .then(ip => console.log('IP:', ip));

// 获取地理位置
fetch('https://your-api.workers.dev/geo')
  .then(res => res.json())
  .then(data => {
    console.log(`位置: ${data.city}, ${data.country}`);
    console.log(`坐标: ${data.latitude}, ${data.longitude}`);
  });
```

### Python
```python
import requests

# 获取 IP
ip = requests.get('https://your-api.workers.dev/').text
print(f'IP: {ip}')

# 获取地理位置
geo = requests.get('https://your-api.workers.dev/geo').json()
print(f"位置: {geo['city']}, {geo['country']}")
print(f"坐标: {geo['latitude']}, {geo['longitude']}")
```

### cURL
```bash
# 获取 IP
curl https://your-api.workers.dev/

# 获取地理位置（格式化输出）
curl https://your-api.workers.dev/geo | json_pp
```

### PHP
```php
// 获取 IP
$ip = file_get_contents('https://your-api.workers.dev/');
echo "IP: " . $ip;

// 获取地理位置
$geo = json_decode(file_get_contents('https://your-api.workers.dev/geo'), true);
echo "位置: " . $geo['city'] . ", " . $geo['country'];
```

### HTML 示例
```html
<!DOCTYPE html>
<html>
<head>
    <title>IP 地理位置示例</title>
</head>
<body>
    <div id="info">加载中...</div>
    
    <script>
    fetch('https://your-api.workers.dev/geo')
        .then(res => res.json())
        .then(data => {
            document.getElementById('info').innerHTML = `
                <h3>访客信息</h3>
                <p>IP: ${data.ip}</p>
                <p>位置: ${data.city}, ${data.country}</p>
                <p>坐标: ${data.latitude}, ${data.longitude}</p>
                <p>运营商: ${data.asOrganization || '未知'}</p>
            `;
        })
        .catch(err => {
            document.getElementById('info').innerHTML = '获取失败';
        });
    </script>
</body>
</html>
```

## 📊 返回字段说明

| 字段 | 类型 | 说明 | Cloudflare | Vercel | Netlify |
|------|------|------|------------|---------|----------|
| `ip` | string | 访问者 IP 地址 | ✅ | ✅ | ✅ |
| `country` | string | 国家代码 (ISO 3166-1) | ✅ | ✅ | ✅ |
| `countryRegion` | string | 州/省代码 | ✅ | ✅ | ✅ |
| `city` | string | 城市名称 | ✅ | ✅ | ✅ |
| `region` | string | 地区/数据中心代码 | ✅ | ✅ | ✅ |
| `latitude` | string | 纬度坐标 | ✅ | ✅ | ✅ |
| `longitude` | string | 经度坐标 | ✅ | ✅ | ✅ |
| `asOrganization` | string/null | ISP/组织名称 | ✅ | ❌ | ❌ |

> **注意**：`asOrganization` 字段仅在 Cloudflare Workers 返回实际值，Vercel 和 Netlify 返回 `null`。

## ⚡ 平台对比

| 特性 | Cloudflare Workers | Vercel Edge | Netlify Edge |
|------|-------------------|-------------|--------------|
| **免费额度** | 100,000 请求/天 | 100GB 带宽/月 | 125,000 请求/月 |
| **全球节点** | 275+ 个城市 | 20+ 个区域 | 全球 CDN |
| **响应时间** | ~10-50ms | ~20-80ms | ~30-90ms |
| **冷启动** | 几乎无 | 极低 | 低 |
| **地理数据** | 最完整 | 基础 | 基础 |
| **部署难度** | ⭐ 简单 | ⭐ 简单 | ⭐⭐ 中等 |

## 🔒 配置与安全

### CORS 配置
默认允许所有域名访问。如需限制，修改代码中的 `CORS_HEADERS`：
```javascript
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://yourdomain.com'  // 限制特定域名
}
```

### 请求限制
- **Cloudflare**：免费 100,000 请求/天，10ms CPU 时间
- **Vercel**：免费 100GB 带宽/月，无请求数限制
- **Netlify**：免费 125,000 请求/月，100GB 带宽

### 隐私说明
- ✅ 不记录访问日志
- ✅ 不存储用户数据
- ✅ 仅返回公开地理位置信息
- ✅ 城市级别精度

## 📁 项目结构

```
├── _worker.js             # Cloudflare Pages 自动识别文件
├── middleware.js          # Vercel Edge Functions 代码
├── Cloudflare/
│   └── worker.js          # Cloudflare Workers 代码
├── Netlify/
│   └── edge-functions/
│       └── ip-api.js      # Netlify Edge Functions 代码
├── package.json           # Vercel 依赖配置
├── netlify.toml          # Netlify 配置
└── README.md             # 本文档
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 免费使用，无需署名

---

**如果这个项目对你有帮助，请给个 ⭐ Star 支持一下！**
