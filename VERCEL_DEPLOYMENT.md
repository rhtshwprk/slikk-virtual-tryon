# Deploying to Vercel

This guide will help you deploy your Virtual Try-On app to Vercel with full Google Cloud Vertex AI functionality.

## Prerequisites

1. A Google Cloud Project with Vertex AI enabled
2. A Vercel account
3. A service account JSON key from Google Cloud

## Steps to Deploy

### 1. Create Service Account in Google Cloud

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **IAM & Admin > Service Accounts**
3. Click **Create Service Account**
4. Give it a name (e.g., `virtual-tryon-service`)
5. Grant it the role: **Vertex AI User** (`roles/aiplatform.user`)
6. Click **Done**
7. Click on the service account you just created
8. Go to **Keys** tab
9. Click **Add Key > Create New Key**
10. Choose **JSON** format
11. Download the JSON file (keep it secure!)

### 2. Set Up Vercel Project

1. Go to [Vercel](https://vercel.com) and sign in
2. Import your GitHub/GitLab repository
3. Configure your project settings

### 3. Set Environment Variables in Vercel

In your Vercel project dashboard:

Go to **Settings > Environment Variables** and add these:

```
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_REGION=us-central1
GOOGLE_APPLICATION_CREDENTIALS={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
```

**⚠️ IMPORTANT:** The Virtual Try-On API is currently only available in **`us-central1`** (Iowa, USA) region. You cannot use other regions at this time. Unfortunately, this means higher latency from India, but it's the only option available.

**Important:** For `GOOGLE_APPLICATION_CREDENTIALS`, you need to:

1. Open the service account JSON file you downloaded
2. Copy the entire contents
3. Paste it as the value for `GOOGLE_APPLICATION_CREDENTIALS` (Vercel will handle it securely)

Alternatively, you can just set the JSON content directly:

```
GOOGLE_CLOUD_PROJECT_ID=your-project-id-here
GOOGLE_CLOUD_REGION=us-central1
GOOGLE_APPLICATION_CREDENTIALS={"type":"service_account"...}
```

### 4. Install Additional Dependencies

Make sure your `package.json` includes:

```json
{
  "dependencies": {
    "google-auth-library": "^8.x.x",
    "@google-cloud/aiplatform": "^5.12.0"
  }
}
```

### 5. Deploy

1. Push your code to GitHub/GitLab
2. Vercel will automatically detect the push and deploy
3. Your app should now be live!

## Environment Variable Example

Instead of setting the JSON directly, Vercel also supports uploading files. However, for simplicity, you can paste the entire JSON content as a string value.

## Local vs Production

- **Local development**: Uses `gcloud auth print-access-token` (requires you to run `gcloud auth login`)
- **Vercel/production**: Uses service account credentials from environment variables

The code automatically detects which environment it's in and uses the appropriate authentication method.

## Troubleshooting

### "Failed to get access token" error

- Ensure your service account JSON is correctly set in Vercel environment variables
- Verify the service account has the **Vertex AI User** role
- Check that Vertex AI API is enabled in your Google Cloud project

### "Project ID not found" error

- Verify `GOOGLE_CLOUD_PROJECT_ID` is set correctly
- Ensure the project ID matches your actual GCP project

## Testing Your Deployment

1. Navigate to your deployed app
2. Select a product
3. Click "virtual try-on" button
4. Upload a photo
5. Click "Generate Try-On"
6. The AI-generated image should appear!

## Security Notes

- Never commit your service account JSON to version control
- Keep your Google Cloud credentials secure
- Rotate service account keys periodically
- Consider using Vercel's environment variables for sensitive data

## Cost Considerations

- Vertex AI Virtual Try-On API is a preview service
- Check Google Cloud pricing for current rates
- Monitor your API usage in Google Cloud Console
- Set up billing alerts if necessary
