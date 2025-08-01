import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const apiUrl = `${process.env.BASE_URL_MBANKING_API}/customers`;
  
  console.log('Testing API URL:', apiUrl);
  console.log('Environment variables:');
  console.log('BASE_URL_MBANKING_API:', process.env.BASE_URL_MBANKING_API);
  
  try {
    // Test API call with a mock token
    const testToken = "test-token";
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${testToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('API Response status:', response.status);
    const data = await response.text();
    console.log('API Response:', data);
    
    return NextResponse.json({
      success: true,
      apiUrl,
      status: response.status,
      response: data,
      environment: {
        BASE_URL_MBANKING_API: process.env.BASE_URL_MBANKING_API,
        OIDC_ISSUER: process.env.OIDC_ISSUER,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL
      }
    });
  } catch (error) {
    console.error('API Test Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      apiUrl,
      environment: {
        BASE_URL_MBANKING_API: process.env.BASE_URL_MBANKING_API,
        OIDC_ISSUER: process.env.OIDC_ISSUER,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL
      }
    });
  }
}
