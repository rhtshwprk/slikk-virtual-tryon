# Virtual Try-On Setup Instructions

This app uses Google Cloud Vertex AI's Virtual Try-On API to generate try-on images.

## Prerequisites

1. **Google Cloud Account**: You need a Google Cloud account with Vertex AI enabled
2. **Node.js**: Version 18 or higher
3. **Google Cloud Authentication**: You need to authenticate with Google Cloud

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Google Cloud Authentication

You have two options:

#### Option A: Using gcloud CLI (Recommended for local development)

```bash
# Install gcloud CLI if you haven't already
# https://cloud.google.com/sdk/docs/install

# Authenticate
gcloud auth application-default login

# Set your project
gcloud config set project YOUR_PROJECT_ID
```

#### Option B: Using Service Account (For production)

1. Create a service account in Google Cloud Console
2. Grant it the "Vertex AI User" role
3. Download the JSON key file
4. Set the environment variable:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/key.json"
   ```

### 3. Configure Environment Variables

Create a `.env.local` file:

```bash
GOOGLE_CLOUD_PROJECT_ID=your-actual-project-id
GOOGLE_CLOUD_REGION=us-central1
```

### 4. Enable the Vertex AI API

```bash
gcloud services enable aiplatform.googleapis.com
```

### 5. Run the Application

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Using the App

1. **Upload Person Image**: Click on the person image area and select an image of a person
2. **Upload Product Image**: Click on the product image area and select a product image (clothing, etc.)
3. **Generate**: Click the "Generate Try-On" button to create the virtual try-on result
4. **View Result**: The result will be displayed below

## API Usage

The app makes requests to the Vertex AI Virtual Try-On API endpoint:
`https://{region}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{region}/publishers/google/models/virtual-try-on-preview-08-04:predict`

## Troubleshooting

If you encounter authentication errors:

- Make sure you're logged in with `gcloud auth application-default login`
- Verify your project ID is correct in `.env.local`
- Ensure the Vertex AI API is enabled for your project

If you get "Project not found" errors:

- Check that your project ID is correct
- Verify you have access to the project
- Make sure billing is enabled for your Google Cloud project

## Model Details

- **Model**: virtual-try-on-preview-08-04
- **Region**: us-central1 (default, can be changed)
- **Parameters**:
  - sampleCount: 1
  - addWatermark: true
  - baseSteps: 32
