/**
 * API Optimization middleware
 * This middleware implements cache control and rate limiting for API routes
 * Place this file in server/middleware/api-optimization.ts
 */

import { defineEventHandler, setResponseHeaders } from 'h3'
import type { H3Event } from 'h3'

// Simple in-memory store for rate limiting
// In production, use Redis or another shared storage
const ipRequests: Record<string, { count: number, timestamp: number }> = {}

export default defineEventHandler((event: H3Event) => {
    const path = event.node.req.url || ''

    // Only apply to API routes
    if (path.startsWith('/api/')) {
        // Get client IP for rate limiting
        const clientIp = event.node.req.headers['x-forwarded-for'] ||
            event.node.req.socket.remoteAddress ||
            'unknown'

        // Convert to string in case it's an array
        const ipAddress = Array.isArray(clientIp) ? clientIp[0] : String(clientIp)

        // Apply rate limiting
        const now = Date.now()
        if (!ipRequests[ipAddress]) {
            ipRequests[ipAddress] = { count: 1, timestamp: now }
        } else {
            // Reset counter if it's been more than a minute
            if (now - ipRequests[ipAddress].timestamp > 60000) {
                ipRequests[ipAddress] = { count: 1, timestamp: now }
            } else {
                ipRequests[ipAddress].count++
            }
        }

        // Check if rate limit exceeded (100 requests per minute)
        if (ipRequests[ipAddress].count > 100) {
            // Set rate limit headers
            setResponseHeaders(event, {
                'X-RateLimit-Limit': '100',
                'X-RateLimit-Remaining': '0',
                'X-RateLimit-Reset': String(Math.ceil((ipRequests[ipAddress].timestamp + 60000) / 1000)),
                'Retry-After': '60'
            })

            // Return 429 Too Many Requests
            event.node.res.statusCode = 429
            event.node.res.end(JSON.stringify({ error: 'Rate limit exceeded. Try again later.' }))
            return
        }

        // Set rate limit headers
        setResponseHeaders(event, {
            'X-RateLimit-Limit': '100',
            'X-RateLimit-Remaining': String(100 - ipRequests[ipAddress].count),
            'X-RateLimit-Reset': String(Math.ceil((ipRequests[ipAddress].timestamp + 60000) / 1000))
        })

        // Apply different cache strategies based on route
        if (path.includes('/api/products')) {
            // Product data can be cached longer
            setResponseHeaders(event, {
                'Cache-Control': 'public, max-age=300, s-maxage=600, stale-while-revalidate=86400'
            })
        } else if (path.includes('/api/categories')) {
            // Category data changes less frequently
            setResponseHeaders(event, {
                'Cache-Control': 'public, max-age=600, s-maxage=1800, stale-while-revalidate=86400'
            })
        } else {
            // Default caching for other API routes
            setResponseHeaders(event, {
                'Cache-Control': 'public, max-age=60, s-maxage=120, stale-while-revalidate=300'
            })
        }
    }
})
