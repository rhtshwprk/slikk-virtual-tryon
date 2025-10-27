import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// For local development, we'll get access tokens using gcloud
async function getAccessToken(): Promise<string | null> {
  // Try to get token from gcloud command
  try {
    const { stdout } = await execAsync('gcloud auth print-access-token');
    return stdout.trim();
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { personImage, productImage } = await request.json();

    if (!personImage || !productImage) {
      return NextResponse.json(
        { error: 'Both personImage and productImage are required' },
        { status: 400 }
      );
    }

    // Extract base64 data (remove data URL prefix if present)
    const personImageBase64 = personImage.includes(',') 
      ? personImage.split(',')[1] 
      : personImage;
    const productImageBase64 = productImage.includes(',')
      ? productImage.split(',')[1]
      : productImage;

    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    const region = process.env.GOOGLE_CLOUD_REGION || 'us-central1';

    if (!projectId) {
      return NextResponse.json(
        { error: 'GOOGLE_CLOUD_PROJECT_ID environment variable is not set' },
        { status: 500 }
      );
    }

    // Prepare the request body
    const requestBody = {
      instances: [
        {
          personImage: {
            image: {
              bytesBase64Encoded: personImageBase64,
            },
          },
          productImages: [
            {
              image: {
                bytesBase64Encoded: productImageBase64,
              },
            },
          ],
        },
      ],
      parameters: {
        sampleCount: 1,
        addWatermark: false,
        baseSteps: 32,
      },
    };

    // Get access token
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return NextResponse.json(
        { 
          error: 'Failed to get access token',
          details: 'Please run: gcloud auth login'
        },
        { status: 401 }
      );
    }

    // Call the Vertex AI Virtual Try-On API
    const apiUrl = `https://${region}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${region}/publishers/google/models/virtual-try-on-preview-08-04:predict`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Vertex AI API error:', errorText);
      return NextResponse.json(
        { 
          error: 'Failed to call Vertex AI API',
          details: errorText 
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      predictions: data.predictions,
    });
  } catch (error: unknown) {
    console.error('Error in virtual try-on API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: 'Failed to process virtual try-on request',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
