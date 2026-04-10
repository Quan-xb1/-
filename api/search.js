const SEARCH_API_KEY = process.env.SEARCH_API_KEY;
const CSE_ID = process.env.CSE_ID;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
        }

          const { q, num = '10' } = req.query;

            if (!q) {
                return res.status(400).json({ error: 'Missing query parameter: q' });
                  }

                    if (!SEARCH_API_KEY || !CSE_ID) {
                        return res.status(500).json({ error: 'API key or CSE ID not configured' });
                          }

                            const url = `https://www.googleapis.com/customsearch/v1?key=${SEARCH_API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(q)}&num=${num}`;

                              try {
                                  const response = await fetch(url);
                                      const data = await response.json();

                                          if (data.error) {
                                                return res.status(500).json({ error: data.error.message });
                                                    }

                                                        const results = (data.items || []).map(item => ({
                                                              title: item.title,
                                                                    link: item.link,
                                                                          snippet: item.snippet,
                                                                              }));

                                                                                  return res.status(200).json({ results, total: data.searchInformation?.totalResults });
                                                                                    } catch (err) {
                                                                                        return res.status(500).json({ error: 'Failed to fetch search results' });
                                                                                          }
                                                                                          }
                                                                                          
