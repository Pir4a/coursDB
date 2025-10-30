// Test script for Articles API
const API_BASE = 'http://localhost:8005/api/articles';

// Utility function for making requests
async function makeRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  console.log(`\n--- ${options.method || 'GET'} ${url} ---`);

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Success:', data.message || 'Request completed');
      if (data.data) {
        console.log('📄 Data:', data.data);
      }
      return data;
    } else {
      console.log('❌ Error:', data.message || 'Request failed');
      if (data.error) {
        console.log('🔍 Error details:', data.error);
      }
      if (data.errors) {
        console.log('🔍 Validation errors:', data.errors);
      }
      return null;
    }
  } catch (error) {
    console.error('🚨 Network error:', error.message);
    return null;
  }
}

// Test all API endpoints in logical order
async function runTests() {
  console.log('🚀 Starting Articles API Tests...\n');

  // 1. Get all articles (should be empty initially)
  await makeRequest('');

  // 2. Create a new article
  const newArticle = await makeRequest('', {
    method: 'POST',
    body: JSON.stringify({
      titre: 'Test Article 1',
      contenu: 'This is the content of the first test article. It contains some interesting information about technology.',
      auteur: 'John Doe',
      categorie: 'technologie',
    }),
  });

  let articleId = null;
  if (newArticle && newArticle.data && newArticle.data.id) {
    articleId = newArticle.data.id;
    console.log(`📝 Created article with ID: ${articleId}`);

    // 3. Get the specific article by ID
    await makeRequest(`/${articleId}`);

    // 4. Update the article
    await makeRequest(`/${articleId}`, {
      method: 'PUT',
      body: JSON.stringify({
        titre: 'Updated Test Article 1',
        contenu: 'This is the updated content of the first test article.',
        auteur: 'John Doe',
        categorie: 'technologie',
      }),
    });

    // 5. Publish the article
    await makeRequest(`/${articleId}/publier`, {
      method: 'POST',
    });

    // 6. Get published articles (should now include our article)
    await makeRequest('/publies');

    // 7. Create another article (unpublished)
    await makeRequest('', {
      method: 'POST',
      body: JSON.stringify({
        titre: 'Test Article 2',
        contenu: 'This is the content of the second test article. It will remain unpublished.',
        auteur: 'Jane Smith',
        categorie: 'sport',
      }),
    });

    // 8. Get all articles (should show both)
    const allArticles = await makeRequest('');

    // 9. Delete the first article
    if (articleId) {
      await makeRequest(`/${articleId}`, {
        method: 'DELETE',
      });
    }

    // 10. Get all articles again (should show only the second one)
    await makeRequest('');

  } else {
    console.log('❌ Could not create article, skipping dependent tests');
  }

  // 11. Test error handling - try to get non-existent article
  await makeRequest('/nonexistent-id');

  // 12. Test validation error - create article with invalid data
  await makeRequest('', {
    method: 'POST',
    body: JSON.stringify({
      titre: '', // Invalid: too short
      contenu: 'Valid content',
      auteur: 'Valid Author',
      categorie: 'invalid-category', // Invalid: not in enum
    }),
  });

  console.log('\n🎉 All tests completed!');
}

// Run the tests
runTests().catch(console.error);