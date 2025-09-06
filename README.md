# 🌍 IP Geolocation API

一个简单、快速、免费的 IP 地理位置查询 API，支持 Cloudflare Workers 和 Vercel Edge Functions 部署。

## ✨ 特性

- 🚀 **极速响应** - 基于边缘计算，全球节点就近响应
- 🆓 **完全免费** - 使用平台免费额度，无需付费
- 🌐 **全球覆盖** - 准确识别全球 IP 地理位置
- 🔒 **隐私安全** - 不记录任何访问日志
- 📦 **零依赖** - 无需数据库，无需维护
- 🎯 **双平台支持** - Cloudflare 和 Vercel 任选其一

## 🚀 一键部署

### 部署到 Cloudflare Workers

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/YOUR_USERNAME/YOUR_REPO)

### 部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO)

## 📖 浏览器部署指南

### 🟠 Cloudflare Workers 部署（推荐）

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
   - 复制 [`cloudflare/worker.js`](./cloudflare/worker.js) 的内容粘贴
   - 点击 `Save and Deploy`

4. **完成！**
   - 你的 API 地址：`https://ip-api.[你的子域名].workers.dev`
   - 测试：访问 `https://ip-api.[你的子域名].workers.dev/geo`

### 🔺 Vercel 部署

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
   - 测试：访问 `https://[项目名].vercel.app/geo`

## 📡 API 使用说明

### 端点说明

| 端点 | 方法 | 返回格式 | 说明 |
|------|------|----------|------|
| `/` | GET | 纯文本 | 返回访问者 IP 地址 |
| `/geo` | GET | JSON | 返回 IP 和地理位置信息 |

### 响应示例

#### 获取 IP 地址

**请求：**
```bash
curl https://your-api.workers.dev/
```

**响应：**
```
8.8.8.8
```

#### 获取地理位置信息

**请求：**
```bash
curl https://your-api.workers.dev/geo
```

**响应：**
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

### JavaScript/Node.js

```javascript
// 获取 IP
fetch('https://your-api.workers.dev/')
  .then(res => res.text())
  .then(ip => console.log('IP:', ip));

// 获取地理位置
fetch('https://your-api.workers.dev/geo')
  .then(res => res.json())
  .then(data => {
    console.log('位置:', data.city, data.country);
    console.log('坐标:', data.latitude, data.longitude);
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

### HTML/前端

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

## 📊 返回字段说明

| 字段 | 类型 | 说明 | Cloudflare | Vercel |
|------|------|------|------------|---------|
| `ip` | string | 访问者 IP 地址 | ✅ | ✅ |
| `country` | string | 国家代码 (ISO 3166-1 alpha-2) | ✅ | ✅ |
| `countryRegion` | string | 州/省代码 | ✅ | ✅ |
| `city` | string | 城市名称 | ✅ | ✅ |
| `region` | string | 地区/数据中心代码 | ✅ | ✅ |
| `latitude` | string | 纬度坐标 | ✅ | ✅ |
| `longitude` | string | 经度坐标 | ✅ | ✅ |
| `asOrganization` | string/null | ISP/组织名称 | ✅ | ❌ |

> **注意**：`asOrganization` 字段仅在 Cloudflare Workers 可用，Vercel 返回 `null`。

## 🌐 在线演示

你可以使用以下公共演示 API 进行测试（请勿用于生产环境）：

- **Cloudflare Demo**: `https://ip-api-demo.workers.dev/geo`
- **Vercel Demo**: `https://ip-api-demo.vercel.app/geo`

## ⚡ 性能对比

| 平台 | 响应时间 | 全球节点 | 免费额度 |
|------|----------|----------|----------|
| Cloudflare Workers | ~10-50ms | 275+ 个城市 | 100,000 请求/天 |
| Vercel Edge | ~20-80ms | 20+ 个区域 | 100GB 带宽/月 |

## 🔒 安全与隐私

### CORS 配置
默认允许所有域名访问。如需限制，修改 `CORS_HEADERS`：
```javascript
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://yourdomain.com'  // 限制特定域名
}
```

### 隐私保护
- ✅ 不记录任何访问日志
- ✅ 不存储用户数据
- ✅ 仅返回公开的地理位置信息
- ✅ 精度限制在城市级别

### 请求限制
- **Cloudflare Workers**
  - 免费计划：100,000 请求/天
  - CPU 时间：10ms
  
- **Vercel Edge Functions**
  - 免费计划：100GB 带宽/月
  - 执行时间：无限制

## 🛠 本地开发

### Cloudflare Workers

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 克隆仓库
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# 本地开发
wrangler dev cloudflare/worker.js

# 部署
wrangler deploy cloudflare/worker.js
```

### Vercel

```bash
# 安装 Vercel CLI
npm install -g vercel

# 克隆仓库
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# 安装依赖
npm install

# 本地开发
vercel dev

# 部署
vercel --prod
```

## 📝 项目结构

```
├── README.md           # 本文档
├── LICENSE            # 许可证
├── cloudflare/
│   └── worker.js      # Cloudflare Workers 代码
├── vercel/
│   └── middleware.js  # Vercel Edge Functions 代码
└── package.json       # Vercel 依赖配置
```

## 🤔 常见问题

<details>
<summary><b>Q: 返回 IP 为 0.0.0.0？</b></summary>

这通常发生在本地开发环境。请确保：
- 已正确部署到 Cloudflare/Vercel
- 使用线上 URL 而非 localhost
</details>

<details>
<summary><b>Q: 地理位置不准确？</b></summary>

IP 地理位置数据库的准确度：
- 国家级别：99.8% 准确
- 城市级别：80-90% 准确
- VPN/代理 IP 可能显示错误位置
</details>

<details>
<summary><b>Q: 如何提高请求限制？</b></summary>

- Cloudflare：升级到 Workers Paid 计划（$5/月起）
- Vercel：升级到 Pro 计划（$20/月起）
- 或部署多个实例进行负载均衡
</details>

<details>
<summary><b>Q: 支持 IPv6 吗？</b></summary>

是的，两个平台都完全支持 IPv6 地址。
</details>

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 随意使用，无需署名

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=YOUR_USERNAME/YOUR_REPO&type=Date)](https://star-history.com/#YOUR_USERNAME/YOUR_REPO&Date)

## 🙏 致谢

- [Cloudflare Workers](https://workers.cloudflare.com/) - 提供边缘计算平台
- [Vercel Edge Functions](https://vercel.com/docs/functions) - 提供边缘函数服务
- 所有贡献者和使用者

---

**如果这个项目对你有帮助，请给个 ⭐ Star 支持一下！**
