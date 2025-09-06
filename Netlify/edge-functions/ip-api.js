// Netlify Edge Functions IP 地理位置 API
// 文件路径：netlify/edge-functions/ip-api.js 或 api/index.js

// CORS 配置
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*'
}

export const config = { 
  path: "/*"  // 匹配所有路径
}

export default (req, ctx) => {
  // 从 context 获取 IP
  const ip = ctx.ip || '0.0.0.0'
  const { pathname } = new URL(req.url)
  console.log(ip, pathname)
  
  // 路由：/geo - 返回 JSON 格式的地理位置信息
  if (pathname === '/geo') {
    // 构建 geo 对象 - 返回代码格式以保持与其他平台一致
    const geo = {
      // 使用代码而非名称，与 Cloudflare/Vercel 保持一致
      country: ctx.geo?.country?.code || null,           // 国家代码 (如 "US")
      countryRegion: ctx.geo?.subdivision?.code || null, // 州/省代码 (如 "CA")
      city: ctx.geo?.city || null,                      // 城市名称
      region: ctx.server?.region || null,               // 服务器区域
      // 转换为字符串格式，与其他平台保持一致
      latitude: ctx.geo?.latitude !== undefined && ctx.geo?.latitude !== null ? 
                String(ctx.geo.latitude) : null,
      longitude: ctx.geo?.longitude !== undefined && ctx.geo?.longitude !== null ? 
                 String(ctx.geo.longitude) : null,
      asOrganization: null  // Netlify 不提供此信息
    }
    
    console.log(geo)
    
    // 使用 ctx.json() 返回 - Netlify 特有方法
    return ctx.json({
      ip,
      ...geo
    }, {
      headers: {
        ...CORS_HEADERS,
        'x-client-ip': ip
      }
    })
  }
  
  // 路由：/ - 返回纯文本 IP 地址
  return new Response(ip, {
    headers: {
      ...CORS_HEADERS,
      'x-client-ip': ip
    }
  })
}
