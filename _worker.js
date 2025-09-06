// Cloudflare Workers IP 地理位置 API
// 根目录的 _worker.js 用于 Cloudflare Pages 集成

// CORS 配置
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*'
}

export default {
  fetch(request) {
    try {
      // 获取客户端 IP - 增加容错处理
      const ip = request.headers.get('cf-connecting-ipv6') || 
                 request.headers.get('cf-connecting-ip') || 
                 request.headers.get('x-real-ip') ||
                 request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                 '0.0.0.0'  // 添加默认值防止 null
      
      const { pathname } = new URL(request.url)
      console.log(ip, pathname)
      
      // 路由：/geo - 返回 JSON 格式的地理位置信息
      if (pathname === '/geo') {
        // 从 Cloudflare 获取地理位置数据 - 增加安全检查
        const country = request.cf?.country || request.headers.get('cf-ipcountry') || null
        
        // 安全获取 colo - 防止 split 错误
        const cfRay = request.headers.get('cf-ray')
        const colo = cfRay ? cfRay.split('-')[1] : null
        
        const geo = {
          country: country,
          countryRegion: request.cf?.region || request.headers.get('cf-region') || null,
          city: request.cf?.city || request.headers.get('cf-ipcity') || null,
          region: request.cf?.colo || colo || null,
          // 简化 latitude 和 longitude 转换
          latitude: request.cf?.latitude != null ? String(request.cf.latitude) : 
                   request.headers.get('cf-iplatitude') || null,
          longitude: request.cf?.longitude != null ? String(request.cf.longitude) : 
                    request.headers.get('cf-iplongitude') || null,
          asOrganization: request.cf?.asOrganization || request.headers.get('x-asn') || null,
        }
        
        console.log(geo)
        
        // 使用 Response.json (Cloudflare Workers 支持)
        return Response.json({
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
    } catch (error) {
      // 错误处理 - 返回安全的错误响应
      console.error('Error:', error)
      return new Response('Internal Server Error', {
        status: 500,
        headers: CORS_HEADERS
      })
    }
  }
}
