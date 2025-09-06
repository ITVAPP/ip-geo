// Vercel Edge Functions IP 地理位置 API

import { ipAddress, geolocation, json } from '@vercel/edge'

// CORS 配置
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*'
}

export default function middleware(request) {
  try {
    // 获取客户端 IP - 添加默认值处理
    const ip = ipAddress(request) || '0.0.0.0'
    const { pathname } = new URL(request.url)
    console.log(ip, pathname)
    
    // 路由：/geo - 返回 JSON 格式的地理位置信息
    if (pathname === '/geo') {
      // 获取地理位置 - 添加安全检查
      const geo = geolocation(request) || {}
      console.log(geo)
      
      // 映射字段 - 增加类型安全处理
      const mappedGeo = {
        country: geo.country || null,
        countryRegion: geo.region || null,
        city: geo.city || null,
        region: geo.region || null,
        // 安全转换为字符串，处理 undefined/null
        latitude: geo.latitude !== undefined && geo.latitude !== null ? 
                 String(geo.latitude) : null,
        longitude: geo.longitude !== undefined && geo.longitude !== null ? 
                  String(geo.longitude) : null,
        asOrganization: null,  // Vercel 不提供此信息
      }
      
      return json({
        ip,
        ...mappedGeo
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
  } catch (error) {
    // 错误处理 - 返回安全的错误响应
    console.error('Error:', error)
    return new Response('Internal Server Error', {
      status: 500,
      headers: CORS_HEADERS
    })
  }
}

// 配置中间件匹配路径
export const config = {
  matcher: '/(.*)',
}
