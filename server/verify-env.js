// Run this script to verify your environment variables
// Usage: node verify-env.js

console.log('🔍 Verifying Environment Variables...\n');

const requiredVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'IMAGEKIT_PUBLIC_KEY',
  'IMAGEKIT_PRIVATE_KEY',
  'IMAGEKIT_URL_ENDPOINT',
  'CLIENT_URL'
];

let allPresent = true;

requiredVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}: Set`);
    
    // Show partial value for verification (hide sensitive parts)
    const value = process.env[varName];
    if (varName.includes('KEY') || varName.includes('SECRET')) {
      console.log(`   Value: ${value.substring(0, 10)}...`);
    } else {
      console.log(`   Value: ${value}`);
    }
  } else {
    console.log(`❌ ${varName}: MISSING`);
    allPresent = false;
  }
  console.log('');
});

if (allPresent) {
  console.log('✨ All environment variables are configured!\n');
  
  // Test ImageKit URL format
  const endpoint = process.env.IMAGEKIT_URL_ENDPOINT;
  if (endpoint && !endpoint.startsWith('https://ik.imagekit.io/')) {
    console.log('⚠️  Warning: IMAGEKIT_URL_ENDPOINT should start with "https://ik.imagekit.io/"');
  }
  
  // Test CLIENT_URL format
  const clientUrl = process.env.CLIENT_URL;
  if (clientUrl && clientUrl.endsWith('/')) {
    console.log('⚠️  Warning: CLIENT_URL should not end with a trailing slash');
  }
} else {
  console.log('❌ Some environment variables are missing. Please add them to your .env file or Vercel settings.\n');
  process.exit(1);
}
