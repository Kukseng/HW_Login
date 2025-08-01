import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  // Use a valid token from your recent successful login
  const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwaG91Lmt1a3NlbmcuMjgyMkBydXBwLmVkdS5raCIsImV4cCI6MTc1NDA2ODcyOCwidHlwZSI6ImFjY2VzcyJ9.-c3-Jwjder7ahZ3uu9lMTFNI9pyJTPJzV2p6BsHT5E88";
  
  const testUrls = [
    "https://oauth2.istad.co/api/v1/customers",
    "https://mobile-banking-api.cheatdev.online/customers", 
    "https://car-nextjs-api.cheatdev.online/customers",
    "https://oauth2.istad.co/customers",
    "https://oauth2.istad.co/api/customers"
  ];
  
  const results = [];
  
  for (const url of testUrls) {
    try {
      console.log(`Testing URL: ${url}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${validToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.text();
      
      results.push({
        url,
        status: response.status,
        success: response.ok,
        data: data.substring(0, 200) // Limit response length
      });
      
      console.log(`${url} - Status: ${response.status}`);
      
    } catch (error) {
      results.push({
        url,
        status: 'Error',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
  
  return NextResponse.json({
    message: "API URL Testing Results",
    results,
    validToken: validToken.substring(0, 20) + "..."
  });
}
